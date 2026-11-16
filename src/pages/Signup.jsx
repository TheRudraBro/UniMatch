// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Section from "@/components/common/Section";
import { FormField, Input } from "@/components/common/Field";
import Button from "@/components/common/Button";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    toast.success("Account created successfully! (Demo)");
    navigate("/dashboard");
  };

  return (
    <Section className="flex min-h-[80vh] items-center justify-center">
      {/* mx-auto যোগ করা হয়েছে যাতে ডেস্কটপে কার্ড একদম সেন্টারে থাকে */}
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
              placeholder="John Doe"
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

          <Button type="submit" className="w-full mt-4" size="lg">
            Sign Up
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
