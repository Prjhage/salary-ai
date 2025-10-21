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
    <div className="flex min-h-screen bg-gray-100">
      {" "}
      {/* Sidebar */} <Sidebar />
      {/* Main Area */}{" "}
      <div className="flex flex-col flex-1">
        <Navbar title={getPageTitle()} />{" "}
        <main className="flex-1 p-6"> {children} </main>{" "}
      </div>{" "}
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
