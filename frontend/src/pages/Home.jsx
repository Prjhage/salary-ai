import React from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  Brain,
  Users,
  Target,
  Lightbulb,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Clock,
  Building2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-20 pb-20"
    >
      {/* -------- Hero Section -------- */}
      <section className="relative min-h-[500px] flex items-center justify-center rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-900/20 backdrop-blur-sm">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-600/20 to-transparent blur-[100px]"
          />
        </div>

        <div className="relative z-10 px-8 text-center max-w-4xl">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next-Gen Workforce Analysis
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]"
          >
            Predicting the <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent italic px-2">
              Future
            </span>
            of Talent
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Harness the power of XGBoost and Advanced Clustering to decrypt compensation patterns and optimize your human capital with surgical precision.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => navigate("/predict")}
              className="group relative px-8 py-4 bg-blue-600 rounded-2xl font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Initialize Prediction <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700" />
            </button>
            <button
              onClick={() => navigate("/insights")}
              className="px-8 py-4 glass-card glass-card-hover font-bold text-slate-200 hover:text-white"
            >
              Explore Model Architecture
            </button>
          </motion.div>
        </div>
      </section>

      {/* -------- Stats Section -------- */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <MetricCard
            icon={<Brain className="text-blue-400" size={32} />}
            label="Confidence Interval"
            value="92.5%"
            subValue="+1.2% from v1.1"
          />
          <MetricCard
            icon={<TrendingUp className="text-indigo-400" size={32} />}
            label="Data Throughput"
            value="15.8k"
            subValue="Tokens/sec"
          />
          <MetricCard
            icon={<Users className="text-purple-400" size={32} />}
            label="Latent Features"
            value="35"
            subValue="Weight Analysis"
          />
          <MetricCard
            icon={<Target className="text-emerald-400" size={32} />}
            label="Model Variance"
            value="0.04"
            subValue="Optimized"
          />
        </div>
      </motion.section>

      {/* -------- Features Section -------- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Comprehensive <br />
            <span className="text-blue-500">Feature Engineering</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Our pipeline doesn't just look at numbers. It analyzes the complex interplay between tenure, role hierarchy, and organizational dynamics.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, label: "Education Influence" },
              { icon: Briefcase, label: "Role Hierarchy" },
              { icon: Clock, label: "Tenure Weight" },
              { icon: Building2, label: "Dept. Dynamics" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 glass-card border-white/5 bg-white/[0.02]">
                <feature.icon size={20} className="text-blue-400" />
                <span className="text-slate-300 font-medium text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-4 bg-blue-500/20 rounded-[2.5rem] blur-2xl group-hover:bg-blue-500/30 transition-all duration-500" />
          <div className="glass-card relative p-1 overflow-hidden">
            <div className="relative p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-2 w-24 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-1/2 h-full bg-blue-500"
                  />
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
              </div>
              <div className="space-y-4">
                {[80, 60, 90, 40].map((w, i) => (
                  <div key={i} className="h-4 bg-white/5 rounded-lg flex items-center px-4 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${w}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                      className="absolute inset-x-0 h-full bg-blue-500/20 border-r border-blue-400/50"
                    />
                    <span className="relative z-10 text-[10px] font-mono text-slate-500">LAYER_0{i + 1} ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* -------- AI Banner -------- */}
      <motion.section
        variants={itemVariants}
        className="relative p-12 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-indigo-900/40 via-blue-900/40 to-slate-900/40 border border-white/10"
      >
        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30 text-blue-400 animate-float">
            <Brain size={48} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Ready to augment your HR strategy?</h2>
          <p className="text-slate-400 text-lg max-w-xl">
            Join the elite organizations using data as their primary competitive advantage.
          </p>
          <button
            onClick={() => navigate("/predict")}
            className="mt-4 px-10 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg hover:scale-105 transition-transform hover:shadow-2xl"
          >
            LAUNCH ANALYZER
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
};

const MetricCard = ({ icon, label, value, subValue }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className="glass-card glass-card-hover p-8 relative group"
  >
    <div className="absolute top-4 right-4 text-white/5 group-hover:text-blue-500/10 transition-colors">
      <Brain size={80} />
    </div>
    <div className="relative z-10 space-y-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-blue-500/30 transition-colors">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-1">
          {value}
        </h3>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-4 bg-blue-500/50" />
          <span className="text-[10px] text-blue-400 font-mono italic">{subValue}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Home;
