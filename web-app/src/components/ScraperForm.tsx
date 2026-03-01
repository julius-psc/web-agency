"use client";

import { useState } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Papa from "papaparse";

interface ScraperFormProps {
    onScrapeComplete: () => void;
}

const TOP_CITIES_FR = [
    "Caen", "Southampton", "Portsmouth", "Brighton", "Bristol", "Reading",
    "Norwich", "Nottingham", "Cardiff", "Bournemouth", "Northampton",
    "Leicester", "Rennes", "Nantes", "Tours", "Reims", "Angers", "Le Havre", "Brest", "Rouen"
];

// Combine standard categories for dropdown mapping
const DEFAULT_CATEGORIES = [
    { label: "Home & Construction: Masonry", fr: "Maçonnerie Générale", uk: "General Building / Masonry" },
    { label: "Home & Construction: Tree Surgeons", fr: "Élagage et Abattage", uk: "Tree Surgeons" },
    { label: "Home & Construction: Roofing", fr: "Charpente et Toiture", uk: "Roofing & Guttering" },
    { label: "Home & Construction: Windows/Doors", fr: "Menuiserie ALU/PVC", uk: "Window & Door Installers" },
    { label: "Home & Construction: Driveways", fr: "Paysagiste / Aménagement", uk: "Driveway & Paving Specialists" },
    { label: "Home & Construction: Plumbing/Heating", fr: "Plomberie Chauffage", uk: "Plumbing & Heating" },
    { label: "Home & Construction: Smart Homes", fr: "Électricien Domotique", uk: "Smart Home Electricians" },
    { label: "Home & Construction: Kitchen Fitters", fr: "Cuisiniste Indépendant", uk: "Kitchen Fitters / Designers" },
    { label: "Home & Construction: Bathrooms", fr: "Rénovation Salle de Bain", uk: "Bathroom Renovation" },
    { label: "Home & Construction: Wood Stoves", fr: "Installation Poêle à Bois", uk: "Wood Stove Installers" },

    { label: "Automotive: Classic Restorations", fr: "Garage Restauration Auto", uk: "Classic Car Restoration" },
    { label: "Automotive: Detailing", fr: "Lavage Auto Detailing", uk: "Car Detailing & Ceramic Coating" },
    { label: "Automotive: Body Shop", fr: "Carrosserie Peinture", uk: "Body Shop / Accident Repair" },
    { label: "Automotive: Performance Tuning", fr: "Préparation Moteur / Reprog", uk: "Performance Tuning / Remapping" },
    { label: "Automotive: Mobile Tyres", fr: "Vente de Pneus / Mobile", uk: "Mobile Tyre Fitting" },
    { label: "Automotive: MOT", fr: "Contrôle Technique", uk: "MOT Test Centres" },

    { label: "Boutique Services: Luxury Salons", fr: "Salon de Coiffure de Luxe", uk: "Luxury Hair Salons" },
    { label: "Boutique Services: Skin Clinics", fr: "Institut d'Esthétique", uk: "Aesthetic & Skin Clinics" },
    { label: "Boutique Services: Dog Grooming", fr: "Toilettage Canin", uk: "Dog Grooming / Pet Spa" },
    { label: "Boutique Services: Dog Boarding", fr: "Pension pour Chiens", uk: "Dog Daycare / Boarding" },
    { label: "Boutique Services: Tattoo Studios", fr: "Studio de Tatouage", uk: "Tattoo Studios" },
    { label: "Boutique Services: Osteopaths", fr: "Ostéopathe / Kiné", uk: "Osteopath / Physio Clinics" },

    { label: "B2B & Industrial: Site Cleaning", fr: "Nettoyage de Chantiers", uk: "Construction Site Cleaning" },
    { label: "B2B & Industrial: Waste Management", fr: "Location de Bennes", uk: "Skip Hire / Waste Management" },
    { label: "B2B & Industrial: Shot Blasting", fr: "Sablage et Décapage", uk: "Shot Blasting / Stripping" },
    { label: "B2B & Industrial: Private Security", fr: "Sécurité et Gardiennage", uk: "Private Security / Manned Guarding" },
    { label: "B2B & Industrial: 3D Printing", fr: "Impression 3D Industrielle", uk: "3D Printing Services" },
    { label: "B2B & Industrial: Accountants", fr: "Expert Comptable", uk: "Accountants / Bookkeepers" },
    { label: "B2B & Industrial: Pest Control", fr: "Dératisation / Frelons", uk: "Pest Control / Wasp Removal" },
    { label: "B2B & Industrial: Commercial AC", fr: "Climatisation Bureaux", uk: "Commercial Air Conditioning" },

    { label: "Events & Hospitality: Wedding Caterers", fr: "Traiteur Mariage", uk: "Wedding Caterers" },
    { label: "Events & Hospitality: Event Venues", fr: "Location de Salles", uk: "Event Venue Hire" },
    { label: "Events & Hospitality: Micro-Breweries", fr: "Brasserie Artisanale", uk: "Micro-Breweries" },
    { label: "Events & Hospitality: Coffee Roasters", fr: "Torréfacteur de Café", uk: "Coffee Roasters" },
    { label: "Events & Hospitality: Event Florists", fr: "Fleuriste Événementiel", uk: "Event / Luxury Florists" },
    { label: "Events & Hospitality: Wedding Photographers", fr: "Photographe de Mariage", uk: "Wedding Photography" },
    { label: "Events & Hospitality: Sound & Light", fr: "DJ / Sonorisation", uk: "Event Sound & Light Hire" },
    { label: "Events & Hospitality: Luxury Gîtes/Airbnbs", fr: "Gîtes de Charme", uk: "Luxury Holiday Cottages / Airbnbs" },
    { label: "Events & Hospitality: Personal Trainers", fr: "Coaching Sportif Perso", uk: "Personal Trainers / Gyms" },
    { label: "Events & Hospitality: Dog Trainers", fr: "Éducation Canine", uk: "Professional Dog Trainers" },
];

export default function ScraperForm({ onScrapeComplete }: ScraperFormProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [countryMode, setCountryMode] = useState<"FR" | "UK" | "ALL">("FR");
    const [selectedCities, setSelectedCities] = useState<string[]>([]);

    // Fallback custom input
    const [customNiche, setCustomNiche] = useState("");

    const [maxResults, setMaxResults] = useState(40);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCity = (city: string) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(prev => prev.filter(c => c !== city));
        } else {
            setSelectedCities(prev => [...prev, city]);
        }
    };

    const toggleAllCities = () => {
        if (selectedCities.length === TOP_CITIES_FR.length) {
            setSelectedCities([]);
        } else {
            setSelectedCities([...TOP_CITIES_FR]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let finalNiche = customNiche.trim();

        if (!finalNiche && selectedCategory) {
            const cat = DEFAULT_CATEGORIES.find(c => c.label === selectedCategory);
            if (cat) {
                finalNiche = countryMode === "UK" ? cat.uk : cat.fr;
            }
        }

        if (!finalNiche || selectedCities.length === 0) {
            setResult({
                success: false,
                message: "Please select a niche and at least one city."
            });
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("/api/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    niche: finalNiche,
                    cities: selectedCities,
                    countryCode: countryMode,
                    max_results: maxResults,
                }),
            });

            const data = await response.json();
            setResult(data);

            if (data.success) {
                onScrapeComplete();
            }
        } catch {
            setResult({
                success: false,
                message: "Network error. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-all duration-300">

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-5 py-4 flex items-center justify-between cursor-pointer focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <MagnifyingGlassIcon className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="text-base font-semibold text-slate-900 dark:text-white block">
                            Bulk Geographic Scrape
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Search multiple cities simultaneously for specific niches
                        </span>
                    </div>
                </div>
                <div className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400" : ""}`}>
                    <ChevronDownIcon className="w-5 h-5" />
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-5 pt-0 mt-2 border-t border-slate-100 dark:border-slate-800/50">
                    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in mt-4">

                        {/* Target Country Code Filter Toggle */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest pl-1">
                                Target Country
                            </label>
                            <div className="flex gap-2 p-1 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800 w-max">
                                {["FR", "UK", "ALL"].map(mode => (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setCountryMode(mode as "FR" | "UK" | "ALL")}
                                        className={`px-6 py-2 rounded-md text-xs font-bold transition-all ${countryMode === mode
                                            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                                            }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Niche Selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 flex flex-col">
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-widest pl-1">
                                    Pre-selected Niche
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setCustomNiche("");
                                    }}
                                    className="w-full h-[46px] px-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select a known niche...</option>
                                    {DEFAULT_CATEGORIES.map(cat => (
                                        <option key={cat.label} value={cat.label}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1.5 relative">
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-widest pl-1">
                                    OR Custom Niche Query
                                </label>
                                <input
                                    type="text"
                                    value={customNiche}
                                    onChange={(e) => {
                                        setCustomNiche(e.target.value);
                                        setSelectedCategory("");
                                    }}
                                    placeholder="e.g. Roofers..."
                                    className="w-full h-[46px] px-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm font-medium"
                                />
                                <div className="absolute top-1 right-2 text-[10px] text-slate-400 font-medium">Overwrites selection</div>
                            </div>
                        </div>

                        {/* City Grid Bulk Toggle */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                                    Target Cities ({selectedCities.length} selected)
                                </label>
                                <button type="button" onClick={toggleAllCities} className="text-xs font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer">
                                    {selectedCities.length === TOP_CITIES_FR.length ? "Deselect All" : "Select All"}
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {TOP_CITIES_FR.map(city => {
                                    const isSelected = selectedCities.includes(city);
                                    return (
                                        <button
                                            key={city}
                                            type="button"
                                            onClick={() => toggleCity(city)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${isSelected
                                                ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30"
                                                : "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                }`}
                                        >
                                            {isSelected && "✓ "}{city}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-widest px-1">
                                <span>Max Results Per City</span>
                                <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                                    {maxResults}
                                </span>
                            </label>
                            <div className="px-1">
                                <input
                                    type="range"
                                    min={5}
                                    max={60}
                                    step={5}
                                    value={maxResults}
                                    onChange={(e) => setMaxResults(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                    disabled={loading}
                                />
                                <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-2 px-1">
                                    <span>5</span>
                                    <span>30</span>
                                    <span>60</span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || (!customNiche && !selectedCategory) || selectedCities.length === 0}
                            className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-current opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Scraping target across {selectedCities.length} cities...
                                </>
                            ) : (
                                "Launch Bulk Radar"
                            )}
                        </button>

                        {result && (
                            <div
                                className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 animate-slide-up ${result.success
                                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20"
                                    : "bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-500/20"
                                    }`}
                            >
                                <span className="text-xl leading-none">
                                    {result.success ? "✨" : "⚠️"}
                                </span>
                                <div>
                                    <p>{result.message}</p>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
