import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function BookmarkButton({
  uniId,
  uniName,
  className = "absolute top-4 right-4",
}) {
  const { toggleBookmarkUni } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSaved = () => {
      const saved = JSON.parse(
        localStorage.getItem("unimatch_saved_unis") || "[]",
      );
      setIsSaved(saved.includes(uniId));
    };

    checkSaved();
    window.addEventListener("unimatch_bookmark_updated", checkSaved);
    return () =>
      window.removeEventListener("unimatch_bookmark_updated", checkSaved);
  }, [uniId]);

  const toggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const nowSaved = await toggleBookmarkUni(uniId);
      setIsSaved(nowSaved);
      if (nowSaved) {
        toast.success(`${uniName} saved to your dashboard!`);
      } else {
        toast.error(`${uniName} removed from saved list.`);
      }
    } catch {
      toast.error("Could not sync bookmark right now.");
    }
  };

  return (
    <button
      type="button"
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
