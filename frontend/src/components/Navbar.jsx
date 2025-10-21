import React from "react";
import { BarChart2, Home } from "lucide-react";

const Navbar = ({ title }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {title === "Home" ? (
          <Home size={20} className="text-blue-600" />
        ) : (
          <BarChart2 size={20} className="text-blue-600" />
        )}
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>
    </nav>
  );
};

export default Navbar;
