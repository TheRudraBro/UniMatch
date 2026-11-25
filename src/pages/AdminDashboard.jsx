import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Layers,
  ShieldAlert,
  PlusCircle,
  X,
  Save,
  Trash2,
  Search,
  RotateCcw,
} from "lucide-react";
import Section from "@/components/common/Section";
import Button from "@/components/common/Button";
import { FormField, Input, Select } from "@/components/common/Field";
import { isFirebaseConfigured } from "@/firebase/config";
import { useUniversityData } from "@/context/UniversityDataContext";
import { toast } from "sonner";

const EMPTY_FORM = {
  id: null,
  isNewUniversity: false,
  universityName: "",
  division: "Dhaka",
  city: "",
  website: "",
  department: "",
  totalCredits: "",
  perCreditFee: "",
  totalDegreeCost: "",
  requirements: "",
};

export default function AdminDashboard() {
  const {
    seedUniversities,
    programmes,
    admissionRequirements,
    customRecords,
    deletedUniNames,
    saveUniversityRecord,
    deleteUniversityRecord,
    deleteUniversityCompletely,
    restoreDeletedUniversities,
  } = useUniversityData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("Add");
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);

  const combinedRows = useMemo(() => {
    const rows = programmes.map((p) => {
      const uni = seedUniversities.find((u) => u.name === p.university);
      const req = admissionRequirements.find(
        (r) =>
          r.university === p.university &&
          (r.applicableProgramme === p.programme ||
            /general|all ug/i.test(r.applicableProgramme || "")),
      );
      return {
        id: p.adminRecordId || `prog-${p.id}`,
        adminRecordId: p.adminRecordId || null,
        universityId: uni?.id || "",
        universityName: p.university,
        division: uni?.division || "Dhaka",
        city: uni?.city || "",
        website: uni?.website || "",
        department: p.programme,
        totalCredits: p.totalCredits || "",
        perCreditFee: p.perCreditFee || "",
        totalDegreeCost: p.totalDegreeCost || "",
        requirements: req?.generalEligibility || uni?.ugcCaution || "",
        isCustom: Boolean(p.adminRecordId),
      };
    });

    if (!searchQuery.trim()) return rows.slice(0, 60);
    const q = searchQuery.toLowerCase();
    return rows.filter(
      (r) =>
        r.universityName.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.division.toLowerCase().includes(q),
    );
  }, [
    programmes,
    seedUniversities,
    admissionRequirements,
    customRecords,
    searchQuery,
  ]);

  const stats = [
    {
      label: "Total Universities",
      value: String(seedUniversities.length),
      icon: Database,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Programs",
      value: String(programmes.length),
      icon: Layers,
      color: "text-brand-500",
      bg: "bg-brand-500/10",
    },
    {
      label: "Cloud Sync",
      value: isFirebaseConfigured ? "Active" : "Local",
      icon: ShieldAlert,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const handleOpenAdd = () => {
    setModalType("Add");
    setFormState({ ...EMPTY_FORM, isNewUniversity: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalType("Edit");
    setFormState({
      id: item.adminRecordId || null,
      isNewUniversity: false,
      universityName: item.universityName || "",
      division: item.division || "Dhaka",
      city: item.city || "",
      website: item.website || "",
      department: item.department || "",
      totalCredits: item.totalCredits || "",
      perCreditFee: item.perCreditFee || "",
      totalDegreeCost: item.totalDegreeCost || "",
      requirements: item.requirements || "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteCustom = async (item) => {
    if (!item.adminRecordId) return;
    try {
      await deleteUniversityRecord(item.adminRecordId);
      toast.success("Custom record removed.");
    } catch (err) {
      toast.error(err?.message || "Failed to delete record.");
    }
  };

  const handleDeleteUniversity = async (uniName) => {
    const confirmed = window.confirm(
      `"${uniName}" ইউনিভার্সিটি এবং এর সব প্রোগ্রাম মেইন লিস্ট থেকে ডিলিট করতে চাচ্ছেন?`,
    );
    if (!confirmed) return;

    try {
      await deleteUniversityCompletely(uniName);
      toast.success(`${uniName} removed from main university list.`);
    } catch (err) {
      toast.error(err?.message || "Failed to delete university.");
    }
  };

  const handleRestoreDeleted = () => {
    restoreDeletedUniversities();
    toast.success("All deleted universities restored.");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveUniversityRecord(formState, formState.id);
      toast.success(
        modalType === "Add"
          ? "Added and synced with main directory!"
          : "Updated and synced with main directory!",
      );
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.message || "Failed to save record.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-bold text-content">Admin Portal</h1>
          <p className="text-content-muted">
            Edit existing university programs, delete universities, or add new
            universities & costs directly into the main directory.
          </p>
        </div>

        {deletedUniNames.length > 0 && (
          <Button onClick={handleRestoreDeleted} variant="secondary" size="sm">
            <RotateCcw className="w-4 h-4" /> Restore Deleted (
            {deletedUniNames.length})
          </Button>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="card-base p-6 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-content-muted">{stat.label}</p>
              <h3 className="text-2xl font-bold text-content">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="card-base p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-content">
              University & Program Records
            </h2>
            <p className="text-xs text-content-muted mt-0.5">
              Showing {combinedRows.length} matching entries. Search any
              university or department to edit or delete.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-content-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search university or dept..."
                className="h-9 pl-9 pr-3 rounded-xl border border-line bg-card text-sm text-content focus:outline-none focus:border-brand-500"
              />
            </div>
            <Button onClick={handleOpenAdd} size="sm">
              <PlusCircle className="w-4 h-4" /> Add New
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-content-muted whitespace-nowrap">
            <thead className="text-content border-b border-line uppercase bg-card-muted/50">
              <tr>
                <th className="px-4 py-3">University Name</th>
                <th className="px-4 py-3">Division</th>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Total Cost</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {combinedRows.map((item, idx) => (
                <tr
                  key={`${item.universityName}-${item.department}-${idx}`}
                  className="border-b border-line hover:bg-card-muted/20"
                >
                  <td className="px-4 py-4 font-medium text-content">
                    {item.universityName}
                  </td>
                  <td className="px-4 py-4">{item.division}</td>
                  <td className="px-4 py-4">{item.department}</td>
                  <td className="px-4 py-4 font-semibold text-brand-600 dark:text-brand-400">
                    {item.totalDegreeCost || "—"}
                  </td>
                  <td className="px-4 py-4 text-right space-x-1">
                    <Button
                      onClick={() => handleOpenEdit(item)}
                      variant="ghost"
                      size="sm"
                      className="text-brand-600"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() =>
                        handleDeleteUniversity(item.universityName)
                      }
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      title="Delete entire university"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Uni
                    </Button>
                    {item.isCustom && (
                      <Button
                        onClick={() => handleDeleteCustom(item)}
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:text-amber-700"
                        title="Delete custom record only"
                      >
                        Remove Row
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-base w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface p-6 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 p-2 rounded-lg hover:bg-card-muted text-content-muted"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-content mb-2">
                {modalType} University / Program Record
              </h2>
              <p className="text-sm text-content-muted mb-6">
                Changes are saved and reflected in Find Results, University
                Details, and Compare.
              </p>

              <form
                onSubmit={handleSave}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <FormField label="University Name" className="md:col-span-2">
                  <Input
                    type="text"
                    placeholder="e.g. BRAC University or New University Name"
                    value={formState.universityName}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        universityName: e.target.value,
                      })
                    }
                    required
                  />
                </FormField>

                <FormField label="Division">
                  <Select
                    value={formState.division}
                    onChange={(e) =>
                      setFormState({ ...formState, division: e.target.value })
                    }
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </Select>
                </FormField>

                <FormField label="City / District">
                  <Input
                    type="text"
                    placeholder="e.g. Dhaka"
                    value={formState.city}
                    onChange={(e) =>
                      setFormState({ ...formState, city: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Program / Department">
                  <Input
                    type="text"
                    placeholder="e.g. BSc CSE"
                    value={formState.department}
                    onChange={(e) =>
                      setFormState({ ...formState, department: e.target.value })
                    }
                    required
                  />
                </FormField>

                <FormField label="Official Website URL">
                  <Input
                    type="text"
                    placeholder="https://example.edu.bd"
                    value={formState.website}
                    onChange={(e) =>
                      setFormState({ ...formState, website: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Total Credits">
                  <Input
                    type="text"
                    placeholder="136"
                    value={formState.totalCredits}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        totalCredits: e.target.value,
                      })
                    }
                  />
                </FormField>

                <FormField label="Cost Per Credit (BDT)">
                  <Input
                    type="text"
                    placeholder="৳ 6,500"
                    value={formState.perCreditFee}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        perCreditFee: e.target.value,
                      })
                    }
                  />
                </FormField>

                <FormField
                  label="Total Degree Cost (BDT)"
                  className="md:col-span-2"
                >
                  <Input
                    type="text"
                    placeholder="৳ 1,003,400"
                    value={formState.totalDegreeCost}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        totalDegreeCost: e.target.value,
                      })
                    }
                  />
                </FormField>

                <FormField
                  label="Admission Requirements / Notes"
                  className="md:col-span-2"
                >
                  <textarea
                    rows="3"
                    placeholder="SSC and HSC GPA & subject requirements..."
                    value={formState.requirements}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        requirements: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-content focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 outline-none resize-none"
                  />
                </FormField>

                <div className="md:col-span-2 flex items-center justify-between gap-3 mt-4 border-t border-line pt-5">
                  <label className="inline-flex items-center gap-2 text-xs text-content-muted">
                    <input
                      type="checkbox"
                      checked={Boolean(formState.isNewUniversity)}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          isNewUniversity: e.target.checked,
                        })
                      }
                    />
                    Create as new university if not in directory
                  </label>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      variant="secondary"
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                      <Save className="w-4 h-4" />{" "}
                      {saving ? "Saving..." : "Save Record"}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
