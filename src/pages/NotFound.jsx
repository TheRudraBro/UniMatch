import { Compass, Home } from 'lucide-react';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <section className="container-px flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="gradient-text text-7xl font-black sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-bold text-content sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-content-muted">
        The page you’re looking for doesn’t exist or has moved. Let’s get you back
        on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" size="lg">
          <Home className="h-4 w-4" /> Home
        </Button>
        <Button to="/find" variant="secondary" size="lg">
          <Compass className="h-4 w-4" /> Find Universities
        </Button>
      </div>
    </section>
  );
}
