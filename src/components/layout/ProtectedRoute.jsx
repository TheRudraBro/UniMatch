import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRole }) {
  const userRole = localStorage.getItem('unimatch_role');

  if (!userRole) {
    // লগইন করা না থাকলে লগইন পেজে পাঠাবে
    return <Navigate to="/login" replace />;
  }

  // যদি নির্দিষ্ট রোলের পারমিশন লাগে (যেমন শুধু এডমিন)
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}