import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Users, Trophy } from "lucide-react";

const ALL_COMPETITIONS = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    prize: "Brand new iPhone 15 Pro Max 256GB Platinum Black",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600",
    entryPrice: 50,
    endsIn: "2d 4h 12m",
    topScore: 98.42,
    totalEntries: 245,
    status: "active"
  },
  {
    id: "2",
    title: "PS5 Spider-Man 2 Edition",
    prize: "Sony PlayStation 5 Console - Limited Edition Marvel's Spider-Man 2 Bundle",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=600",
    entryPrice: 25,
    endsIn: "5d 1h 30m",
    topScore: 99.10,
    totalEntries: 112,
    status: "active"
  },
  {
    id: "3",
    title: "$1000 Cash Prize",
    prize: "Straight to your bank account or PayPal. Winner takes all.",
    image: "https://images.unsplash.com/photo-1518183204740-fa9f8e434795?auto=format&fit=crop&q=80&w=600",
    entryPrice: 10,
    endsIn: "12h 45m",
    topScore: 97.22,
    totalEntries: 560,
    status: "active"
  },
  {
    id: "4",
    title: "MacBook Pro M3",
    prize: "14-inch MacBook Pro with M3 Chip 16GB RAM 512GB SSD",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
    entryPrice: 75,
    endsIn: "8d 10h",
    topScore: 95.00,
    totalEntries: 82,
    status: "active"
  }
];

export default function CompetitionList() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 bg-card p-10 rounded-[32px] border border-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-2">LIVE LOOT</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Join thousands of players competing daily for legendary prizes.</p>
          </div>
          <div className="flex gap-3 relative z-10">
             <Button className="bg-primary text-primary-foreground font-black px-6 rounded-xl text-[10px] uppercase tracking-widest h-10 border-none shadow-xl shadow-primary/20">All Games</Button>
             <Button variant="outline" className="border-border bg-background/50 text-slate-400 hover:text-white px-6 rounded-xl text-[10px] uppercase tracking-widest h-10 transition-all">Featured</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_COMPETITIONS.map((comp, idx) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
               <Card className="bg-card border-border overflow-hidden group hover:scale-[1.02] transition-all duration-500 rounded-[32px] h-full flex flex-col border shadow-2xl relative">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={comp.image}
                      alt={comp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-primary text-primary-foreground border-0 font-black tracking-widest text-[10px] py-1.5 px-4 rounded-full uppercase">
                        {comp.entryPrice === 0 ? "FREE" : "ACTIVE"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full border border-border flex items-center gap-2 shadow-xl">
                       <Timer className="w-4 h-4 text-primary" />
                       <span className="text-white text-xs font-black font-mono tracking-tighter">{comp.endsIn}</span>
                    </div>
                  </div>
                  <CardHeader className="p-8 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{comp.title}</h3>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Top Accuracy</div>
                        <div className="text-primary font-mono font-black text-lg">{comp.topScore}%</div>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm font-semibold leading-relaxed line-clamp-2">
                      {comp.prize}
                    </p>
                  </CardHeader>
                  <CardContent className="px-8 py-6 flex-grow">
                     <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                           <Users className="w-4 h-4 text-primary opacity-70" />
                           {comp.totalEntries} Players
                        </div>
                        <div className="flex items-center gap-2">
                           <Trophy className="w-4 h-4 text-primary opacity-70" />
                           Instant Payout
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0 mt-auto">
                    <Button className="w-full bg-slate-900 hover:bg-primary text-white hover:text-primary-foreground font-black h-14 rounded-2xl border border-border transition-all shadow-xl uppercase tracking-widest text-sm" asChild>
                      <Link to={`/competition/${comp.id}`}>
                        ENTER NOW — R{comp.entryPrice}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
