import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030712] text-slate-50 p-4">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center animate-in fade-in zoom-in duration-500">
        <div className="inline-flex p-4 bg-red-500/20 rounded-2xl border border-red-400/30 mb-8">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>

        <h1 className="text-4xl font-black tracking-tight mb-4">
          Oops!
        </h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          {error?.statusText || error?.message || "Something went wrong while processing your request."}
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            Try Refreshing
          </button>
          
          <Link 
            to="/" 
            className="flex items-center justify-center gap-3 px-6 py-4 bg-teal-500 hover:bg-teal-400 text-black rounded-2xl font-bold transition-all shadow-lg shadow-teal-500/20 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Safety
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-500 font-mono uppercase tracking-widest">
            Error ID: {error?.status || "INTERNAL_ERROR"}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
