export interface Lead {
    id: string;
    business_name: string;
    phone_number: string;
    address: string;
    niche: string;
    contacted: boolean;
    created_at: string;
}

export interface ScrapeRequest {
    niche: string;
    cities: string[];
    countryCode?: "FR" | "UK" | "ALL";
    max_results?: number;
}

export interface ScrapeResponse {
    success: boolean;
    leads_found: number;
    leads_saved: number;
    message: string;
}

export interface LeadsResponse {
    leads: Lead[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

export interface GooglePlace {
    displayName?: {
        text?: string;
    };
    nationalPhoneNumber?: string;
    internationalPhoneNumber?: string;
    formattedAddress?: string;
    websiteUri?: string;
}
