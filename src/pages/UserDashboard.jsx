import { useState, useEffect } from "react";
import Section from "@/components/common/Section";
import { Bookmark, Settings, GraduationCap } from "lucide-react";
import Button from "@/components/common/Button";
import UniversityCard from "@/components/common/UniversityCard";
import { seedUniversities } from "@/data/seedUniversities";

export default function UserDashboard() {
  const [savedUnis, setSavedUnis] = useState([]);

  // LocalStorage থেকে সেভ করা ডাটা লোড করার ফাংশন
  const loadSavedUniversities = () => {
    const savedIds = JSON.parse(
      localStorage.getItem("unimatch_saved_unis") || "[]",
    );
    // seedUniversities থেকে আইডি ম্যাচ করে ফুল ডাটা ফিল্টার করে আনা হচ্ছে
    const filtered = seedUniversities.filter((uni) =>
      savedIds.includes(uni.id),
    );
    setSavedUnis(filtered);
  };

  useEffect(() => {
    loadSavedUniversities();

    // অন্য কোনো পেজ থেকে বুকমার্ক করলে যেন ড্যাশবোর্ডে সাথে সাথে আপডেট হয়
    window.addEventListener("unimatch_bookmark_updated", loadSavedUniversities);
    return () =>
      window.removeEventListener(
        "unimatch_bookmark_updated",
        loadSavedUniversities,
      );
  }, []);

  return (
    <Section className="min-h-screen">
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-bold text-content">Student Dashboard</h1>
          <p className="text-content-muted">
            Welcome back! Manage your shortlists and preparations.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" /> Profile
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="card-base p-6 shadow-sm border-brand-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-brand-500/10 rounded-xl text-brand-600 dark:text-brand-300">
              <Bookmark className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-content">
              Saved Universities
            </h2>
          </div>
          <p className="text-sm text-content-muted mb-4">
            You have {savedUnis.length} saved universities.
          </p>
          <Button to="/find" className="w-full" variant="outline">
            Browse More
          </Button>
        </div>

        <div className="card-base p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-accent-500/10 rounded-xl text-accent-600 dark:text-accent-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-content">
              Admission Prep
            </h2>
          </div>
          <p className="text-sm text-content-muted mb-4">
            Practice mock tests and review questions.
          </p>
          <Button to="/preparation" className="w-full" variant="outline">
            Start Practicing
          </Button>
        </div>
      </div>

      {/* Saved Universities Section */}
      <div>
        <h2 className="text-2xl font-bold text-content mb-6 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-brand-500 fill-brand-500" /> Your
          Shortlist
        </h2>

        {savedUnis.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {savedUnis.map((uni) => (
              <div key={uni.id}>
                <UniversityCard uni={uni} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card-base p-12 text-center border-dashed shadow-none bg-surface-muted/30">
            <span className="grid w-16 h-16 place-items-center rounded-full bg-card mx-auto mb-4 border border-line">
              <Bookmark className="w-6 h-6 text-content-muted opacity-50" />
            </span>
            <h3 className="text-lg font-semibold text-content mb-2">
              No saved universities yet
            </h3>
            <p className="text-sm text-content-muted mb-6 max-w-sm mx-auto">
              Explore the directory and click the bookmark icon to save
              universities here for quick access.
            </p>
            <Button to="/find">Explore Directory</Button>
          </div>
        )}
      </div>
    </Section>
  );
}
