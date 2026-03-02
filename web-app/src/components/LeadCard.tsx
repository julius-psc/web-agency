"use client";

import { Lead } from "@/lib/types";
import { CheckIcon, ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { DevicePhoneMobileIcon, ChatBubbleLeftRightIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface LeadCardProps {
    lead: Lead;
    onUpdateStatus: (id: string, status: string) => void;
    index: number;
}

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "contacted", label: "Contacted" },
    { value: "stage 1 - positive reply", label: "Stage 1 - Positive Reply" },
    { value: "stage 2 - negotiation", label: "Stage 2 - Negotiation" },
    { value: "payment completed", label: "Payment Completed" }
];

export default function LeadCard({
    lead,
    onUpdateStatus,
    index,
}: LeadCardProps) {
    const getWhatsAppLink = (phone: string, countryStr: string) => {
        let cleaned = phone.replace(/[\s.\-()]/g, "");
        if (cleaned.startsWith("0")) {
            const isUK = countryStr.toLowerCase().includes("kingdom") || countryStr.toLowerCase().includes("uk");
            cleaned = (isUK ? "+44" : "+33") + cleaned.substring(1);
        }
        return `https://wa.me/${cleaned.replace("+", "")}`;
    };

    const getFormattedPhoneNumber = (phone: string, countryStr: string) => {
        let cleaned = phone.trim();
        if (cleaned.startsWith("0")) {
            const isUK = countryStr.toLowerCase().includes("kingdom") || countryStr.toLowerCase().includes("uk");
            if (isUK) {
                return "+44 " + cleaned.substring(1);
            } else {
                return "+33 " + cleaned.substring(1);
            }
        }
        return cleaned;
    };

    const getSMSLink = (phone: string, countryStr: string) => {
        const formatted = getFormattedPhoneNumber(phone, countryStr).replace(/[\s.\-()]/g, "");
        return `sms:${formatted}`;
    };
    const getCallLink = (phone: string, countryStr: string) => {
        const formatted = getFormattedPhoneNumber(phone, countryStr).replace(/[\s.\-()]/g, "");
        return `tel:${formatted}`;
    };

    const isMobile = (phone: string) => {
        const cleaned = phone.replace(/[\s.\-()]/g, "");
        const frMobile = /^0[67]\d{8}$/.test(cleaned) || /^\+33[67]\d{8}$/.test(cleaned) || /^0033[67]\d{8}$/.test(cleaned);
        const ukMobile = /^07\d{9}$/.test(cleaned) || /^\+447\d{9}$/.test(cleaned) || /^00447\d{9}$/.test(cleaned);
        return frMobile || ukMobile;
    };

    const getLocationData = (address: string) => {
        const parts = address.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            const country = parts[parts.length - 1];
            const cityPart = parts[parts.length - 2];
            const cityMatch = cityPart.match(/\d+\s+(.*)/);
            const city = cityMatch ? cityMatch[1] : cityPart;
            return { city, country };
        }
        return { city: address, country: '' };
    };

    const mobile = isMobile(lead.phone_number);
    const { city, country } = getLocationData(lead.address);
    const countryFlag = country.toLowerCase().includes("france") ? "🇫🇷" : country.toLowerCase().includes("kingdom") || country.toLowerCase().includes("uk") ? "🇬🇧" : "";

    return (
        <div
            className="group relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors animate-slide-up flex flex-col"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
        >
            {/* Ribbon if completed */}
            {lead.status === "payment completed" && (
                <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none rounded-tr-xl">
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-xl" />
                </div>
            )}

            <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 cursor-pointer">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate" title={lead.business_name}>
                            {lead.business_name}
                        </h3>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {lead.niche}
                    </span>
                </div>
                {lead.status === "payment completed" && (
                    <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <CheckIcon className="w-4 h-4" />
                    </div>
                )}
            </div>

            <div className="space-y-3 mb-6 relative z-10 text-sm flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 group/item">
                        {mobile ? (
                            <DevicePhoneMobileIcon className="w-4 h-4 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-200 transition-colors" />
                        ) : (
                            <PhoneIcon className="w-4 h-4 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-200 transition-colors" />
                        )}
                        <p className="font-mono font-medium">{getFormattedPhoneNumber(lead.phone_number, country)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 group/item">
                    <MapPinIcon className="w-4 h-4 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-200 transition-colors" />
                    <p className="truncate" title={lead.address}>
                        {city} {countryFlag && <span className="ml-1">{countryFlag}</span>}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10 mt-auto">
                <div className="flex items-center gap-2">
                    {mobile ? (
                        <>
                            <a
                                href={getWhatsAppLink(lead.phone_number, country)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                    if (!lead.status || lead.status === "pending") {
                                        onUpdateStatus(lead.id, "contacted");
                                    }
                                }}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors cursor-pointer"
                            >
                                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                WhatsApp
                            </a>
                            <a
                                href={getSMSLink(lead.phone_number, country)}
                                onClick={() => {
                                    if (!lead.status || lead.status === "pending") {
                                        onUpdateStatus(lead.id, "contacted");
                                    }
                                }}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            >
                                <ChatBubbleLeftRightIcon className="w-4 h-4 hidden xl:block" />
                                SMS
                            </a>
                        </>
                    ) : (
                        <a
                            href={getCallLink(lead.phone_number, country)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-colors cursor-pointer"
                        >
                            <PhoneIcon className="w-4 h-4" />
                            Call
                        </a>
                    )}
                </div>

                <div className="relative w-full">
                    <select
                        value={lead.status || "pending"}
                        onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                        className={`appearance-none w-full flex items-center justify-between h-9 pl-3 pr-8 rounded-lg outline-none transition-all cursor-pointer text-xs font-semibold border-0 ring-1 ring-inset focus:ring-2 focus:ring-inset ${lead.status === "payment completed"
                            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-500/20 focus:ring-emerald-500"
                            : lead.status === "pending"
                                ? "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 ring-slate-200 dark:ring-slate-700 focus:ring-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                : "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-indigo-200 dark:ring-indigo-500/20 focus:ring-indigo-500"
                            }`}
                        title="Update Status"
                    >
                        {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg className="h-4 w-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
