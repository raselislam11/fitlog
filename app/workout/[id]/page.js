"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Loader2, Plus, Bookmark } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import { usePlan } from "@/lib/PlanContext";

const SPEC_LABELS = [
  ["Equipment", (w) => w.equipment.join(", ") || "-"],
  ["Difficulty", (w) => w.difficulty],
  ["Sets", (w) => w.sets],
  ["Reps", (w) => w.reps],
  ["Duration", (w) => `${w.duration} min`],
  ["Calories", (w) => `${w.calories} kcal`],
  ["Rating", (w) => w.rating],
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const { addToPlan, addToSaved, isPlanFull } = usePlan();

  useEffect(() => {
    let active = true;
    getWorkoutById(id)
      .then((data) => {
        if (active) setWorkout(data);
      })
      .catch(() => {
        if (active) setNotFoundFlag(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (notFoundFlag) return notFound();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-muted gap-3">
        <Loader2 className="animate-spin text-accent" size={28} />
        <p>Loading workout…</p>
      </div>
    );
  }

  if (!workout) return null;

  return (
    <section className="container-x py-12 grid md:grid-cols-2 gap-10">
      <div className="relative w-full aspect-square md:aspect-auto md:h-full card overflow-hidden">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">
            No image
          </div>
        )}
      </div>

      <div>
        <h1 className="font-display font-bold uppercase text-3xl md:text-4xl mb-3">
          {workout.name}
        </h1>
        <p className="text-muted mb-4">{workout.description}</p>

        <div className="flex gap-2 flex-wrap mb-6">
          {workout.category.map((tag) => (
            <span key={tag} className="pill pill-outline">
              {tag}
            </span>
          ))}
        </div>

        <div className="card divide-y divide-line mb-6">
          {SPEC_LABELS.map(([label, getValue]) => (
            <div key={label} className="flex justify-between px-4 py-3 text-sm">
              <span className="text-muted">{label}</span>
              <span className="font-medium">{getValue(workout)}</span>
            </div>
          ))}
        </div>

        {workout.instructions.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display font-semibold uppercase tracking-wide mb-3">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-accent font-display font-bold">
                    {i + 1}
                  </span>
                  <span className="text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(workout)}
            disabled={isPlanFull}
            className="inline-flex items-center gap-2 bg-accent text-black font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed focus-ring"
          >
            <Plus size={16} />
            Add to today&apos;s plan
          </button>
          <button
            onClick={() => addToSaved(workout)}
            className="inline-flex items-center gap-2 pill-outline px-6 py-3 rounded-full text-sm border hover:bg-panel2 transition focus-ring"
          >
            <Bookmark size={16} />
            Save for later
          </button>
        </div>
      </div>
    </section>
  );
}
