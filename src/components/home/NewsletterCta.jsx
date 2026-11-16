import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import { Input } from '@/components/common/Field';

export function NewsletterCta() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = ({ email }) => {
    // Demo only — no backend. In demo mode we just acknowledge.
    toast.success('Thanks! (Demo) — newsletter sign-up isn’t wired to a backend yet.');
    reset();
  };

  return (
    <section className="container-px pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white sm:p-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-accent-500/30 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Find your perfect university today.
            </h2>
            <p className="mt-3 max-w-md text-white/80">
              Create a free account to save universities, compare options and track
              your admission preparation — or subscribe for updates.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/signup" variant="secondary" size="lg" className="!text-content">
                Create free account <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/find" variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
                Find My University
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <label className="mb-2 block text-sm font-medium text-white/90">
              Subscribe to updates
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-content-muted" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 pl-11 !text-content"
                  aria-invalid={!!errors.email}
                  {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
                />
              </div>
              <Button type="submit" size="lg" variant="secondary" className="!text-content">
                Subscribe
              </Button>
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-white/90">Enter a valid email address.</p>
            )}
            <p className="mt-2 text-xs text-white/70">
              Demo mode — no emails are actually sent or stored.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewsletterCta;
