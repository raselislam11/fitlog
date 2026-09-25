"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/lib/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/90 backdrop-blur">
      <div className="container-x flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 focus-ring rounded">
          <Dumbbell className="text-accent" size={22} />
          <span className="font-display font-bold tracking-wide text-lg">
            FITLOG
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide focus-ring rounded ${
                  active ? "text-accent" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/my-plan" className="flex items-center gap-2 focus-ring rounded">
          <span className="pill pill-accent">Plan {planCount}</span>
          <span className="pill pill-outline">Saved {savedCount}</span>
        </Link>
      </div>

      {/* mobile nav */}
      <nav className="md:hidden flex items-center gap-6 container-x pb-3 -mt-1">
        {links.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide ${
                active ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
