"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { usePlan } from "@/lib/PlanContext";

function MetricCard({ label, value }) {
  return (
    <div className="card p-5 text-center">
      <p className="font-display font-bold text-3xl text-accent">{value}</p>
      <p className="text-xs text-muted uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
}

function PlanRow({ workout, isPlanTab, onRemove, onToggleDone }) {
  return (
    <div className="card flex items-center gap-4 p-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-panel2 shrink-0">
        {workout.image && (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`font-display font-semibold tracking-wide truncate ${
            workout.done ? "line-through text-muted" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment.join(", ")}</p>
        <div className="flex items-center gap-3 text-xs text-muted mt-1">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="pill pill-outline px-3 py-2 text-xs hover:bg-panel2 focus-ring"
        >
          View Details
        </Link>
        {isPlanTab && (
          <button
            onClick={() => onToggleDone(workout.id)}
            title="Mark as done"
            className="p-2 rounded-full border border-line hover:bg-panel2 focus-ring"
          >
            <Check size={14} className={workout.done ? "text-accent" : ""} />
          </button>
        )}
        <button
          onClick={() => onRemove(workout.id)}
          title="Remove"
          className="p-2 rounded-full border border-line hover:bg-panel2 focus-ring"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const [tab, setTab] = useState("plan"); // plan | saved

  const list = tab === "plan" ? plan : saved;
  const minutes = plan.reduce((sum, w) => sum + (w.duration || 0), 0);
  const calories = plan.reduce((sum, w) => sum + (w.calories || 0), 0);

  return (
    <section className="container-x py-12">
      <h1 className="font-display font-bold uppercase text-3xl md:text-4xl mb-2">
        My Plan
      </h1>
      <p className="text-muted mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <MetricCard label="Exercises" value={plan.length} />
        <MetricCard label="Minutes" value={minutes} />
        <MetricCard label="Calories" value={calories} />
      </div>

      <div className="flex gap-2 mb-6 border-b border-line">
        {[
          ["plan", "Today's Plan"],
          ["saved", "Saved"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
              tab === key
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="text-center py-24">
          <h2 className="font-display font-bold uppercase text-xl mb-2">
            Nothing here yet
          </h2>
          <p className="text-muted mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent text-black font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition focus-ring"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((w) => (
            <PlanRow
              key={w.id}
              workout={w}
              isPlanTab={tab === "plan"}
              onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
              onToggleDone={toggleDone}
            />
          ))}
        </div>
      )}
    </section>
  );
}
