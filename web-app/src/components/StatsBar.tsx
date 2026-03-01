"use client";

interface StatsBarProps {
    totalLeads: number;
    contactedCount: number;
    nichesCount: number;
}

export default function StatsBar({
    totalLeads,
    contactedCount,
    nichesCount,
}: StatsBarProps) {
    const pending = totalLeads - contactedCount;

    const stats = [
        { label: "Total Leads", value: totalLeads, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
        { label: "Pending", value: pending, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
        { label: "Contacted", value: contactedCount, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
        { label: "Niches", value: nichesCount, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
                <div
                    key={stat.label}
                    className="p-5 flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest relative z-10">
                            {stat.label}
                        </p>
                    </div>
                    <p className={`text-4xl font-extrabold tabular-nums tracking-tight relative z-10 ${stat.color}`}>
                        {stat.value}
                    </p>
                    <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full ${stat.bg} blur-xl group-hover:scale-110 transition-transform duration-500 pointer-events-none`} />
                </div>
            ))}
        </div>
    );
}
