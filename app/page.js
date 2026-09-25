"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import { getAllWorkouts } from "@/lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    getAllWorkouts()
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(() => {
    let list = workouts;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.category.some((c) => c.toLowerCase().includes(q))
      );
    }

    const key = sortBy.toLowerCase(); // duration | calories | rating
    return [...list].sort((a, b) => (b[key] || 0) - (a[key] || 0));
  }, [workouts, sortBy, query]);

  return (
    <>
      <Hero />

      <section id="library" className="container-x py-16 scroll-mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl mb-2">
              The Library
            </h2>
            <p className="text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workouts or tags"
                className="bg-panel border border-line rounded-full pl-9 pr-4 py-2 text-sm w-52 focus-ring outline-none"
              />
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-muted gap-3">
            <Loader2 className="animate-spin text-accent" size={28} />
            <p>Loading workouts…</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-24 text-muted">
            <p>Couldn&apos;t load workouts. Try refreshing the page.</p>
          </div>
        )}

        {!loading && !error && visible.length === 0 && (
          <div className="text-center py-24 text-muted">
            <p>No workouts match your search.</p>
          </div>
        )}

        {!loading && !error && visible.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
