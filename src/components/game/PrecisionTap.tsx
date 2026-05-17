import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Target, Trophy, Play } from "lucide-react";

interface PrecisionTapProps {
  onScoreSubmit: (score: number) => void;
  difficulty?: number; // 1 to 10
}

export default function PrecisionTap({ onScoreSubmit, difficulty = 5 }: PrecisionTapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "result">("idle");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const requestRef = useRef<number>(null);
  const barPos = useRef(0);
  const direction = useRef(1);
  const speed = 2 + (difficulty * 0.5);

  const update = useCallback(() => {
    if (gameState !== "playing") return;

    barPos.current += speed * direction.current;

    if (barPos.current >= 100 || barPos.current <= 0) {
      direction.current *= -1;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw track
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fillRect(0, canvas.height / 2 - 1, canvas.width, 2);

        // Draw target (center)
        ctx.fillStyle = "#10B981"; // primary
        const centerX = canvas.width / 2;
        
        // Bullseye circle
        ctx.beginPath();
        ctx.arc(centerX, canvas.height / 2, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Target ring
        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, canvas.height / 2, 60, 0, Math.PI * 2);
        ctx.stroke();

        // Target zone glow
        const gradient = ctx.createRadialGradient(centerX, canvas.height / 2, 0, centerX, canvas.height / 2, 80);
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.1)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, canvas.height / 2, 80, 0, Math.PI * 2);
        ctx.fill();

        // Draw moving bar
        const barX = (barPos.current / 100) * canvas.width;
        ctx.fillStyle = "#F8FAFC"; // white
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#6366F1"; // accent
        ctx.fillRect(barX - 1.5, canvas.height / 2 - 40, 3, 80);
        ctx.shadowBlur = 0;
      }
    }

    requestRef.current = requestAnimationFrame(update);
  }, [gameState, speed]);

  useEffect(() => {
    if (gameState === "playing") {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, update]);

  const handleTap = () => {
    if (gameState !== "playing") return;

    const diffFromCenter = Math.abs(50 - barPos.current); // 0 to 50
    const accuracy = Math.max(0, 100 - (diffFromCenter * 2));
    
    setScore(Number(accuracy.toFixed(2)));
    setGameState("result");
    
    if (accuracy >= 98) setFeedback("LEGENDARY!");
    else if (accuracy >= 90) setFeedback("EXCELLENT!");
    else if (accuracy >= 75) setFeedback("GREAT!");
    else if (accuracy >= 50) setFeedback("GOOD");
    else setFeedback("KEEP TRYING!");

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const startGame = () => {
    setGameState("playing");
    setScore(null);
    barPos.current = Math.random() * 100;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card rounded-[32px] border border-border shadow-2xl w-full max-w-lg mx-auto aspect-square relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <AnimatePresence mode="wait">
        {gameState === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center z-10"
          >
            <div className="bg-primary/10 p-6 rounded-[24px] mb-8 inline-block border border-primary/20">
              <Target className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">Precision Tap</h3>
            <p className="text-slate-400 mb-10 max-w-[280px] mx-auto text-sm font-semibold leading-relaxed">
              Stop the marker exactly on the bullseye to score maximum points.
            </p>
            <Button onClick={startGame} className="bg-secondary text-white hover:brightness-110 px-12 py-8 rounded-[20px] text-xl font-black shadow-2xl shadow-secondary/20 transition-all border-none h-auto">
              PLAY FREE ENTRY
            </Button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10"
            onClick={handleTap}
          >
            <canvas
              ref={canvasRef}
              width={450}
              height={450}
              className="w-full cursor-pointer h-2/3"
            />
            <div className="mt-12 text-slate-500 animate-pulse font-black tracking-[0.3em] text-[10px] uppercase">
              TAP ANYWHERE TO STOP
            </div>
          </motion.div>
        )}

        {gameState === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10"
          >
            <div className="bg-primary/10 p-6 rounded-full mb-8 inline-block border border-primary/20 relative">
               <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
               <Trophy className="w-16 h-16 text-primary relative z-10" />
            </div>
            <div className="text-slate-500 uppercase tracking-[0.2em] text-[10px] font-black mb-2">
              Final Accuracy
            </div>
            <div className="text-7xl font-black text-white mb-3 font-mono tracking-tighter">
              {score}%
            </div>
            <div className="text-primary font-black tracking-widest mb-10 italic uppercase text-lg">
              {feedback}
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setGameState("idle")} className="border-border bg-background/50 text-white hover:bg-background px-8 py-6 rounded-xl font-black uppercase tracking-widest text-xs h-auto">
                RETRY
              </Button>
              <Button onClick={() => onScoreSubmit(score!)} className="bg-primary text-primary-foreground hover:brightness-110 px-8 py-6 rounded-xl font-black uppercase tracking-widest text-xs h-auto border-none">
                SUBMIT SCORE
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
