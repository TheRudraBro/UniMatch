import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Home from "@/pages/Home/Home";
import FindResults from "@/pages/FindResults";
import UniversityDetails from "@/pages/UniversityDetails";
import ComingSoon from "@/pages/ComingSoon";
import NotFound from "@/pages/NotFound";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Compare from "@/pages/Compare";
import International from "@/pages/International";
import Preparation from "@/pages/Preparation";
import About from "@/pages/About"; // <-- About পেজ ইমপোর্ট করা হলো

const stub = (props) => <ComingSoon {...props} />;

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="find" element={<FindResults />} />
        <Route path="university/:id" element={<UniversityDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="compare" element={<Compare />} />
        <Route path="international" element={<International />} />
        <Route path="preparation" element={<Preparation />} />

        {/* <-- About Route আপডেট করা হলো --> */}
        <Route path="about" element={<About />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        {/* Stubs */}
        <Route
          path="department/:id"
          element={stub({ title: "Department Details", phase: "Phase 3" })}
        />
        <Route path="contact" element={stub({ title: "Contact Us" })} />
        <Route path="faq" element={stub({ title: "FAQ" })} />
        <Route path="privacy" element={stub({ title: "Privacy Policy" })} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
