import { motion } from "motion/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Star } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  attempts: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

const MOCK_DATA: LeaderboardEntry[] = [
  { rank: 1, username: "SpeedyTapMaster", score: 99.82, attempts: 24, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=1" },
  { rank: 2, username: "PrecisionKing", score: 99.10, attempts: 45, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=2" },
  { rank: 3, username: "EliteGamer101", score: 98.95, attempts: 12, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=3" },
  { rank: 4, username: "ReflexGod", score: 98.42, attempts: 8, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=4" },
  { rank: 5, username: "ShadowFocus", score: 97.88, attempts: 110, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=5" },
];

export default function Leaderboard({ competitionId }: { competitionId: string }) {
  return (
    <div className="bg-card rounded-[32px] border border-border overflow-hidden shadow-2xl flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-2">
           Leaderboard
        </h3>
        <div className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest">
           <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
           LIVE
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        {MOCK_DATA.map((entry) => (
          <div 
            key={entry.rank} 
            className={`grid grid-cols-[40px_1fr_60px] items-center px-4 py-3 rounded-2xl border transition-all duration-300 ${
              entry.rank <= 2 
                ? "bg-background border-primary/20 shadow-lg shadow-primary/5" 
                : "bg-background/50 border-border hover:border-slate-700"
            } ${entry.isCurrentUser ? "bg-secondary/10 border-secondary scale-[1.02]" : ""}`}
          >
             <div className={`font-mono font-black text-sm italic ${entry.rank === 1 ? "text-amber-400" : entry.rank === 2 ? "text-slate-400" : "text-slate-600"}`}>
                {entry.rank.toString().padStart(2, '0')}
             </div>
             
             <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg overflow-hidden border ${entry.rank <= 2 ? "border-primary/50" : "border-border"}`}>
                   <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-black text-white uppercase tracking-tight truncate max-w-[120px]">
                      {entry.username}
                   </span>
                </div>
             </div>

             <div className="text-right">
                <span className="text-sm font-black font-mono text-primary italic tracking-tighter">
                   {entry.score.toFixed(2)}
                </span>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 text-center">
         <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Top score at 12:00 PM wins
         </p>
      </div>
    </div>
  );
}
