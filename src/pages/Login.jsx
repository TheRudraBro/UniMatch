// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import Section from "@/components/common/Section";
import { FormField, Input } from "@/components/common/Field";
import Button from "@/components/common/Button";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("unimatch_role");
    if (userRole === "admin") navigate("/admin", { replace: true });
    else if (userRole === "user") navigate("/dashboard", { replace: true });
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@unimatch.com" && password === "admin123") {
      localStorage.setItem("unimatch_role", "admin");
      toast.success("Welcome back, Admin!");
      navigate("/admin", { replace: true });
    } else if (email && password.length >= 6) {
      localStorage.setItem("unimatch_role", "user");
      toast.success("Logged in successfully! (Demo)");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error("Invalid credentials. (Hint: password must be 6+ chars)");
    }
  };

  return (
    <Section className="flex min-h-[70vh] items-center justify-center">
      {/* mx-auto যোগ করা হয়েছে যাতে ডেস্কটপে কার্ড একদম সেন্টারে থাকে */}
      <div className="card-base w-full max-w-md p-8 mx-auto">
        <h1 className="text-2xl font-bold text-content text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <FormField label="Email address" htmlFor="email">
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Password" htmlFor="password">
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormField>

          <Button type="submit" className="w-full mt-2" size="lg">
            Log In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-content-muted">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-brand-600 dark:text-brand-300 hover:underline"
            >
              Sign up
            </Link>
          </p>
          <div className="mt-4 p-3 bg-brand-500/10 rounded-lg text-xs text-brand-600 dark:text-brand-300 text-left">
            <strong>Demo Hints:</strong>
            <ul className="list-disc list-inside mt-1">
              <li>Admin: admin@unimatch.com / admin123</li>
              <li>User: Any email / any 6+ char password</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
