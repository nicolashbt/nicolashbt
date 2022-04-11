import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Marketplace from "./pages/marketplace/Marketplace";
import Category from "./pages/marketplace/Category";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container mx-auto p-10 max-w-2xl bg-base-200 rounded-lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/notfound" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer autoClose={2500} theme="dark" />
    </>
  );
}

export default App;
