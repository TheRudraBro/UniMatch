import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CalendarDays, ArrowRight, BadgeCheck, Bookmark } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import { InitialsBadge } from './Logo';
import { toast } from 'sonner';

export function UniversityCard({ uni }) {
  const [isSaved, setIsSaved] = useState(false);

  // কম্পোনেন্ট লোড হলে চেক করবে এই ইউনিভার্সিটি আগে থেকে সেভ করা আছে কি না
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('unimatch_saved_unis') || '[]');
    setIsSaved(saved.includes(uni.id));
  }, [uni.id]);

  // বুকমার্ক বাটনে ক্লিক করলে সেভ বা রিমুভ করার ফাংশন
  const toggleSave = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    const saved = JSON.parse(localStorage.getItem('unimatch_saved_unis') || '[]');
    
    if (isSaved) {
      const newSaved = saved.filter(id => id !== uni.id);
      localStorage.setItem('unimatch_saved_unis', JSON.stringify(newSaved));
      setIsSaved(false);
      toast.error(`${uni.shortName || uni.name} removed from saved list.`);
    } else {
      saved.push(uni.id);
      localStorage.setItem('unimatch_saved_unis', JSON.stringify(saved));
      setIsSaved(true);
      toast.success(`${uni.shortName || uni.name} saved to your dashboard!`);
    }
    
    // ড্যাশবোর্ডকে রিয়েল-টাইম রিফ্রেশ করার জন্য একটি কাস্টম ইভেন্ট ফায়ার করা হলো
    window.dispatchEvent(new Event('unimatch_bookmark_updated'));
  };

  return (
    <Card hover className="flex h-full flex-col relative overflow-visible">
      {/* Bookmark Icon Button */}
      <button 
        onClick={toggleSave}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/80 backdrop-blur border border-line text-content-muted hover:text-brand-600 hover:border-brand-500 hover:bg-brand-500/10 transition-all shadow-sm"
        title={isSaved ? "Remove from saved" : "Save university"}
      >
        <Bookmark className={`w-4 h-4 transition-colors ${isSaved ? 'fill-brand-600 text-brand-600' : ''}`} />
      </button>

      <div className="flex items-start gap-3">
        {uni.logo ? (
          <img
            src={uni.logo}
            alt={`${uni.shortName} logo`}
            className="h-12 w-12 rounded-xl object-contain"
          />
        ) : (
          <InitialsBadge text={uni.shortName || uni.name} className="h-12 w-12 text-sm" />
        )}
        <div className="min-w-0 pr-10"> {/* pr-10 দেওয়া হয়েছে যাতে টেক্সট বুকমার্ক আইকনের নিচে না ঢুকে যায় */}
          <h3 className="truncate font-semibold text-content">{uni.shortName || uni.name}</h3>
          <p className="truncate text-xs text-content-muted">{uni.name}</p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-content-muted">{uni.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1 text-content-muted">
          <MapPin className="h-3.5 w-3.5" /> {uni.division || uni.city}
        </span>
        {typeof uni.established === 'number' && (
          <span className="inline-flex items-center gap-1 text-content-muted">
            <CalendarDays className="h-3.5 w-3.5" /> Est. {uni.established}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge tone="info" icon={BadgeCheck}>
          {uni.ugcStatus?.includes('UGC') ? 'UGC-approved' : 'Private'}
        </Badge>
        <Badge tone="warning">Fees: verify</Badge>
      </div>

      <div className="mt-auto pt-4">
        <Link
          to={`/university/${uni.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
        >
          View details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

export default UniversityCard;