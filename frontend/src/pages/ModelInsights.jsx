import React from "react";
import { Brain, TrendingUp, Users, Target } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Local reusable metric card with animation
const MetricCard = ({ icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
  >
    <div className="mb-3">{icon}</div>
    <h4 className="text-gray-500 text-sm font-medium">{label}</h4>
    <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
  </motion.div>
);

const ModelInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="p-8 bg-gray-50 min-h-screen"
    >
      {/* --- Page Title --- */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold text-gray-800 mb-8"
      >
        Model Insights
      </motion.h1>

      {/* -------- Key Metrics Section -------- */}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <MetricCard
            icon={<Brain className="text-blue-600" size={28} />}
            label="Model Accuracy"
            value="92.5%"
            delay={0.1}
          />
          <MetricCard
            icon={<TrendingUp className="text-green-600" size={28} />}
            label="Predictions Made"
            value="1,240+"
            delay={0.2}
          />
          <MetricCard
            icon={<Users className="text-purple-600" size={28} />}
            label="Employee Groups"
            value="3 Clusters"
            delay={0.3}
          />
          <MetricCard
            icon={<Target className="text-orange-600" size={28} />}
            label="R² Score"
            value="0.94"
            delay={0.4}
          />
        </div>
      </section>

      {/* --- Charts Section --- */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Regression Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              XGBoost - Actual vs Predicted MonthlyIncome
            </h3>
            <motion.img
              src="/regression.png"
              alt="XGBoost Actual vs Predicted"
              className="w-full h-auto rounded-lg border border-gray-200"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Clustering Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              KMeans Clustering of Employees
            </h3>
            <motion.img
              src="/clustering.png"
              alt="KMeans Clustering"
              className="w-full h-auto rounded-lg border border-gray-200"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ModelInsights;
