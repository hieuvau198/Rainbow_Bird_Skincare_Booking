import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout/UserLayout";
import Home from "../pages/Home";
import Loading from "../components/Loading";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Employee from "../pages/Admin/Employee/Employee";
import Booking from "../pages/Admin/Booking/Booking";
import MaService from "../pages/Admin/Service/Service";
import AboutUs from "../pages/About Us/AboutUs";
import Feedback from "../pages/Admin/Feedback/Feedback";
import Customer from "../pages/Admin/Customer/Customer";
import AdminProfile from "../pages/Admin/Profile/Profile";
import Login from "../pages/Login/Login";
import LoginC from "../pages/Login/LoginC";
import Quiz from "../pages/Customer/Quiz/Quiz";
import Profile from "../pages/Customer/Profile/Profile";
import Service from "../pages/Customer/Service/Service";
import ViewTherapist from "../pages/Customer/ViewTherapist/ViewTherapist";
import ScheduleBooking from "../pages/Customer/ScheduleBooking/ScheduleBooking";
import Rating from "../pages/Customer/Rating/Rating";
import News from "../pages/Customer/BlogsAndNews/News";
import ManageQuiz from "../pages/Admin/Quiz/ManageQuiz";
import TherapistProfile from "../pages/Customer/ViewTherapist/TherapistProfile";

const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const ForgotPassword = lazy(() => import("../pages/ForgorPassword/ForgotPassword"));
const PageNotFound = lazy(() => import("../layouts/PageNotFound"));
const ServerError = lazy(() => import("../layouts/ServerError/ServerError"));
const Maintenance = lazy(() => import("../layouts/Maintenance/Maintenance"));

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<Service />} />
          <Route path="/schedule-booking" element={<ScheduleBooking />} />
          <Route path="/therapists" element={<ViewTherapist />} />
          <Route path="/therapists/:id" element={<TherapistProfile />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/news" element={<News />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="booking" element={<Booking />} />
          <Route path="service" element={<MaService />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="customer" element={<Customer />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="quiz" element={<ManageQuiz />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="loginc" element={<LoginC />} />
        <Route
          path="sign-up"
          element={
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPassword />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <PageNotFound />
            </Suspense>
          }
        />
        <Route
          path="/500"
          element={
            <Suspense fallback={<Loading />}>
              <ServerError />
            </Suspense>
          }
        />
        <Route
          path="/maintenance"
          element={
            <Suspense fallback={<Loading />}>
              <Maintenance />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}