import { useState } from "react";
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

export default function Signup() {
  const navigate = useNavigate();
  const { signupWithEmail, loginWithGoogle, isFirebaseConfigured } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await signupWithEmail(formData);
      toast.success("Account created successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Could not create account.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
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
    <Section className="flex min-h-[80vh] items-center justify-center">
      <div className="card-base w-full max-w-md p-8 shadow-lift mx-auto">
        <h1 className="text-2xl font-bold text-content text-center mb-2">
          Create an Account
        </h1>
        <p className="text-center text-sm text-content-muted mb-6">
          Start your university journey today.
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <FormField label="Full Name" htmlFor="name">
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormField>

          <FormField label="Email address" htmlFor="email">
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormField>

          <FormField label="Password" htmlFor="password">
            <Input
              id="password"
              type="password"
              placeholder="6+ characters"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </FormField>

          <Button
            type="submit"
            className="w-full mt-4"
            size="lg"
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Sign Up"}
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
              onClick={handleGoogleSignup}
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-[#dadce0] dark:border-line bg-white dark:bg-[#131314] hover:bg-[#f8faff] dark:hover:bg-[#1f2023] text-[#3c4043] dark:text-[#e3e3e3] font-medium text-sm h-12 px-5 shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>
          </>
        )}

        <p className="mt-6 text-center text-sm text-content-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-brand-600 dark:text-brand-300 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </Section>
  );
}
