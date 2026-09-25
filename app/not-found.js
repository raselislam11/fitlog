import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="text-accent font-display font-bold text-7xl mb-4">404</p>
      <h1 className="font-display font-bold uppercase text-2xl mb-3">
        Page not found
      </h1>
      <p className="text-muted mb-8">
        The lift you&apos;re looking for isn&apos;t in the library.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-accent text-black font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition"
      >
        Back to Workouts
      </Link>
    </section>
  );
}
