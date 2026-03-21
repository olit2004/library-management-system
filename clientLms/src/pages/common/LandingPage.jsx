import { Library } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-50 selection:bg-teal-500/30 overflow-x-hidden">


      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.5), rgba(3, 7, 18, 0.9)), url("/bg.avif")`,
        }}
      />
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center">

        <nav className="sticky top-6 w-[90%] max-w-7xl mx-auto z-50">
          <div className="flex justify-between items-center px-8 py-5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-500/20 rounded-lg border border-teal-400/30">
                <Library className="w-7 h-7 text-teal-400" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
                KUUSAA
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-gray-300">
              <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
              <a href="#stats" className="hover:text-teal-400 transition-colors">Library</a>
              <a href="#about" className="hover:text-teal-400 transition-colors">Community</a>
            </div>

            <div className="flex items-center space-x-5">
              <Link to="/login" className="hidden sm:block text-sm font-semibold hover:text-teal-400 transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 text-sm font-bold bg-teal-500 hover:bg-teal-400 text-black rounded-xl transition-all shadow-lg shadow-teal-500/20 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>


        <header className="container max-w-5xl mx-auto pt-32 pb-24 px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Your digital library
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Browse, borrow, and read books instantly. No queues. No friction.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-teal-500 text-black rounded-xl font-semibold hover:bg-teal-400 transition-all active:scale-95"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all"
            >
              Sign In
            </Link>
          </div>
        </header>


        <section id="features" className="container max-w-6xl mx-auto px-6 py-28">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "One-Click Borrowing" },
              { title: "Offline Reading" },
              { title: "Smart Catalog" }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-12 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md border-t border-l border-white/10 rounded-[2.5rem] shadow-xl hover:translate-y-[-5px] transition-all"
              >
                <h3 className="text-2xl font-semibold text-white mb-5 italic tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-slate-400 leading-relaxed">
                  Experience a seamless interface designed for the ultimate reading comfort and efficiency.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full py-16 mt-16 border-t border-white/5 text-center">
          <p className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            © 2026 KUUSAA — Read Beyond Boundaries
          </p>
        </footer>
      </div>
    </div>
  );
}