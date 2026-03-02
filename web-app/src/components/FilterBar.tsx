"use client";

import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/20/solid";

interface FilterBarProps {
    niches: string[];
    selectedNiche: string;
    onNicheChange: (niche: string) => void;
    statusFilter: string;
    onStatusChange: (filter: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function FilterBar({
    niches,
    selectedNiche,
    onNicheChange,
    statusFilter,
    onStatusChange,
    searchQuery,
    onSearchChange,
}: FilterBarProps) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search leads by name, address, or phone..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-sm font-medium"
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-3 justify-between">
                <div className="relative group min-w-[200px]">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <FunnelIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <select
                        value={selectedNiche}
                        onChange={(e) => onNicheChange(e.target.value)}
                        className="w-full pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                    >
                        <option value="">All niches</option>
                        {niches.map((niche) => (
                            <option key={niche} value={niche}>
                                {niche}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-900/40 rounded-lg p-1 w-full sm:w-auto overflow-x-auto shrink-0 border border-slate-200 dark:border-slate-800">
                    {[
                        { value: "", label: "All" },
                        { value: "pending", label: "Pending" },
                        { value: "contacted", label: "Contacted" },
                        { value: "stage 1 - positive reply", label: "Stage 1" },
                        { value: "stage 2 - negotiation", label: "Stage 2" },
                        { value: "payment completed", label: "Completed" },
                    ].map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onStatusChange(option.value)}
                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap flex-1 sm:flex-none ${statusFilter === option.value
                                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
