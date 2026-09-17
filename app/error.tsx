"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring services if needed
    console.error("Application Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono font-bold text-3xl flex items-center justify-center mx-auto shadow-xl shadow-rose-500/10">
          !
        </div>
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          An unexpected error occurred while loading this view. Please try resetting or return home.
        </p>
        <div className="flex items-center justify-center space-x-4 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={reset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Try Again
          </Button>
          <Button variant="outline" size="md" href="/" icon={<Home className="w-4 h-4" />}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
