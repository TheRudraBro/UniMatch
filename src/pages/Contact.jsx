import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import { FormField, Input } from "@/components/common/Field";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Section className="min-h-screen">
      <SectionHeading
        eyebrow="Support"
        title="Contact Us"
        subtitle="Have a question about university data, admission requirements, or feedback? Reach out to our team."
      />

      <div className="mt-12 grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="space-y-4">
          <div className="card-base p-6 flex items-start gap-4">
            <span className="p-3 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-content">Email Us</h3>
              <p className="text-sm text-content-muted mt-1">
                support@unimatch.com.bd
              </p>
            </div>
          </div>

          <div className="card-base p-6 flex items-start gap-4">
            <span className="p-3 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-content">Location</h3>
              <p className="text-sm text-content-muted mt-1">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div className="card-base p-6 flex items-start gap-4">
            <span className="p-3 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <Phone className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-content">Support Hours</h3>
              <p className="text-sm text-content-muted mt-1">
                Sat – Thu, 10:00 AM – 8:00 PM
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 card-base p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Your Name">
              <Input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormField>
            <FormField label="Email Address">
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </FormField>
          </div>

          <FormField label="Subject">
            <Input
              type="text"
              required
              placeholder="e.g. Fee structure correction / Partnership"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </FormField>

          <FormField label="Message">
            <textarea
              rows={5}
              required
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-content focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 outline-none transition-all"
            />
          </FormField>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            <Send className="w-4 h-4 mr-1" /> Send Message
          </Button>
        </form>
      </div>
    </Section>
  );
}
