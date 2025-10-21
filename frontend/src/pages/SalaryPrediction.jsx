import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { predictSalary } from "../api";

const SalaryPrediction = () => {
  const [form, setForm] = useState({
    Age: "",
    Gender: "",
    Education: "",
    Field: "", // ✅ added this missing key
    Department: "",
    JobRole: "",
    JobLevel: "",
    YearsAtCompany: "",
    TotalWorkingYears: "",
    YearsInCurrentRole: "",
    YearsSinceLastPromotion: "",
    YearsWithCurrManager: "",
    DistanceFromHome: "",
    PercentSalaryHike: "",
    PerformanceRating: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const response = await predictSalary(form);
    setResult(response); // Store the full response object
  } catch (error) {
    console.error("Error predicting salary:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-8 py-10"
    >
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Salary Prediction Form
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
        Enter employee details to predict salary using our AI-driven model.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-10 max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100"
      >
        {/* Demographics */}
        <SectionCard
          icon={<User className="text-blue-600" />}
          title="Demographics"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Age"
              name="Age"
              value={form.Age ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 28"
            />
            <Select
              label="Gender"
              name="Gender"
              value={form.Gender ?? ""}
              onChange={handleChange}
              options={["Male", "Female", "Other"]}
            />
            <Input
              label="Distance From Home (in km)"
              name="DistanceFromHome"
              value={form.DistanceFromHome ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 12"
            />
          </div>
        </SectionCard>

        {/* Education */}
        <SectionCard
          icon={<GraduationCap className="text-green-600" />}
          title="Education"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Education Level"
              name="Education"
              value={form.Education ?? ""}
              onChange={handleChange}
              options={[
                "Below College",
                "College",
                "Bachelor",
                "Master",
                "Doctor",
              ]}
            />
            <Input
              label="Field of Study"
              name="Field"
              value={form.Field ?? ""}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
            />
          </div>
        </SectionCard>

        {/* Job Information */}
        <SectionCard
          icon={<Briefcase className="text-purple-600" />}
          title="Job Information"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Department"
              name="Department"
              value={form.Department ?? ""}
              onChange={handleChange}
              options={["Sales", "Research & Development", "Human Resources"]}
            />
            <Input
              label="Job Role"
              name="JobRole"
              value={form.JobRole ?? ""}
              onChange={handleChange}
              placeholder="e.g. Research Scientist"
            />
            <Input
              label="Job Level"
              name="JobLevel"
              value={form.JobLevel ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 3"
            />
          </div>
        </SectionCard>

        {/* Experience */}
        <SectionCard
          icon={<Clock className="text-orange-500" />}
          title="Experience"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Years at Company"
              name="YearsAtCompany"
              value={form.YearsAtCompany ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 5"
            />
            <Input
              label="Total Working Years"
              name="TotalWorkingYears"
              value={form.TotalWorkingYears ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 10"
            />
            <Input
              label="Years in Current Role"
              name="YearsInCurrentRole"
              value={form.YearsInCurrentRole ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 2"
            />
            <Input
              label="Years Since Last Promotion"
              name="YearsSinceLastPromotion"
              value={form.YearsSinceLastPromotion ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 1"
            />
            <Input
              label="Years with Current Manager"
              name="YearsWithCurrManager"
              value={form.YearsWithCurrManager ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 3"
            />
          </div>
        </SectionCard>

        {/* Performance Metrics */}
        <SectionCard
          icon={<TrendingUp className="text-teal-600" />}
          title="Performance Metrics"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Percent Salary Hike"
              name="PercentSalaryHike"
              value={form.PercentSalaryHike ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 15"
            />
            <Input
              label="Performance Rating (1–4)"
              name="PerformanceRating"
              value={form.PerformanceRating ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 3"
            />
          </div>
        </SectionCard>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow transition flex items-center gap-2 mx-auto"
          >
            {loading ? "Predicting..." : "Predict Salary"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </div>
      </form>

      {/* Prediction Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-center bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Predicted Salary: ₹{Number(result.predicted_salary).toLocaleString()}
          </h3>
          <p className="text-lg text-green-600 mb-2">
            Salary Range: {result.salary_range}
          </p>
          <p className="text-lg text-green-600">
            Cluster Description: {result.cluster_description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

/* --- Reusable Components --- */

const SectionCard = ({ icon, title, children }) => (
  <div className="border border-gray-100 rounded-xl shadow-sm p-6 bg-gray-50">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
    </div>
    {children}
  </div>
);

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div>
    <label className="block text-gray-600 text-sm font-medium mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-200 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-gray-600 text-sm font-medium mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value ?? ""} // ✅ fallback ensures controlled
      onChange={onChange}
      className="border border-gray-200 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
    >
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SalaryPrediction;
