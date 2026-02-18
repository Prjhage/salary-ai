import React from "react";
import { ChevronRight, Layout } from "lucide-react";

const Navbar = ({ title }) => {
  return (
    <nav className="bg-transparent px-8 py-6 flex items-center justify-between relative z-20">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
          <span>Salary AI</span>
          <ChevronRight size={14} />
          <span className="text-slate-200">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">
            API Live
          </span>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors">
          <Layout size={18} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
