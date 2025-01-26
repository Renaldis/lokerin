import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import JobVacancy from "./pages/JobVacancy";
import About from "./pages/About";
import Login from "./pages/Login";
import GlobalProvider from "./context/GlobalProvider";

function App() {
  const LoginRoute = ({ children }) => {
    if (localStorage.getItem("auth")) {
      return <Navigate to={"/dashboard"} />;
    } else {
      return children;
    }
  };

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/job-vacancy"
            element={
              <Layout>
                <JobVacancy />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
