import React from "react";

const StatCard = ({ title, value, color, icon }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 border-blue-300",
    green: "bg-green-100 text-green-700 border-green-300",
    purple: "bg-purple-100 text-purple-700 border-purple-300",
    orange: "bg-orange-100 text-orange-700 border-orange-300",
  };

  return (
    <div
      className={`flex flex-col justify-center items-start gap-2 p-4 rounded-2xl border shadow-sm ${colorClasses[color]} transition-transform hover:scale-[1.02]`}
    >
      <div className="text-3xl">{icon}</div>
      <p className="text-sm font-medium">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;
