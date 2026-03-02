import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GooglePlace } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function getSupabase() {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase environment variables are not configured");
    }
    return createClient(supabaseUrl, supabaseAnonKey);
}

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";

async function searchPlaces(
    query: string,
    maxResults: number = 40
): Promise<GooglePlace[]> {
    const url = "https://places.googleapis.com/v1/places:searchText";

    const fieldMask = [
        "places.displayName",
        "places.formattedAddress",
        "places.nationalPhoneNumber",
        "places.internationalPhoneNumber",
        "places.websiteUri",
        "nextPageToken",
    ].join(",");

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": fieldMask,
    };

    const allPlaces: GooglePlace[] = [];
    let pageToken: string | undefined;

    while (allPlaces.length < maxResults) {
        const payload: Record<string, unknown> = {
            textQuery: query,
            pageSize: 20,
        };

        if (pageToken) {
            payload.pageToken = pageToken;
        }

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Google Places API error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const places: GooglePlace[] = data.places || [];

        if (places.length === 0) break;

        allPlaces.push(...places);

        pageToken = data.nextPageToken;
        if (!pageToken) break;
        if (allPlaces.length >= maxResults) break;

        // Delay between paginated requests
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return allPlaces.slice(0, maxResults);
}

function isValidMobileNumber(phone: string, countryArea: "FR" | "UK" | "ALL"): boolean {
    // Normalize the phone number: remove spaces, dots, dashes
    const cleaned = phone.replace(/[\s.\-()]/g, "");

    if (countryArea === "FR" || countryArea === "ALL") {
        // France Mobile patterns: 06, 07
        // Format +336, +337, 00336, 00337, 06, 07
        if (/^0[67]\d{8}$/.test(cleaned) || /^\+33[67]\d{8}$/.test(cleaned) || /^0033[67]\d{8}$/.test(cleaned)) {
            return true;
        }
    }

    if (countryArea === "UK" || countryArea === "ALL") {
        // UK Mobile patterns: 07
        // Format +447, 00447, 07 (followed by 9 digits)
        if (/^07\d{9}$/.test(cleaned) || /^\+447\d{9}$/.test(cleaned) || /^00447\d{9}$/.test(cleaned)) {
            return true;
        }
    }

    return false;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { niche, cities, countryCode = "ALL", max_results = 40 } = body;

        if (!niche || !cities || !Array.isArray(cities) || cities.length === 0) {
            return NextResponse.json(
                { success: false, message: "Niche and an array of cities are required" },
                { status: 400 }
            );
        }

        if (!GOOGLE_PLACES_API_KEY) {
            return NextResponse.json(
                { success: false, message: "Google Places API key not configured" },
                { status: 500 }
            );
        }

        let totalRawPlacesCount = 0;
        const allHotLeads = [];

        for (const city of cities) {
            const query = `${niche} in ${city}`; // Changed "à" to "in" for better cross-language support
            const rawPlaces = await searchPlaces(query, max_results);
            totalRawPlacesCount += rawPlaces.length;

            const hotLeadsForCity = rawPlaces
                .filter((place) => {
                    // Must NOT have a website
                    if (place.websiteUri) return false;

                    // Must have a valid mobile number (UK or FR strictly)
                    const phone =
                        place.nationalPhoneNumber || place.internationalPhoneNumber || "";
                    return isValidMobileNumber(phone, countryCode);
                })
                .map((place) => ({
                    business_name: place.displayName?.text || "Unknown",
                    phone_number:
                        place.nationalPhoneNumber ||
                        place.internationalPhoneNumber ||
                        "N/A",
                    address: place.formattedAddress || "N/A",
                    niche: niche,
                    status: "pending",
                }));

            allHotLeads.push(...hotLeadsForCity);
        }


        // Insert into Supabase, skipping duplicates based on phone_number
        let savedCount = 0;
        if (allHotLeads.length > 0) {
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from("leads")
                .upsert(allHotLeads, {
                    onConflict: "phone_number",
                    ignoreDuplicates: true,
                })
                .select();

            if (error) {
                console.error("Supabase error:", error);
                return NextResponse.json(
                    { success: false, message: `Database error: ${error.message}` },
                    { status: 500 }
                );
            }

            savedCount = data?.length || 0;
        }

        return NextResponse.json({
            success: true,
            leads_found: allHotLeads.length,
            leads_saved: savedCount,
            message: `Found ${totalRawPlacesCount} total results across ${cities.length} cities. ${allHotLeads.length} hot leads (no website + mobile only). ${savedCount} new leads saved.`,
        });
    } catch (error) {
        console.error("Scrape error:", error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
