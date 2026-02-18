import React from "react";
import { Brain, TrendingUp, Users, Target, Activity, ShieldCheck, Zap, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const performanceData = [
  { name: "Batch 1", accuracy: 88, latency: 120 },
  { name: "Batch 2", accuracy: 90, latency: 115 },
  { name: "Batch 3", accuracy: 92, latency: 118 },
  { name: "Batch 4", accuracy: 91, latency: 122 },
  { name: "Batch 5", accuracy: 94, latency: 110 },
  { name: "Batch 6", accuracy: 92.5, latency: 114 },
];

const featureImportance = [
  { name: "Job Level", value: 95, color: "#3b82f6" },
  { name: "Total Working Years", value: 77, color: "#6366f1" },
  { name: "Years At Company", value: 51, color: "#8b5cf6" },
  { name: "Age", value: 50, color: "#a855f7" },
  { name: "Years In Role", value: 39, color: "#d946ef" },
];

const clusterDistribution = [
  { name: "R&D", value: 961, fill: "#3b82f6" },
  { name: "Sales", value: 446, fill: "#6366f1" },
  { name: "HR", value: 63, fill: "#8b5cf6" },
];

const radarData = [
  { subject: 'Precision', A: 120, fullMark: 150 },
  { subject: 'Recall', A: 98, fullMark: 150 },
  { subject: 'F1 Score', A: 86, fullMark: 150 },
  { subject: 'Efficiency', A: 99, fullMark: 150 },
  { subject: 'Stability', A: 85, fullMark: 150 },
];

const ModelInsights = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 pb-20"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.div variants={itemVariants} className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-xs">
            <Activity size={14} /> System Laboratory
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl font-black text-white tracking-tight">
            Model <span className="text-glow text-blue-500 italic">Architecture</span>
          </motion.h1>
        </div>
        <motion.div variants={itemVariants} className="flex gap-3">
          <div className="px-4 py-2 glass-card border-green-500/20 bg-green-500/5 text-green-400 text-xs font-bold flex items-center gap-2">
            <ShieldCheck size={14} /> XGBOOST_VERIFIED
          </div>
          <div className="px-4 py-2 glass-card border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold flex items-center gap-2">
            <Zap size={14} /> LATENCY_114ms
          </div>
        </motion.div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Model Accuracy" value="92.5%" icon={<Target className="text-blue-400" />} />
        <MetricCard label="R² Benchmarking" value="0.941" icon={<BarChart3 className="text-indigo-400" />} />
        <MetricCard label="Data Samples" value="1,470" icon={<Users className="text-purple-400" />} />
        <MetricCard label="Feature Weights" value="35" icon={<PieChartIcon className="text-emerald-400" />} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Performance Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-8 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white tracking-tight">Inference Accuracy Trend</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] text-slate-500 font-bold">ACCURACY %</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Feature Importance */}
        <motion.div variants={itemVariants} className="lg:col-span-4 glass-card p-8">
          <h3 className="text-lg font-bold text-white tracking-tight mb-8">Top Weight Features</h3>
          <div className="space-y-6">
            {featureImportance.map((feature, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">{feature.name}</span>
                  <span className="text-white font-bold">{feature.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${feature.value * 2}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: feature.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cluster Analysis & Radar */}
        <motion.div variants={itemVariants} className="lg:col-span-6 glass-card p-8">
          <h3 className="text-lg font-bold text-white tracking-tight mb-8">Cluster Volume Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {clusterDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-6 glass-card p-8">
          <h3 className="text-lg font-bold text-white tracking-tight mb-4">Model Reliability Radar</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={10} />
                <Radar name="Model A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Static Images Reference Section */}
      <motion.section variants={itemVariants} className="pt-10 border-t border-white/5">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 text-center">Historical Benchmarks (Legacy Views)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="glass-card p-4">
            <p className="text-[10px] text-slate-500 mb-2 font-mono uppercase">Reference: Linear Regression Matrix</p>
            <img src="/regression.png" alt="Regression" className="w-full h-auto rounded-lg" />
          </div>
          <div className="glass-card p-4">
            <p className="text-[10px] text-slate-500 mb-2 font-mono uppercase">Reference: KMeans Spacial Mapping</p>
            <img src="/clustering.png" alt="Clustering" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

const MetricCard = ({ label, value, icon }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card p-6 flex items-center gap-5"
  >
    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</p>
      <h3 className="text-2xl font-black text-white italic tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

export default ModelInsights;
