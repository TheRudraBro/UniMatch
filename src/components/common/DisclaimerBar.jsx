import { Info } from 'lucide-react';
import { disclaimer } from '@/data/content';

export function DisclaimerBar() {
  return (
    <div className="container-px pb-4">
      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{disclaimer}</p>
      </div>
    </div>
  );
}

export default DisclaimerBar;
