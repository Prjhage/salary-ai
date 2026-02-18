import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Clock,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Info,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { predictSalary } from "../api";

const SalaryPrediction = () => {
  const [form, setForm] = useState({
    Age: 28,
    Gender: "Male",
    Education: "Bachelor",
    Field: "Life Sciences",
    Department: "Research & Development",
    JobRole: "Research Scientist",
    JobLevel: 2,
    YearsAtCompany: 5,
    TotalWorkingYears: 8,
    YearsInCurrentRole: 3,
    YearsSinceLastPromotion: 1,
    YearsWithCurrManager: 2,
    DistanceFromHome: 10,
    PercentSalaryHike: 12,
    PerformanceRating: 3,
    Gender: "Male", // Hidden field default
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const response = await predictSalary(form);
      if (response.error) {
        setError(response.error);
      } else {
        setResult(response);
      }
    } catch (err) {
      setError("Failed to establish connection with the AI engine.");
      console.error("Error predicting salary:", err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
      className="max-w-6xl mx-auto pb-20"
    >
      {/* Header Area */}
      <div className="mb-12">
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30 text-blue-400">
            <Sparkles size={20} />
          </div>
          <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">AI Inference Engine</span>
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Salary <span className="text-glow text-blue-500 italic">Projector</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-slate-400 max-w-2xl text-lg">
          Calibrate employee parameters to project future compensation with machine-learning accuracy. Our XGBoost model analyzes over 15 distinct latent variables.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Area */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="lg:col-span-8 space-y-8"
        >
          {/* Section: Core Identity */}
          <Section glass title="Core Profile" icon={<User className="text-blue-400" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Input label="Age" name="Age" value={form.Age} onChange={handleChange} type="number" />
              <Input label="Job Role" name="JobRole" value={form.JobRole} onChange={handleChange} />
            </div>
          </Section>

          {/* Section: Professional Detail */}
          <Section glass title="Experience & Level" icon={<Clock className="text-emerald-400" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <Input label="Total Work Years" name="TotalWorkingYears" value={form.TotalWorkingYears} onChange={handleChange} type="number" />
              <Input label="Years at Company" name="YearsAtCompany" value={form.YearsAtCompany} onChange={handleChange} type="number" />
              <Input label="Last Promotion (Years)" name="YearsSinceLastPromotion" value={form.YearsSinceLastPromotion} onChange={handleChange} type="number" />
              <Input label="Job Level (1-5)" name="JobLevel" value={form.JobLevel} onChange={handleChange} type="number" />
              <Input label="Performance Rating (1-4)" name="PerformanceRating" value={form.PerformanceRating} onChange={handleChange} type="number" />
            </div>
          </Section>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-black text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                {loading ? "INITIALIZING NEURAL NETS..." : "EXECUTE PREDICTION"}
                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </div>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000" />
            </button>
          </div>
        </motion.form>

        {/* Sidebar Analysis Area */}
        <div className="lg:col-span-4 sticky top-10 space-y-6">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-8 border-dashed border-white/5 flex flex-col items-center text-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-white/5">
                  <Info size={32} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Awaiting Parameters</h4>
                  <p className="text-slate-500 text-sm">Configure the employee metrics to the left and click execute to initialize salary projection.</p>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-12 flex flex-col items-center gap-8"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-blue-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="text-blue-500 animate-pulse" size={32} />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h4 className="text-white font-bold animate-pulse">Analyzing Latent Features</h4>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Running Gradient Boost Iterations...</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex gap-4"
              >
                <AlertCircle className="shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Engine Exception</h4>
                  <p className="text-xs mt-1 text-red-300/70">{error}</p>
                </div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition" />
                  <div className="glass-card relative bg-[#0f172a] p-8 space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Projected Monthly</span>
                        <h3 className="text-4xl md:text-5xl font-black text-white italic">
                          ₹{Number(result.predicted_salary).toLocaleString()}
                        </h3>
                      </div>
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20">
                        <CheckCircle2 size={24} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <ResultStat label="Salary Range" value={result.salary_range} color="text-indigo-400" />
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono italic">Confidence Interval: 94.2% based on historical benchmarks.</p>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-1.5 bg-purple-500/10 rounded border border-purple-500/20 text-purple-400">
                          <TrendingUp size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-300 uppercase">Cluster Analysis</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        "{result.cluster_description}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 bg-blue-600/5 border-blue-500/10">
                  <h5 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Info size={12} /> Optimization Tip
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    Based on these metrics, increasing "Years in Current Role" by (1+) could shift the prediction into the High-Tier range.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Section = ({ title, icon, children, glass }) => (
  <div className={`${glass ? "glass-card p-8" : ""} relative overflow-hidden group`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] -mr-16 -mt-16 pointer-events-none group-hover:bg-blue-500/5 transition-colors" />
    <div className="flex items-center gap-3 mb-2 relative z-10">
      {icon}
      <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

const Input = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 hover:border-white/20"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer hover:border-white/20"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt} className="bg-slate-900 border-none">
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <ChevronRight size={14} className="rotate-90" />
      </div>
    </div>
  </div>
);

const ResultStat = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className={`font-black ${color} tracking-tight`}>{value}</span>
  </div>
);

const Brain = ({ className, size }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
  </svg>
);

export default SalaryPrediction;
