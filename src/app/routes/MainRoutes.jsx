import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRole from "../../enums/userRole";
import Loading from "../components/Loading";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout/UserLayout";
import AboutUs from "../pages/About Us/AboutUs";
import Booking from "../pages/Admin/Booking/Booking";
import Customer from "../pages/Admin/Customer/Customer";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Employee from "../pages/Admin/Employee/Employee";
import Feedback from "../pages/Admin/Feedback/Feedback";
import AdminProfile from "../pages/Admin/Profile/Profile";
import ManageQuiz from "../pages/Admin/Quiz/ManageQuiz";
import MaService from "../pages/Admin/Service/Service";
import News from "../pages/Customer/BlogsAndNews/News";
import Profile from "../pages/Customer/Profile/Profile";
import Quiz from "../pages/Customer/Quiz/Quiz";
import Rating from "../pages/Customer/Rating/Rating";
import ScheduleBooking from "../pages/Customer/ScheduleBooking/ScheduleBooking";
import Service from "../pages/Customer/Service/Service";
import ServiceDetail from "../pages/Customer/Service/ServiceDetail";
import TherapistProfile from "../pages/Customer/ViewTherapist/TherapistProfile";
import ViewTherapist from "../pages/Customer/ViewTherapist/ViewTherapist";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import TherapistChedule from "../pages/Admin/Schedule/TherapistChedule";
import BookingSuccess from "../pages/Customer/Service/BookingSuccess";

const LoginC = lazy(() => import("../pages/Login/LoginC"));
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
          <Route path="/profile" element={<PrivateRoute children={<Profile />} allowedRoles={[UserRole.CUSTOMER]} />} />
          <Route path="/services" element={<Service />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/booking-success" element={<BookingSuccess/>}></Route>
          <Route path="/therapists" element={<ViewTherapist />} />
          <Route path="/schedule-booking" element={<PrivateRoute children={<ScheduleBooking />} allowedRoles={[UserRole.CUSTOMER]} />} />
          <Route path="/therapists" element={<ViewTherapist />} />
          <Route path="/therapists/:id" element={<TherapistProfile />} />
          <Route path="/rating" element={<PrivateRoute children={<Rating />} allowedRoles={[UserRole.CUSTOMER]} />} />
          <Route path="/news" element={<News />} />
        </Route>

        <Route path="/management" element={<PrivateRoute children={<AdminLayout />} allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.THERAPIST]} />}>
          <Route path="dashboard" element={<PrivateRoute children={<Dashboard />} allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]} />} />
          <Route path="employee" element={<Employee />} />
          <Route path="booking" element={<Booking />} />
          <Route path="service" element={<MaService />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="customer" element={<Customer />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="quiz" element={<ManageQuiz />} />
          <Route path="schedule" element={<PrivateRoute children={<TherapistChedule />} allowedRoles={[UserRole.THERAPIST, UserRole.MANAGER]} />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route
          path="loginc"
          element={
            <Suspense fallback={<Loading />}>
              <LoginC />
            </Suspense>
          }
        />
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