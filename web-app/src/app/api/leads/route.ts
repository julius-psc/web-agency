import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function getSupabase() {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase environment variables are not configured");
    }
    return createClient(supabaseUrl, supabaseAnonKey);
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const perPage = parseInt(searchParams.get("per_page") || "12");
        const niche = searchParams.get("niche") || "";
        const status = searchParams.get("status");
        const search = searchParams.get("search") || "";

        const from = (page - 1) * perPage;
        const to = from + perPage - 1;

        // Build query
        const supabase = getSupabase();
        let query = supabase
            .from("leads")
            .select("*", { count: "exact" });

        if (niche) {
            query = query.eq("niche", niche);
        }

        if (status) {
            query = query.eq("status", status);
        }

        if (search) {
            query = query.or(
                `business_name.ilike.%${search}%,address.ilike.%${search}%,phone_number.ilike.%${search}%`
            );
        }

        query = query.order("created_at", { ascending: false }).range(from, to);

        const { data, error, count } = await query;

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        const total = count || 0;

        return NextResponse.json({
            leads: data || [],
            total,
            page,
            per_page: perPage,
            total_pages: Math.ceil(total / perPage),
        });
    } catch (error) {
        console.error("Leads fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch leads" },
            { status: 500 }
        );
    }
}

// PATCH - Update lead status
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Lead ID is required" },
                { status: 400 }
            );
        }

        const supabase = getSupabase();
        const { data, error } = await supabase
            .from("leads")
            .update({ status })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ lead: data });
    } catch (error) {
        console.error("Lead update error:", error);
        return NextResponse.json(
            { error: "Failed to update lead" },
            { status: 500 }
        );
    }
}

// GET niches list
export async function OPTIONS() {
    // This is a workaround to get distinct niches
    // We'll create a separate endpoint for this
    return NextResponse.json({ message: "Use /api/leads/niches" });
}
