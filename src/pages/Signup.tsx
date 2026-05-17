import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Chrome, Github } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    await loginWithGoogle();
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-24 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-900 border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-2.5 rounded-xl">
                <Zap className="h-6 w-6 text-white fill-current" />
              </div>
            </div>
            <CardTitle className="text-3xl font-black text-white tracking-tighter italic">JOIN THE ELITE</CardTitle>
            <CardDescription className="text-slate-400 font-medium">
              Create your account to start competing for world-class prizes.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Button 
                onClick={handleGoogleSignup} 
                className="w-full bg-white text-black hover:bg-slate-200 font-bold h-14 rounded-xl flex items-center justify-center gap-3 text-lg"
              >
                <Chrome className="h-6 w-6" />
                Sign up with Google
              </Button>
            </div>

            <div className="mt-8 p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed">
                  Only Google Login is supported in this competition environment for verified skill validation.
                </p>
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-800 py-6">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-bold hover:text-blue-400 transition-colors">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
