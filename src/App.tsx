/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import CompetitionDetail from "./pages/CompetitionDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CompetitionList from "./pages/CompetitionList";

// Placeholder for other pages
function Placeholder({ name }: { name: string }) {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black text-white italic mb-4">{name}</h1>
      <p className="text-slate-400">This module is coming soon. Stay tuned!</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500 selection:text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/competitions" element={<CompetitionList />} />
              <Route path="/competition/:id" element={<CompetitionDetail />} />
              <Route path="/winners" element={<Placeholder name="WINNERS GALLERY" />} />
              <Route path="/how-it-works" element={<Placeholder name="HOW IT WORKS" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                   <div className="bg-slate-800 p-1 rounded-md">
                      <div className="w-6 h-6 bg-blue-600 rounded-sm" />
                   </div>
                   <span className="text-lg font-black tracking-tighter">ELITECOMPS</span>
                </div>
                <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
                   <a href="#" className="hover:text-white transition-colors">Terms</a>
                   <a href="#" className="hover:text-white transition-colors">Privacy</a>
                   <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
                <div className="text-xs text-slate-600">
                   &copy; 2026 EliteComps. Skills matter.
                </div>
             </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

