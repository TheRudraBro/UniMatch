import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Section from "@/components/common/Section";
import { FormField, Input } from "@/components/common/Field";
import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
      />
    </svg>
  );
}

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
          <>
            <div className="relative my-5 flex items-center justify-center">
              <div className="border-t border-line w-full" />
              <span className="bg-card px-3 text-xs uppercase tracking-wider text-content-muted">
                or
              </span>
              <div className="border-t border-line w-full" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-[#dadce0] dark:border-line bg-white dark:bg-[#131314] hover:bg-[#f8faff] dark:hover:bg-[#1f2023] text-[#3c4043] dark:text-[#e3e3e3] font-medium text-sm h-12 px-5 shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>
          </>
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
