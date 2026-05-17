import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, User, Menu, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-bottom border-border border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:brightness-110 transition-all shadow-lg shadow-primary/20">
              <Zap className="h-5 w-5 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase italic">
              ELITECOMPS
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/competitions" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
              Competitions
            </Link>
            <Link to="/winners" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
              Winners
            </Link>
            <Link to="/how-it-works" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
              How it Works
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <div className="bg-card border border-border px-4 py-1.5 rounded-full flex items-center gap-3 shadow-sm">
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Balance</span>
                   <span className="text-white text-sm font-bold font-mono">R{user?.credits?.toFixed(2) || "0.00"}</span>
                </div>
              </div>
            )}
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-secondary border-2 border-secondary/50 text-white font-bold hover:scale-105 transition-transform">
                    {user?.displayName?.[0] || <User className="h-5 w-5" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-border text-slate-200 rounded-2xl p-2 shadow-2xl">
                   <div className="px-3 py-2 border-b border-border/50 mb-1">
                      <p className="text-xs font-bold text-white truncate">{user?.displayName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                   </div>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400 rounded-xl cursor-pointer focus:bg-red-500/10 focus:text-red-400" onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-900" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-secondary text-white hover:brightness-110 font-bold px-6 rounded-xl transition-all shadow-lg shadow-secondary/20" asChild>
                  <Link to="/signup">Join Now</Link>
                </Button>
              </div>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden text-slate-300">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
