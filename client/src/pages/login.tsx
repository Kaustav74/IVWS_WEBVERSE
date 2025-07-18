import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import StarfieldBackground from "@/components/starfield-background";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe });
  };

  const handleDemoAccess = () => {
    // Handle demo access
    console.log("Demo access requested");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-space-blue relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Deep space background" 
          className="w-full h-full object-cover opacity-30" 
        />
        <StarfieldBackground />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => setLocation("/")}
        className="absolute top-8 left-8 z-20 text-stellar-gold hover:text-white transition-colors"
      >
        <ArrowLeft size={24} />
      </motion.button>

      {/* Login Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="animate-float">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-stellar-gold mr-3">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="m3.27 6.96 8.73 5.04 8.73-5.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-3xl">StarScope</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-bold text-2xl mb-2 text-stellar-gold"
            >
              Welcome Back
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400"
            >
              Sign in to your cosmic account
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-cosmic-purple/60 backdrop-blur-md p-8 rounded-3xl border border-stellar-gold/30"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-space-blue/60 border border-stellar-gold/30 rounded-xl text-white placeholder-gray-400 focus:border-stellar-gold focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-space-blue/60 border border-stellar-gold/30 rounded-xl text-white placeholder-gray-400 focus:border-stellar-gold focus:outline-none focus:ring-2 focus:ring-stellar-gold/20 transition-all duration-300 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-stellar-gold transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    className="accent-stellar-gold"
                  />
                  <Label htmlFor="remember" className="text-gray-400 text-sm">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-stellar-gold hover:text-aurora-green text-sm transition-colors">
                  Forgot password?
                </a>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-stellar-gold to-aurora-green text-space-blue py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 animate-glow"
              >
                Sign In
              </Button>
              
              <div className="text-center">
                <span className="text-gray-400">Don't have an account? </span>
                <a href="#" className="text-stellar-gold hover:text-aurora-green transition-colors">
                  Sign up
                </a>
              </div>
            </form>
            
            {/* Social Login */}
            <div className="mt-6 pt-6 border-t border-stellar-gold/20">
              <p className="text-center text-gray-400 mb-4">Or continue with</p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center px-4 py-2 bg-space-blue/60 border border-stellar-gold/30 rounded-xl hover:border-stellar-gold/60 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-white">Google</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center px-4 py-2 bg-space-blue/60 border border-stellar-gold/30 rounded-xl hover:border-stellar-gold/60 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-white">Apple</span>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Demo Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="bg-aurora-green/20 border border-aurora-green/40 rounded-2xl p-4">
              <h3 className="font-semibold text-aurora-green mb-2">Demo Access</h3>
              <p className="text-gray-400 text-sm mb-3">Try StarScope with limited features</p>
              <Button
                onClick={handleDemoAccess}
                className="bg-aurora-green text-space-blue px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Start Demo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
