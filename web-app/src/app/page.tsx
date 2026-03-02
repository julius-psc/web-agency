"use client";

import { useState, useEffect, useCallback } from "react";
import { Lead } from "@/lib/types";
import ScraperForm from "@/components/ScraperForm";
import LeadCard from "@/components/LeadCard";
import Pagination from "@/components/Pagination";
import FilterBar from "@/components/FilterBar";
import StatsBar from "@/components/StatsBar";
import ScriptBox from "@/components/ScriptBox";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [niches, setNiches] = useState<string[]>([]);
  const [selectedNiche, setSelectedNiche] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [statsContactedCount, setStatsContactedCount] = useState(0);
  const [allLeadsTotal, setAllLeadsTotal] = useState(0);

  const perPage = 12;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString(),
      });

      if (selectedNiche) params.set("niche", selectedNiche);
      if (statusFilter) params.set("status", statusFilter);
      if (searchQuery) params.set("search", searchQuery);

      const response = await fetch(`/api/leads?${params}`);
      const data = await response.json();

      setLeads(data.leads || []);
      setTotalLeads(data.total || 0);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedNiche, statusFilter, searchQuery]);

  const fetchNiches = useCallback(async () => {
    try {
      const response = await fetch("/api/leads/niches");
      const data = await response.json();
      setNiches(data.niches || []);
    } catch (error) {
      console.error("Error fetching niches:", error);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      // Fetch total
      const totalRes = await fetch("/api/leads?per_page=1");
      const totalData = await totalRes.json();
      setAllLeadsTotal(totalData?.total || 0);

      // Fetch contacted count
      const contactedRes = await fetch(
        "/api/leads?per_page=1&status=contacted"
      );
      const contactedData = await contactedRes.json();
      setStatsContactedCount(contactedData?.total || 0);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    fetchNiches();
    fetchStats();
  }, [fetchNiches, fetchStats]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNicheChange = (niche: string) => {
    setSelectedNiche(niche);
    setCurrentPage(1);
  };

  const handleStatusChange = (filter: string) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const oldLead = leads.find(l => l.id === id);
      const oldStatus = oldLead?.status;

      // Optimistic update
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status } : lead
        )
      );

      // Adjust contacted count optimistically if needed
      if (oldStatus !== "contacted" && status === "contacted") {
        setStatsContactedCount(prev => prev + 1);
      } else if (oldStatus === "contacted" && status !== "contacted") {
        setStatsContactedCount(prev => prev - 1);
      }

      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch (error) {
      console.error("Error updating lead status:", error);
      // Revert if error
      fetchLeads(); // Simplest way to revert safely
    }
  };

  const handleScrapeComplete = () => {
    setCurrentPage(1);
    fetchLeads();
    fetchNiches();
    fetchStats();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 dark:bg-white rounded-lg text-white dark:text-slate-900">
              <SparklesIcon className="w-4 h-4" />
            </div>
            <h1 className="text-base font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              LeadRadar
            </h1>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 tabular-nums shadow-inner border border-slate-200/50 dark:border-slate-700/50">
            {allLeadsTotal} total leads
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">
        <div className="max-w-xl mx-auto text-center space-y-3 mb-10 mt-6 animate-fade-in">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
            Find Your Next Clients
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Automate your lead generation by scraping top businesses instantly from Google Maps.
          </p>
        </div>

        <ScraperForm onScrapeComplete={handleScrapeComplete} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-1 md:sticky md:top-24 space-y-6">
            <StatsBar
              totalLeads={allLeadsTotal}
              contactedCount={statsContactedCount}
              nichesCount={niches.length}
            />
          </div>

          <div className="md:col-span-3 space-y-6">
            <FilterBar
              niches={niches}
              selectedNiche={selectedNiche}
              onNicheChange={handleNicheChange}
              statusFilter={statusFilter}
              onStatusChange={handleStatusChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />

            {/* Result count */}
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Showing {leads.length} of {totalLeads} filtered leads
              </p>
              {selectedNiche && (
                <button
                  onClick={() => handleNicheChange("")}
                  className="text-xs font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  Clear filter
                </button>
              )}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse shadow-sm"
                  >
                    <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full mt-4" />
                  </div>
                ))}
              </div>
            ) : leads.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {leads.map((lead, index) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onUpdateStatus={handleUpdateStatus}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                  <span className="text-slate-400 text-xl">🔍</span>
                </div>
                <p className="text-base font-medium text-slate-900 dark:text-slate-100">No leads found</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  {selectedNiche || searchQuery
                    ? "Try adjusting your filters or search terms."
                    : "Run a new scrape using the form above to discover fresh leads."}
                </p>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            <ScriptBox />
          </div>
        </div>
      </main>
    </div>
  );
}
