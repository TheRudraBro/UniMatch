import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

export default function BookmarkButton({
  uniId,
  uniName,
  className = "absolute top-4 right-4",
}) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSaved = () => {
      const saved = JSON.parse(
        localStorage.getItem("unimatch_saved_unis") || "[]",
      );
      setIsSaved(saved.includes(uniId));
    };

    checkSaved();
    // সব পেজে বুকমার্ক সিঙ্ক করার জন্য কাস্টম ইভেন্ট লিসেনার
    window.addEventListener("unimatch_bookmark_updated", checkSaved);
    return () =>
      window.removeEventListener("unimatch_bookmark_updated", checkSaved);
  }, [uniId]);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let saved = JSON.parse(localStorage.getItem("unimatch_saved_unis") || "[]");

    if (isSaved) {
      saved = saved.filter((id) => id !== uniId);
      toast.error(`${uniName} removed from saved list.`);
    } else {
      if (!saved.includes(uniId)) saved.push(uniId);
      toast.success(`${uniName} saved to your dashboard!`);
    }

    localStorage.setItem("unimatch_saved_unis", JSON.stringify(saved));
    setIsSaved(!isSaved);
    // অন্যান্য পেজকে (যেমন ড্যাশবোর্ড) আপডেট হওয়ার সিগন্যাল পাঠানো
    window.dispatchEvent(new Event("unimatch_bookmark_updated"));
  };

  return (
    <button
      onClick={toggleSave}
      className={`z-10 p-2 rounded-full bg-surface/80 backdrop-blur border border-line text-content-muted hover:text-brand-600 hover:border-brand-500 hover:bg-brand-500/10 transition-all shadow-sm ${className}`}
      title={isSaved ? "Remove from saved" : "Save university"}
    >
      <Bookmark
        className={`w-4 h-4 transition-colors ${isSaved ? "fill-brand-600 text-brand-600" : ""}`}
      />
    </button>
  );
}
