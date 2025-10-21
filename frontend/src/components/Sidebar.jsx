import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartLine, FaUsers, FaLayerGroup, FaHome } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-8 text-center">
        Salary AI
      </h1>

      <nav className="flex flex-col gap-2">
        <Link to="/" className={linkClasses("/")}>
          <FaHome /> Home
        </Link>
        <Link to="/predict" className={linkClasses("/predict")}>
          <FaUsers /> Salary Prediction
        </Link>
        <Link to="/insights" className={linkClasses("/insights")}>
          <FaChartLine /> Model Insights
        </Link>
      </nav>

      <footer className="mt-auto text-center text-gray-400 text-sm pt-6">
        © 2025 HR Salary AI
      </footer>
    </aside>
  );
};

export default Sidebar;
