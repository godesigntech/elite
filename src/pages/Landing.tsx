import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Trophy, Users, Timer, ArrowRight, Zap, Target, Star } from "lucide-react";

const ACTIVE_COMPETITIONS = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    prize: "Brand new iPhone 15 Pro Max 256GB Platinum Black",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600",
    entryPrice: 50,
    endsIn: "2d 4h 12m",
    topScore: 98.42,
    totalEntries: 245,
    tag: "MOST POPULAR"
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
    tag: "BEST VALUE"
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
    tag: "ENDING SOON"
  }
];

export default function Landing() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/20 mb-6 py-1.5 px-4 rounded-full text-xs font-bold tracking-widest uppercase">
              Skill over Luck
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
              COMPETE. <span className="text-blue-500">CONQUER.</span> <br />COLLECT.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              The premier platform for high-stakes, skill-based gaming. Prove your precision and win the world's most desired gadgets and cash prizes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 px-8 py-7 rounded-2xl text-lg font-bold group w-full sm:w-auto" asChild>
                <Link to="/competitions">
                  Browse Competitions
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-800 text-white hover:bg-slate-900 px-8 py-7 rounded-2xl text-lg font-bold w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />
                How It Works
              </Button>
            </div>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current text-amber-400" />
              <span className="text-white font-bold tracking-tighter">4.9/5 RATING</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500 fill-current" />
              <span className="text-white font-bold tracking-tighter">INSTANT PAYOUTS</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" />
              <span className="text-white font-bold tracking-tighter">ANTI-CHEAT SECURE</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-2 italic uppercase">FEATURED LOOT</h2>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Join thousands of players competing daily.</p>
            </div>
            <Button variant="link" className="text-primary font-bold p-0 flex items-center group h-auto uppercase tracking-widest text-xs" asChild>
              <Link to="/competitions">
                View All <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACTIVE_COMPETITIONS.map((comp, idx) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
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
                        {comp.tag}
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
                    <p className="text-slate-400 text-sm font-semibold leading-relaxed">
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
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-950 border-t border-slate-900">
         <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-center text-white mb-16 tracking-tighter">WIN IN 3 EASY STEPS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                  { icon: Zap, title: "Choose a Prize", desc: "Select from our range of high-value active competitions." },
                  { icon: Target, title: "Play to Win", desc: "Test your skills in our precision gaming challenges. Free entry available." },
                  { icon: Trophy, title: "Claim Victory", desc: "Top the leaderboard and get your prize delivered worldwide." }
               ].map((step, idx) => (
                  <div key={idx} className="text-center group">
                     <div className="bg-slate-900 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-800 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-500 group-hover:-translate-y-2">
                        <step.icon className="w-10 h-10 text-blue-400" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-4 italic">{step.title}</h3>
                     <p className="text-slate-400 max-w-[240px] mx-auto text-sm font-medium leading-relaxed">
                        {step.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
