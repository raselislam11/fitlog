import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel mt-16">
      <div className="container-x h-20 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-accent" size={18} />
          <span className="font-display font-bold tracking-wide">FITLOG</span>
        </div>
        <p className="text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
