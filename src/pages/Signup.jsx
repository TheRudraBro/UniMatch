import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Section from "@/components/common/Section";
import { FormField, Input } from "@/components/common/Field";
import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signupWithEmail } = useAuth();
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
