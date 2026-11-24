import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Section from "@/components/common/Section";
import { FormField, Input } from "@/components/common/Field";
import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { role, loginWithEmail, loginWithGoogle, isFirebaseConfigured } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (role === "admin") navigate("/admin", { replace: true });
    else if (role === "user") navigate("/dashboard", { replace: true });
  }, [role, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await loginWithEmail(email, password);
      toast.success(
        res.role === "admin"
          ? "Welcome back, Admin!"
          : "Logged in successfully!",
      );
      navigate(res.role === "admin" ? "/admin" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      toast.error(err?.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    try {
      const res = await loginWithGoogle();
      toast.success("Signed in with Google!");
      navigate(res.role === "admin" ? "/admin" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section className="flex min-h-[70vh] items-center justify-center">
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

          <Button
            type="submit"
            className="w-full mt-2"
            size="lg"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Log In"}
          </Button>
        </form>

        {isFirebaseConfigured && (
          <Button
            type="button"
            variant="outline"
            className="w-full mt-3"
            size="lg"
            onClick={handleGoogleLogin}
            disabled={submitting}
          >
            Continue with Google
          </Button>
        )}

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
          {!isFirebaseConfigured && (
            <div className="mt-4 p-3 bg-brand-500/10 rounded-lg text-xs text-brand-600 dark:text-brand-300 text-left">
              <strong>Local Fallback Active:</strong> Add Firebase keys in{" "}
              <code>.env</code> for live cloud auth.
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
