import React from "react";

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
};

export default ChartCard;
