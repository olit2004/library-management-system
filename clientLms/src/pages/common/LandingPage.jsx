import { BookOpen, Shield, Users, Clock, ArrowRight, Sparkles, Library,Smile } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url("src/assets/bg.avif")`
      }}
    >
 

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16 sm:mb-24">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Library className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl text-teal-400 font-bold bg-linear-to-r from-white to-teal-100 bg-clip-text ">
                 Kuusaa 
            </span>
          </div>
          
          <div className="flex space-x-3">
            <Link 
              to="/login"
              className="px-5 py-2.5 text-sm font-medium text-white 
                         bg-white/20 backdrop-blur-sm 
                         border border-white/30 rounded-xl
                         hover:bg-white/30 transition-all duration-300
                         hover:shadow-lg hover:shadow-white/10"
            >
              Sign In
            </Link>
            <Link 
              to="/register"
              className="px-5 py-2.5 text-sm font-medium text-white
                         bg-linear-to-r from-teal-800 to-teal-600
                         border border-teal-400/40 rounded-xl
                         hover:from-teal-600 hover:to-teal-500
                         transition-all duration-300
                         shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/35"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 
                          bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span className="text-sm font-medium text-white">Revolutionizing Library Management</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
                Your Digital
              </span>
              <br />
              <span className="bg-linear-to-r from-teal-300 via-blue-400 to-purple-300 bg-clip-text text-transparent">
                Library Experience
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
              Access thousands of books, manage your reading journey, and connect with a 
              community of readers. All in one beautiful, modern platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/register"
                className="group px-8 py-4 text-lg font-semibold text-white
                           bg-linear-to-r from-teal-600 to-blue-600
                           rounded-2xl
                           hover:from-teal-500 hover:to-blue-500
                           transition-all duration-300
                           shadow-2xl shadow-blue-500/25 
                           hover:shadow-2xl hover:shadow-blue-500/35
                           flex items-center space-x-2"
              >
                <span>Borrow  Book</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login"
                className="px-8 py-4 text-lg font-semibold text-white
                           bg-white/15 backdrop-blur-md
                           border border-white/30 rounded-2xl
                           hover:bg-white/25 transition-all duration-300
                           hover:shadow-lg hover:shadow-white/10"
              >
                Sign In to Continue
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "50K+", label: "Digital Books", icon: BookOpen },
                { value: "24/7", label: "Access", icon: Clock },
                { value: "100%", label: "Secure", icon: Shield },
                { value: "10K+", label: "Active Readers", icon: Users },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="p-6 bg-linear-to-br from-white/10 to-white/5
                           backdrop-blur-xl rounded-2xl
                           border border-white/20 border-l-white/30 border-t-white/30
                           hover:border-white/40 transition-all duration-300
                           hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10
                           group"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-linear-to-br from-white/20 to-transparent rounded-xl">
                      <stat.icon className="w-8 h-8 text-teal-300" />
                    </div>
                    <div className="text-3xl font-bold text-white group-hover:text-teal-200 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-200">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Why Choose <span className="text-teal-400">Kuusaa</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Easy Borrow & Return",
                  description: "Borrow books in seconds and return them hassle-free with one click.",
                  color: "from-green-400/20 to-green-600/20"
                },
                {
                  title: "Seamless Reading Experience",
                  description: "Enjoy books online or offline with a smooth, distraction-free reader.",
                  color: "from-orange-400/20 to-orange-600/20"
                },
                {
                  title: "Explore Rich Catalog",
                  description: "Browse thousands of titles, genres, and authors with powerful search and filters.",
                  color: "from-indigo-400/20 to-indigo-600/20"
}

              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`p-8 bg-linear-to-br ${feature.color}
                           backdrop-blur-xl rounded-2xl
                           border border-white/20
                           hover:border-white/40 transition-all duration-300
                           hover:shadow-2xl hover:shadow-white/5`}
                >
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="relative max-w-4xl mx-auto p-8 md:p-12
                          bg-linear-to-br from-teal-900/30 via-blue-900/20 to-purple-900/30
                          backdrop-blur-2xl rounded-3xl
                          border border-teal-400/30 border-l-teal-300/40 border-t-teal-300/40
                        overflow-hidden">
              
              {/* Glow effects */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Reading Experience?
                </h2>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  Join thousands of readers who have already discovered their next favorite book.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/register"
                    className="px-8 py-4 text-lg font-semibold text-white
                             bg-linear-to-r from-teal-500 to-blue-500
                             rounded-xl hover:bg-teal-300
                             transition-all duration-300
                             shadow-lg shadow-blue-500/30 hover:shadow-xl "
                  >
                    Create Free Account
                  </Link>
                  <Link 
                    to="/login"
                    className="px-8 py-4 text-lg font-semibold text-white
                             bg-white/15 backdrop-blur-sm
                             border border-white/30 rounded-xl
                             hover:bg-white/25 transition-all duration-300"
                  >
                    Already have an account?
                  </Link>
                </div>
                
                <p className="text-sm text-gray-300 mt-6">
                  No credit card required • Free 30-day trial • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </main>
          
        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10">
          <div className="text-center text-gray-300">
            <p className="text-sm">
              © 2024 KUUSAA. All rights reserved. 
              <span className="mx-2">•</span>
              Making reading accessible for everyone.
            </p>
            <p className="text-xs mt-2 text-gray-400">
              Over 50,000 books and counting...
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}