import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function getSupabase() {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase environment variables are not configured");
    }
    return createClient(supabaseUrl, supabaseAnonKey);
}

export async function GET() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from("leads")
            .select("niche")
            .order("niche");

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Get unique niches
        const niches = [...new Set((data || []).map((d) => d.niche))].filter(Boolean);

        return NextResponse.json({ niches });
    } catch (error) {
        console.error("Niches fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch niches" },
            { status: 500 }
        );
    }
}
