'use client'

export default function Home() {
  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-19">
        <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Welcome Back!</h1>
        <p className="text-muted-foreground mt-2">
          {/* {
            isInterviewer ? "Manage your meetings and review candidates effectively." : "Access your upcoming meetings and recordings."
          } */}
        </p>
      </div>
    </div>
  );
}
