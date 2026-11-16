// src/pages/UserDashboard.jsx
import Section from '@/components/common/Section';
import { Bookmark, Settings, GraduationCap } from 'lucide-react';
import Button from '@/components/common/Button';

export default function UserDashboard() {
  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-bold text-content">Student Dashboard</h1>
          <p className="text-content-muted">Welcome back, Demo User! (Phase 5 Preview)</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm"><Settings className="w-4 h-4" /> Profile</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-brand-500/10 rounded-xl text-brand-600 dark:text-brand-300">
              <Bookmark className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-content">Saved Universities</h2>
          </div>
          <p className="text-sm text-content-muted mb-4">You have 0 saved universities.</p>
          <Button to="/find" className="w-full" variant="outline">Browse Universities</Button>
        </div>

        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-accent-500/10 rounded-xl text-accent-600 dark:text-accent-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-content">Admission Prep</h2>
          </div>
          <p className="text-sm text-content-muted mb-4">No recent mock test records found.</p>
          <Button to="/preparation" className="w-full" variant="outline">Start Practicing</Button>
        </div>
      </div>
    </Section>
  );
}