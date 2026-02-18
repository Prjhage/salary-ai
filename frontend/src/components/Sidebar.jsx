import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Brain, LineChart, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/predict", label: "Salary Prediction", icon: Brain },
    { path: "/insights", label: "Model Insights", icon: LineChart },
  ];

  return (
    <aside className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 z-20">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <LayoutDashboard className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
          Salary AI
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${location.pathname === item.path
                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
          >
            <item.icon
              size={20}
              className={location.pathname === item.path ? "text-blue-400" : "group-hover:text-slate-200"}
            />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <footer className="mt-auto px-4 py-6 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 glass-card bg-slate-800/20 border-white/5">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
            AI
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-300">v1.2.0-Alpha</p>
            <p className="text-[10px] text-slate-500">Core Engine Online</p>
          </div>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
