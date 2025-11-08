import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        LinkedIn Fantasy League 
      </h1>
      <p className="text-slate-300 max-w-xl text-center">
        Draft professionals like players. Score points from promotions,
        job changes, and career moves.
      </p>
      <div className="flex gap-4">
        <Link
          href="/leaderboard"
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold"
        >
          View Leaderboard
        </Link>
        <button className="px-4 py-2 rounded-lg border border-slate-500 text-slate-200">
          Log in with LinkedIn (coming soon)
        </button>
      </div>
    </main>
  );
}
