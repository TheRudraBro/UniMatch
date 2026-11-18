import { useState, useEffect } from "react";
import Section from "@/components/common/Section";
import {
  Bookmark,
  Settings,
  GraduationCap,
  Award,
  X,
  Trash2,
} from "lucide-react";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { FormField, Input, Select } from "@/components/common/Field";
import UniversityCard from "@/components/common/UniversityCard";
import { seedUniversities } from "@/data/seedUniversities";
import { seedInternationalUniversities } from "@/data/seedInternational";
import { toast } from "sonner";

export default function UserDashboard() {
  const [savedUnis, setSavedUnis] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Student User",
    sscGpa: "5.00",
    hscGpa: "4.83",
    targetSubject: "CSE / Engineering",
  });

  const loadDashboardData = () => {
    // Saved Universities
    const savedIds = JSON.parse(
      localStorage.getItem("unimatch_saved_unis") || "[]",
    );
    const allUniversities = [
      ...seedUniversities,
      ...seedInternationalUniversities,
    ];
    setSavedUnis(allUniversities.filter((uni) => savedIds.includes(uni.id)));

    // Test History
    const history = JSON.parse(
      localStorage.getItem("unimatch_test_history") || "[]",
    );
    setTestHistory(history);

    // Profile
    const savedProfile = localStorage.getItem("unimatch_profile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  };

  useEffect(() => {
    loadDashboardData();
    window.addEventListener("unimatch_bookmark_updated", loadDashboardData);
    return () =>
      window.removeEventListener(
        "unimatch_bookmark_updated",
        loadDashboardData,
      );
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("unimatch_profile", JSON.stringify(profile));
    setIsProfileOpen(false);
    toast.success("Profile updated successfully!");
  };

  const clearHistory = () => {
    localStorage.removeItem("unimatch_test_history");
    setTestHistory([]);
    toast.info("Test history cleared.");
  };

  return (
    <Section className="min-h-screen">
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-bold text-content">
            Welcome, {profile.name}
          </h1>
          <p className="text-content-muted text-sm mt-1">
            SSC: <strong>{profile.sscGpa}</strong> • HSC:{" "}
            <strong>{profile.hscGpa}</strong> • Target:{" "}
            <strong>{profile.targetSubject}</strong>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsProfileOpen(true)}
        >
          <Settings className="w-4 h-4" /> Edit Profile
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card-base p-6 shadow-sm border-brand-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-brand-500/10 rounded-xl text-brand-600 dark:text-brand-300">
              <Bookmark className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-content">
              Saved Universities
            </h2>
          </div>
          <p className="text-sm text-content-muted mb-4">
            You have {savedUnis.length} shortlisted universities.
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
            <h2 className="text-lg font-semibold text-content">
              Admission Prep
            </h2>
          </div>
          <p className="text-sm text-content-muted mb-4">
            Tests taken: <strong>{testHistory.length}</strong>
          </p>
          <Button to="/preparation" className="w-full" variant="outline">
            Take Mock Test
          </Button>
        </div>

        <div className="card-base p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-content">Latest Score</h2>
          </div>
          <p className="text-sm text-content-muted mb-4">
            {testHistory.length > 0
              ? `${testHistory[0].score} / ${testHistory[0].total} in ${testHistory[0].category}`
              : "No mock test attempted yet."}
          </p>
          <Button to="/compare" className="w-full" variant="outline">
            Compare Programs
          </Button>
        </div>
      </div>

      {/* Recent Mock Test History */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-content flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-500" /> Recent Mock Test Scores
          </h2>
          {testHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs text-red-500 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear History
            </button>
          )}
        </div>

        {testHistory.length > 0 ? (
          <div className="card-base overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-muted border-b border-line text-content-muted uppercase text-xs">
                <tr>
                  <th className="px-6 py-3.5">Department / Category</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Score</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {testHistory.map((item) => {
                  const percent = Math.round((item.score / item.total) * 100);
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-muted/40 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-content">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 text-content-muted">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 font-bold text-brand-600 dark:text-brand-400">
                        {item.score} / {item.total} ({percent}%)
                      </td>
                      <td className="px-6 py-4">
                        <Badge tone={percent >= 60 ? "info" : "warning"}>
                          {percent >= 80
                            ? "Excellent"
                            : percent >= 60
                              ? "Passed"
                              : "Needs Practice"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card-base p-8 text-center border-dashed bg-surface-muted/30">
            <p className="text-sm text-content-muted mb-4">
              You haven't taken any mock tests yet. Start practicing to track
              your progress!
            </p>
            <Button to="/preparation" size="sm">
              Start a Mock Test
            </Button>
          </div>
        )}
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

      {/* Profile Edit Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="card-base w-full max-w-md p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface-muted text-content-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-content mb-1">
              Edit Student Profile
            </h3>
            <p className="text-xs text-content-muted mb-6">
              Update your academic details for quick reference.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <FormField label="Full Name">
                <Input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="SSC GPA">
                  <Input
                    type="number"
                    step="0.01"
                    max="5"
                    min="1"
                    value={profile.sscGpa}
                    onChange={(e) =>
                      setProfile({ ...profile, sscGpa: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="HSC GPA">
                  <Input
                    type="number"
                    step="0.01"
                    max="5"
                    min="1"
                    value={profile.hscGpa}
                    onChange={(e) =>
                      setProfile({ ...profile, hscGpa: e.target.value })
                    }
                  />
                </FormField>
              </div>

              <FormField label="Target Department">
                <Select
                  value={profile.targetSubject}
                  onChange={(e) =>
                    setProfile({ ...profile, targetSubject: e.target.value })
                  }
                >
                  <option value="CSE / Engineering">CSE / Engineering</option>
                  <option value="BBA / Economics">BBA / Economics</option>
                  <option value="Pharmacy / Biological">
                    Pharmacy / Biological
                  </option>
                  <option value="Law / English / Arts">
                    Law / English / Arts
                  </option>
                  <option value="Study Abroad">Study Abroad</option>
                </Select>
              </FormField>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Section>
  );
}
