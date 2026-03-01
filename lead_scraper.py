import os
import time
import requests
import pandas as pd
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# ==========================================
# CONFIGURATION
# ==========================================

# NOTE: API key is safely loaded from the .env file
API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

# Your search queries. Change this for different niches.
SEARCH_QUERIES = [
    "Maçonnerie générale à Caen",
    "Élagage et abattage Caen",
    "Entreprise de nettoyage fin de chantier Caen" # Construction cleaning - huge in Caen right now
]

# Max results you want to fetch. 
# Google Places Text Search returns up to 20 results per page.
# Setting this to 40 will make 2 requests.
MAX_RESULTS = 40

# Output file path
OUTPUT_FILE = "hot_leads.csv"

# ==========================================
# LOGIC
# ==========================================

def search_places(query, api_key, max_results=40):
    url = "https://places.googleapis.com/v1/places:searchText"
    
    # We specify only the fields we need to reduce API costs.
    # Note: Google Places API does not natively provide email addresses.
    # If emails are needed, a secondary scraping tool on the business website is required.
    field_mask = (
        "places.displayName,"
        "places.formattedAddress,"
        "places.nationalPhoneNumber,"
        "places.internationalPhoneNumber,"
        "places.websiteUri,"
        "nextPageToken"
    )
    
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": field_mask
    }
    
    all_places = []
    page_token = None
    
    while len(all_places) < max_results:
        payload = {
            "textQuery": query,
            "pageSize": 20  # Google limits Text Search to 20 results per page
        }
        
        if page_token:
            payload["pageToken"] = page_token
            
        print(f"Fetching page {len(all_places)//20 + 1}...")
        
        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code != 200:
            print(f"Error {response.status_code}: {response.text}")
            break
            
        data = response.json()
        places = data.get("places", [])
        
        if not places:
            print("No more places found.")
            break
            
        all_places.extend(places)
        
        page_token = data.get("nextPageToken")
        
        if not page_token:
            print("No more pages available.")
            break
            
        if len(all_places) >= max_results:
            break
            
        # Add a short delay between paginated requests (recommended by Google)
        time.sleep(2)
        
    # Trim to max results exactly
    return all_places[:max_results]


def process_and_filter_leads(places, query_name):
    """
    Extracts the relevant fields and filters the results to ONLY keep businesses
    where the Website URI is missing or null.
    """
    leads = []
    
    for place in places:
        website_uri = place.get("websiteUri")
        
        # We ONLY want businesses that lack a website URI
        if not website_uri:
            # Extract display name safely
            display_name_dict = place.get("displayName", {})
            name = display_name_dict.get("text", "Unknown Name")
            
            # The API returns both, let's prefer national, fallback to international
            phone = place.get("nationalPhoneNumber", place.get("internationalPhoneNumber", "N/A"))
            
            address = place.get("formattedAddress", "N/A")
            
            # Formally state Email logic if possible - though Places doesn't give Email
            email = "Not provided by Google Places API"
            
            leads.append({
                "Search Query": query_name,
                "Business Name": name,
                "Phone Number": phone,
                "Address": address,
                "Website": website_uri,
                "Email": email
            })
            
    return leads


def main():
    if not API_KEY:
        print("ERROR: GOOGLE_PLACES_API_KEY is not found.")
        print("Please create a .env file and add: GOOGLE_PLACES_API_KEY=your_actual_key_here")
        print("-" * 50)
        return
        
    all_hot_leads = []
    
    for query in SEARCH_QUERIES:
        print(f"\n{'='*50}")
        print(f"Searching for: '{query}'")
        print(f"{'='*50}")
        
        # 1. Fetch raw places from Google
        raw_places = search_places(query, API_KEY, max_results=MAX_RESULTS)
        print(f"Total raw places fetched for this query: {len(raw_places)}")
        
        # 2. Extract specific fields and filter out businesses WITH websites
        filtered_leads = process_and_filter_leads(raw_places, query)
        print(f"Total 'hot leads' (No Website) for this query: {len(filtered_leads)}")
        
        all_hot_leads.extend(filtered_leads)
        
    print(f"\n{'='*50}")
    print(f"GRAND TOTAL 'hot leads' (No Website): {len(all_hot_leads)}")
    
    # 3. Export to CSV using pandas
    if all_hot_leads:
        df = pd.DataFrame(all_hot_leads)
        df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')
        print(f"Successfully exported all hot leads to {OUTPUT_FILE}")
    else:
        print("No leads matched the criteria across all queries.")

if __name__ == "__main__":
    main()
