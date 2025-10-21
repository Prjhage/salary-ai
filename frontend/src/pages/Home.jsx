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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-8 py-10 space-y-16"
    >
      {/* -------- Hero Section -------- */}
      <section className="bg-blue-50 border border-blue-100 p-10 rounded-2xl text-center shadow-sm">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          AI-Powered Salary Prediction System
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Make data-driven HR decisions with our advanced machine learning
          platform. Predict employee salaries, analyze compensation patterns,
          and optimize workforce planning with intelligent insights.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/predict")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started →
          </button>
          <button
            onClick={() => navigate("/insights")}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            View Analytics
          </button>
        </div>
      </section>

      {/* -------- Key Metrics Section -------- */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Model Performance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            icon={<Brain className="text-blue-600" size={28} />}
            label="Model Accuracy"
            value="92.5%"
          />
          <MetricCard
            icon={<TrendingUp className="text-green-600" size={28} />}
            label="Predictions Made"
            value="1,240+"
          />
          <MetricCard
            icon={<Users className="text-purple-600" size={28} />}
            label="Employee Groups"
            value="3 Clusters"
          />
          <MetricCard
            icon={<Target className="text-orange-600" size={28} />}
            label="R² Score"
            value="0.94"
          />
        </div>
      </section>

      {/* -------- What We Analyze -------- */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          What We Analyze
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyzeItem
            icon={<Lightbulb className="text-blue-500" size={18} />}
            title="Age"
            subtitle="Employee age factor"
          />
          <AnalyzeItem
            icon={<Building2 className="text-blue-500" size={18} />}
            title="Department"
            subtitle="Organizational unit"
          />
          <AnalyzeItem
            icon={<Briefcase className="text-blue-500" size={18} />}
            title="Total Working Years"
            subtitle="Career experience"
          />
          <AnalyzeItem
            icon={<Briefcase className="text-blue-500" size={18} />}
            title="Job Level"
            subtitle="Position hierarchy"
          />
          <AnalyzeItem
            icon={<Clock className="text-blue-500" size={18} />}
            title="Distance From Home"
            subtitle="Commute distance"
          />
          <AnalyzeItem
            icon={<GraduationCap className="text-blue-500" size={18} />}
            title="Education"
            subtitle="Academic background"
          />
          <AnalyzeItem
            icon={<Clock className="text-blue-500" size={18} />}
            title="Years at Company"
            subtitle="Tenure"
          />
          <AnalyzeItem
            icon={<Clock className="text-blue-500" size={18} />}
            title="Years in Current Role"
            subtitle="Position tenure"
          />
          <AnalyzeItem
            icon={<Clock className="text-blue-500" size={18} />}
            title="Years Since Last Promotion"
            subtitle="Advancement timeline"
          />
          <AnalyzeItem
            icon={<TrendingUp className="text-blue-500" size={18} />}
            title="Percent Salary Hike"
            subtitle="Compensation growth"
          />
        </div>
      </section>

      {/* -------- How It Works Section -------- */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <StepCard
            number="1"
            title="Enter Employee Data"
            description="Input employee information such as age, department, experience, and education level."
          />
          <StepCard
            number="2"
            title="Process with ML"
            description="Our models analyze the data using advanced machine learning algorithms."
          />
          <StepCard
            number="3"
            title="Get Predictions"
            description="Receive accurate salary predictions and employee classification results."
          />
          <StepCard
            number="4"
            title="Make Decisions"
            description="Use insights to optimize compensation and HR strategy effectively."
          />
        </div>
      </section>

      {/* -------- Call To Action Section -------- */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-10 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-2">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Start predicting salaries and gaining insights into your workforce
          today. Our AI-powered system is designed for modern HR teams.
        </p>
        <button
          onClick={() => navigate("/predict")}
          className="bg-white text-blue-700 font-medium px-6 py-2 rounded-lg hover:bg-blue-50 transition flex items-center gap-2 mx-auto"
        >
          Launch Prediction Dashboard <ArrowRight size={18} />
        </button>
      </section>
    </motion.div>
  );
};

/* ---------- Reusable Components ---------- */

const MetricCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.2 }}
    className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm flex flex-col items-start"
  >
    <div className="mb-3">{icon}</div>
    <p className="text-sm text-gray-500">{label}</p>
    <h3 className="text-xl font-bold text-gray-800 mt-1">{value}</h3>
  </motion.div>
);

const AnalyzeItem = ({ icon, title, subtitle }) => (
  <div className="flex items-start gap-3 border border-gray-100 rounded-lg p-4 bg-white hover:shadow-sm transition">
    <div>{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
      <p className="text-gray-500 text-xs">{subtitle}</p>
    </div>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="bg-white border border-gray-100 rounded-xl shadow-sm p-6"
  >
    <div className="text-blue-600 text-3xl font-bold mb-2">{number}</div>
    <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-500 text-sm">{description}</p>
  </motion.div>
);

export default Home;
