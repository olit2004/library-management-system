import React from 'react';
import { useRouteError, useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-white dark:bg-[#030712]">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
        
        {/* Animated Error Icon */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-red-50 dark:bg-red-500/10 mb-2">
          <div className="absolute inset-0 rounded-full animate-ping bg-red-400/20 dark:bg-red-500/20" style={{ animationDuration: '3s' }} />
          <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-500 relative z-10" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">System Exception</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium px-4">
            Our system encountered an unexpected rendering error. A crash report has been generated.
          </p>
        </div>

        {/* Error Details Card */}
        <div className="w-full text-left bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 overflow-hidden shadow-inner">
           <p className="text-xs font-mono text-red-600 dark:text-red-400 break-words">
              {error?.statusText || error?.message || "Unknown Application Error"}
           </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold transition-colors shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <RefreshCw size={18} />
            Reload Page
          </button>
        </div>

      </div>
    </div>
  );
}
