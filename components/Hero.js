import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-x py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-accent text-xs font-semibold tracking-[0.2em] mb-4">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display font-bold uppercase text-4xl md:text-6xl leading-[1.05] mb-6">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="text-muted max-w-md mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-accent text-black font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition focus-ring"
          >
            Browse Workouts
            <ArrowDown size={16} />
          </a>
        </div>
        <div className="relative w-full aspect-[4/3] card overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=80"
            alt="Athlete mid-lift in a gym"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </div>
    </section>
  );
}
