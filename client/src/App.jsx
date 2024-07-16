import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import FoodPosting from "./pages/CreateFoodPosting";
import AllFoodPostings from "./pages/AllFoodPostings";
import EditFoodPosting from "./pages/EditFoodPosting";
import FoodPostInfo from "./pages/FoodPostInfo";

export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/foodpost-info/:postId" element={<FoodPostInfo />} />
        <Route element={<PrivateRoute />}>
          <Route path="/food-posting" element={<FoodPosting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="all-food-postings" element={<AllFoodPostings />} />
          <Route path="/foodpost/:postId" element={<EditFoodPosting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
