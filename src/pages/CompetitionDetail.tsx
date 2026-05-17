import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Timer, ArrowLeft, Trophy, CreditCard, ShieldCheck, Zap } from "lucide-react";
import PrecisionTap from "@/components/game/PrecisionTap";
import Leaderboard from "@/components/leaderboard/Leaderboard";

export default function CompetitionDetail() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [entries, setEntries] = useState(1); // Free entry

  const handleScoreSubmit = (score: number) => {
    console.log("Submitting score:", score);
    setIsPlaying(false);
    // Here we would call the API to save the score
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link to="/competitions" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors text-[10px] font-black uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back to Competitions
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Game & Info */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="game"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="w-full"
                >
                  <PrecisionTap onScoreSubmit={handleScoreSubmit} />
                </motion.div>
              ) : (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-[32px] overflow-hidden shadow-2xl relative"
                >
                   <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-indigo-900/20 to-transparent pointer-events-none" />
                   
                   <div className="p-8 md:p-12 relative z-10">
                      <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/3 aspect-square rounded-[32px] overflow-hidden border border-border shadow-2xl group">
                          <img
                            src="https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            alt="Prize"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <Badge className="bg-primary text-primary-foreground border-0 mb-6 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                            ACTIVE COMPETITION
                          </Badge>
                          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic">
                            iPhone 15 Pro Max
                          </h1>
                          <div className="flex flex-wrap items-center gap-8 mb-8">
                            <div className="flex flex-col gap-1">
                               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ends In</span>
                               <div className="flex items-center gap-2 text-white">
                                  <Timer className="w-5 h-5 text-primary" />
                                  <span className="text-xl font-bold font-mono tracking-tighter">04h 22m 15s</span>
                               </div>
                            </div>
                            <div className="flex flex-col gap-1">
                               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Entry Fee</span>
                               <div className="flex items-center gap-2 text-white">
                                  <CreditCard className="w-5 h-5 text-primary" />
                                  <span className="text-xl font-bold font-mono tracking-tighter">R50.00</span>
                               </div>
                            </div>
                          </div>
                          
                          <div className="bg-background/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mb-10">
                             <p className="text-slate-400 leading-relaxed font-semibold">
                               Precision Tap Challenge • Stop the marker exactly on the bullseye to score maximum points. Highest accuracy at the end of the countdown wins the prize.
                             </p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                              size="lg"
                              disabled={entries === 0}
                              onClick={() => setIsPlaying(true)}
                              className="bg-secondary text-white hover:brightness-110 px-10 py-8 rounded-[20px] text-lg font-black shadow-2xl shadow-secondary/20 h-auto border-none transition-all hover:scale-[1.02]"
                            >
                              <Zap className="mr-2 h-6 w-6 fill-current" />
                              PLAY FREE ENTRY
                            </Button>
                            <Button
                              size="lg"
                              variant="outline"
                              className="border-border bg-card/50 text-white hover:bg-card px-10 py-8 rounded-[20px] text-lg font-black h-auto transition-all"
                            >
                              BUY ENTRIES
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-16 border-t border-border/50">
                        <div className="flex items-start gap-5">
                          <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20">
                             <ShieldCheck className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-white font-black uppercase italic tracking-tight mb-1 text-sm">Verified Secure</h4>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Encrypted gameplay logs ensure total transparency and no cheating.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-5">
                          <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20">
                             <Trophy className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-white font-black uppercase italic tracking-tight mb-1 text-sm">Skill-Based Win</h4>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">No random draws. Your precision score determines your rank.</p>
                          </div>
                        </div>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Leaderboard */}
          <div className="lg:col-span-4 space-y-6">
            <Leaderboard competitionId={id || ""} />
            
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-[32px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
               <h4 className="text-primary font-black uppercase italic tracking-widest text-xs mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Live Strategy
               </h4>
               <p className="text-slate-400 text-sm leading-relaxed font-semibold relative z-10">
                  Precision is key. The closer you are to the center, the higher your multiplier. Watch the leaderboard live to stay on top!
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
