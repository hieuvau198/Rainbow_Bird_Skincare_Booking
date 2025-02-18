import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRole from "../../enums/userRole";
import Loading from "../components/Loading";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import UserLayout from "../layouts/UserLayout/UserLayout";
import Profile from "../pages/Customer/Profile/Profile";
import Quiz from "../pages/Customer/Quiz/Quiz";
import Service from "../pages/Customer/Service/Service";
import ServiceDetail from "../pages/Customer/Service/ServiceDetail";
import ViewTherapist from "../pages/Customer/ViewTherapist/ViewTherapist";
import TherapistProfile from "../pages/Customer/ViewTherapist/TherapistProfile";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";

const News = lazy(() => import("../layouts/AdminLayout"));
const AboutUs = lazy(() => import("../pages/Customer/BlogsAndNews/News"));
const BookingSuccess = lazy(() => import("../pages/Customer/Service/partials/BookingSuccess"));
const QuizDetail = lazy(() => import("../pages/Customer/Quiz/partials/QuizDetail"));
const Rating = lazy(() => import("../pages/Customer/Rating/Rating"));
const ScheduleBooking = lazy(() => import("../pages/Customer/ScheduleBooking/ScheduleBooking"));

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard/Dashboard"));
const Employee = lazy(() => import("../pages/Admin/Employee/Employee"));
const Booking = lazy(() => import("../pages/Admin/Booking/Booking"));
const MaService = lazy(() => import("../pages/Admin/Service/Service"));
const Feedback = lazy(() => import("../pages/Admin/Feedback/Feedback"));
const Customer = lazy(() => import("../pages/Admin/Customer/Customer"));
const AdminProfile = lazy(() => import("../pages/Admin/Profile/Profile"));
const ManageQuiz = lazy(() => import("../pages/Admin/Quiz/ManageQuiz"));
const TherapistChedule = lazy(() => import("../pages/Admin/Schedule/TherapistChedule"));

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
          <Route path="/about" element={
            <Suspense fallback={<Loading />}>
              <AboutUs />
            </Suspense>
          } />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:id" element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute allowedRoles={[UserRole.CUSTOMER]}>
                <QuizDetail />
              </PrivateRoute>
            </Suspense>
          } />
          <Route path="/booking-success" element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute allowedRoles={[UserRole.CUSTOMER]}>
                <BookingSuccess />
              </PrivateRoute>
            </Suspense>
          } />
          <Route path="/profile" element={
            <PrivateRoute allowedRoles={[UserRole.CUSTOMER]}>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/services" element={<Service />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/therapists" element={<ViewTherapist />} />
          <Route path="/schedule-booking" element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute allowedRoles={[UserRole.CUSTOMER]}>
                <ScheduleBooking />
              </PrivateRoute>
            </Suspense>
          } />
          <Route path="/therapists/:id" element={<TherapistProfile />} />
          <Route path="/rating" element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute allowedRoles={[UserRole.CUSTOMER]}>
                <Rating />
              </PrivateRoute>
            </Suspense>
          } />
          <Route path="/news" element={
            <Suspense fallback={<Loading />}>
              <News />
            </Suspense>
          } />
        </Route>

        {/* Admin Routes */}
        <Route path="/management" element={
          <PrivateRoute allowedRoles={[
            UserRole.ADMIN,
            UserRole.MANAGER,
            UserRole.STAFF,
            UserRole.THERAPIST
          ]}>
            <Suspense fallback={<Loading />}>
              <AdminLayout />
            </Suspense>
          </PrivateRoute>
        }>
          <Route path="dashboard" element={
            <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            </PrivateRoute>
          } />
          <Route path="employee" element={
            <Suspense fallback={<Loading />}>
              <Employee />
            </Suspense>
          } />
          <Route path="booking" element={
            <Suspense fallback={<Loading />}>
              <Booking />
            </Suspense>
          } />
          <Route path="service" element={
            <Suspense fallback={<Loading />}>
              <MaService />
            </Suspense>
          } />
          <Route path="feedback" element={
            <Suspense fallback={<Loading />}>
              <Feedback />
            </Suspense>
          } />
          <Route path="customer" element={
            <Suspense fallback={<Loading />}>
              <Customer />
            </Suspense>
          } />
          <Route path="profile" element={
            <Suspense fallback={<Loading />}>
              <AdminProfile />
            </Suspense>
          } />
          <Route path="quiz" element={
            <Suspense fallback={<Loading />}>
              <ManageQuiz />
            </Suspense>
          } />
          <Route path="schedule" element={
            <PrivateRoute allowedRoles={[UserRole.THERAPIST, UserRole.MANAGER]}>
              <Suspense fallback={<Loading />}>
                <TherapistChedule />
              </Suspense>
            </PrivateRoute>
          } />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="loginc" element={
          <Suspense fallback={<Loading />}>
            <LoginC />
          </Suspense>
        } />
        <Route path="sign-up" element={
          <Suspense fallback={<Loading />}>
            <SignUp />
          </Suspense>
        } />
        <Route path="forgot-password" element={
          <Suspense fallback={<Loading />}>
            <ForgotPassword />
          </Suspense>
        } />

        <Route path="*" element={
          <Suspense fallback={<Loading />}>
            <PageNotFound />
          </Suspense>
        } />
        <Route path="/500" element={
          <Suspense fallback={<Loading />}>
            <ServerError />
          </Suspense>
        } />
        <Route path="/maintenance" element={
          <Suspense fallback={<Loading />}>
            <Maintenance />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}
