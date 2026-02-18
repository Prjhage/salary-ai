import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import ModelInsights from "./pages/ModelInsights";
import SalaryPrediction from "./pages/SalaryPrediction";

const Layout = ({ children }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/insights":
        return "Model Insights";
      case "/predict":
        return "Salary Prediction";
      default:
        return "Salary AI";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#030712] text-slate-200">
      <Sidebar />
      <div className="flex flex-col flex-1 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32" />
        
        <Navbar title={getPageTitle()} />
        <main className="flex-1 p-8 relative z-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />{" "}
        <Route
          path="/insights"
          element={
            <Layout>
              <ModelInsights />
            </Layout>
          }
        />{" "}
        <Route
          path="/predict"
          element={
            <Layout>
              <SalaryPrediction />
            </Layout>
          }
        />{" "}
      </Routes>{" "}
    </Router>
  );
};

export default App;
