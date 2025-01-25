import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import JobVacancy from "./pages/JobVacancy";
import About from "./pages/About";

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
