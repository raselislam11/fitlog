"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

function Stats({ workout }) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted mt-3">
      <span className="flex items-center gap-1">
        <Clock size={14} /> {workout.duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame size={14} /> {workout.calories} kcal
      </span>
      <span className="flex items-center gap-1">
        <Star size={14} className="text-accent" /> {workout.rating}
      </span>
    </div>
  );
}

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card overflow-hidden group flex flex-col focus-ring"
    >
      <div className="relative w-full aspect-[4/3] bg-panel2">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">
            No image
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex gap-2 flex-wrap mb-2">
          {workout.category.slice(0, 2).map((tag) => (
            <span key={tag} className="pill pill-outline">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display font-semibold tracking-wide">
          {workout.name}
        </h3>
        <p className="text-xs text-muted mt-1">{workout.equipment.join(", ")}</p>
        <Stats workout={workout} />
      </div>
    </Link>
  );
}
