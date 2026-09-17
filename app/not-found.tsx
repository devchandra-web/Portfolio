import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-3xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
          404
        </div>
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed font-normal">
          The page or case study you are looking for doesn&apos;t exist or has been moved to another route.
        </p>
        <div className="flex items-center justify-center space-x-4 pt-2">
          <Button variant="primary" size="md" href="/" icon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button variant="outline" size="md" href="/projects" icon={<ArrowLeft className="w-4 h-4" />}>
            View Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
