import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Target, CreditCard, History, LayoutDashboard, Settings, Zap, ArrowRight, Star } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const MOCK_ENTRIES = [
    { id: "e1", comp: "iPhone 15 Pro Max", score: 94.20, rank: 12, date: "2024-03-15", status: "Active" },
    { id: "e2", comp: "$1000 Cash Prize", score: 88.50, rank: 45, date: "2024-03-14", status: "Active" },
    { id: "e3", comp: "MacBook Pro M3", score: 91.10, rank: 8, date: "2024-03-10", status: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 bg-card p-8 rounded-[32px] border border-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-6 relative z-10">
             <Avatar className="h-20 w-20 border-4 border-primary/20 p-1 bg-background">
                <AvatarImage src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.uid}`} />
                <AvatarFallback className="bg-primary text-primary-foreground font-black text-2xl">{user?.displayName?.[0]}</AvatarFallback>
             </Avatar>
             <div>
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">{user?.displayName || "Skill Gamer"}</h1>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{user?.email}</p>
             </div>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10 w-full md:w-auto">
             <div className="bg-background/50 border border-border p-4 rounded-2xl flex items-center gap-4 flex-grow md:flex-grow-0">
                <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
                   <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                   <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Wallet Balance</div>
                   <div className="text-white font-black font-mono text-lg">R250.00</div>
                </div>
             </div>
             <Button className="bg-secondary text-white hover:brightness-110 font-black px-8 rounded-2xl h-auto py-5 border-none shadow-xl shadow-secondary/20">
                ADD CREDITS
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {/* Sidebar */}
           <div className="md:col-span-1 space-y-3">
              {[
                 { label: "Overview", icon: LayoutDashboard, active: true },
                 { label: "My Entries", icon: Target },
                 { label: "Withdraw", icon: CreditCard },
                 { label: "Settings", icon: Settings },
              ].map((item) => (
                 <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                       item.active 
                        ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20" 
                        : "text-slate-500 hover:text-white hover:bg-card border border-transparent hover:border-border"
                    }`}
                 >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                 </button>
              ))}
           </div>

           {/* Main Content */}
           <div className="md:col-span-3 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {[
                    { label: "Active Entries", value: "2", icon: Target, color: "text-indigo-400" },
                    { label: "Total Wins", value: "0", icon: Trophy, color: "text-primary" },
                    { label: "Best Accuracy", value: "94.20%", icon: Zap, color: "text-amber-400" },
                 ].map((stat) => (
                    <Card key={stat.label} className="bg-card border-border rounded-[24px] overflow-hidden shadow-xl">
                       <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                             <div className={`p-3 rounded-xl bg-background border border-border ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                             </div>
                          </div>
                          <div className="text-3xl font-black text-white font-mono tracking-tighter mb-1">{stat.value}</div>
                          <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                       </CardContent>
                    </Card>
                 ))}
              </div>

              {/* Recent Entries */}
              <div className="bg-card rounded-[32px] border border-border overflow-hidden shadow-2xl">
                 <div className="p-8 border-b border-border/50 flex justify-between items-center bg-card">
                    <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                       <History className="w-4 h-4 text-primary" />
                       Recent Entries
                    </h3>
                    <Button variant="link" className="text-primary text-[10px] font-black uppercase tracking-widest p-0">View History</Button>
                 </div>
                 <div className="overflow-x-auto">
                    <Table>
                       <TableHeader className="bg-background/30">
                          <TableRow className="border-border hover:bg-transparent">
                             <TableHead className="font-black text-slate-500 uppercase text-[9px] tracking-[0.2em] px-8 py-4">Competition</TableHead>
                             <TableHead className="text-center font-black text-slate-500 uppercase text-[9px] tracking-[0.2em]">Accuracy</TableHead>
                             <TableHead className="text-center font-black text-slate-500 uppercase text-[9px] tracking-[0.2em]">Rank</TableHead>
                             <TableHead className="text-right font-black text-slate-500 uppercase text-[9px] tracking-[0.2em] px-8">Status</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {MOCK_ENTRIES.map((entry) => (
                             <TableRow key={entry.id} className="border-border/50 hover:bg-background/20 transition-colors">
                                <TableCell className="font-black text-white uppercase text-xs px-8 py-5 tracking-tight italic">{entry.comp}</TableCell>
                                <TableCell className="text-center font-mono font-black text-primary text-base">{entry.score.toFixed(2)}%</TableCell>
                                <TableCell className="text-center font-mono font-black text-slate-400 text-sm">#{entry.rank}</TableCell>
                                <TableCell className="text-right px-8">
                                   <Badge className={`${entry.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-800 text-slate-400 border-border'} rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest`}>
                                      {entry.status}
                                   </Badge>
                                </TableCell>
                             </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                 <Card className="bg-secondary border-0 rounded-[32px] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
                    <CardContent className="p-10 relative z-10">
                       <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-3">BOOST YOUR ODDS</h4>
                       <p className="text-indigo-100 text-sm font-semibold mb-8 leading-relaxed opacity-80">Buy entry packs and save up to 30%. More entries mean more practice and higher scores.</p>
                       <Button className="bg-white text-secondary hover:bg-slate-100 font-black rounded-2xl px-10 py-6 h-auto uppercase tracking-widest text-xs border-none shadow-2xl">
                          GET PACKS <ArrowRight className="ml-2 w-4 h-4" />
                       </Button>
                    </CardContent>
                 </Card>
                 <Card className="bg-card border-border rounded-[32px] overflow-hidden shadow-2xl">
                    <CardHeader className="p-8 pb-4">
                       <CardTitle className="text-xs font-black text-white uppercase italic tracking-[0.2em] flex items-center gap-3">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          Legendary Winners
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                       <div className="space-y-6">
                          {[
                             { name: "Alex R.", prize: "iPad Air", date: "2 days ago" },
                             { name: "Sarah M.", prize: "R5000 Cash", date: "5 days ago" }
                          ].map((winner, idx) => (
                             <div key={idx} className="flex items-center gap-5 border-b border-border/50 pb-6 last:border-0 last:pb-0">
                                <Avatar className="h-12 w-12 border border-border">
                                   <AvatarFallback className="bg-background text-primary font-black uppercase">{winner.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                   <div className="text-sm font-black text-white uppercase tracking-tight">{winner.name}</div>
                                   <div className="text-[10px] text-primary font-black uppercase tracking-widest">Won {winner.prize}</div>
                                </div>
                                <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                                   {winner.date}
                                </div>
                             </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
