import React from "react";

import Login from './views/auth/Login';
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/auth/ProtectedRoute';
import Register from "./views/auth/Regiter";

function App() {

  return (

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/blog/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path="/new" element={<ProtectedRoute><NewBlogPost /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>

  );
}

export default App;
