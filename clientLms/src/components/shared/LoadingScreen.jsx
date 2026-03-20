import React from "react";
import { Library } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712] transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-500/20 rounded-2xl border border-teal-400/30 shadow-2xl shadow-teal-500/10">
            <Library className="w-10 h-10 text-teal-400 animate-pulse" />
          </div>
          <span className="text-4xl font-black tracking-tighter uppercase italic text-white">
            KUUSAA
          </span>
        </div>

        {/* Premium Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/5" />
          <div className="absolute inset-0 rounded-full border-4 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-white/5" />
          <div className="absolute inset-2 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin [animation-duration:1.5s]" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] ml-[0.3em]">
                Initializing
            </p>
            <div className="flex gap-1">
                <div className="w-1 h-1 bg-teal-500 rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
