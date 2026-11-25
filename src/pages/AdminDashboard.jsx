import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Database,
  ShieldAlert,
  PlusCircle,
  X,
  Save,
  Trash2,
} from "lucide-react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Section from "@/components/common/Section";
import Button from "@/components/common/Button";
import { FormField, Input, Select } from "@/components/common/Field";
import { db, isFirebaseConfigured } from "@/firebase/config";
import { seedUniversities } from "@/data/seedUniversities";
import { toast } from "sonner";

const EMPTY_FORM = {
  id: null,
  universityName: "",
  division: "Dhaka",
  department: "",
  totalCredits: "",
  perCreditFee: "",
  totalDegreeCost: "",
  requirements: "",
};

const INITIAL_RECORDS = [
  {
    id: "seed-1",
    universityName: "BRAC University",
    division: "Dhaka",
    department: "BSc CSE",
    totalCredits: "136",
    perCreditFee: "৳ 6,500",
    totalDegreeCost: "৳ 1,003,400",
    requirements: "SSC & HSC GPA requirements apply per circular.",
  },
  {
    id: "seed-2",
    universityName: "North South University",
    division: "Dhaka",
    department: "BBA",
    totalCredits: "120",
    perCreditFee: "৳ 6,500",
    totalDegreeCost: "৳ 850,000+",
    requirements: "Admission test & GPA criteria apply.",
  },
  {
    id: "seed-3",
    universityName: "Ahsanullah University of Science and Technology",
    division: "Dhaka",
    department: "BSc CSE",
    totalCredits: "160",
    perCreditFee: "Program-based",
    totalDegreeCost: "৳ 800,000+",
    requirements: "Science background with Math & Physics.",
  },
];

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("Add");
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [records, setRecords] = useState(INITIAL_RECORDS);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    const unsub = onSnapshot(collection(db, "university_records"), (snap) => {
      if (!snap.empty) {
        const cloudItems = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRecords(cloudItems);
      } else {
        setRecords([]);
      }
    });

    return () => unsub();
  }, []);

  const stats = [
    {
      label: "Seeded Universities",
      value: String(seedUniversities.length),
      icon: Database,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Managed Records",
      value: String(records.length),
      icon: Users,
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
    setFormState(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalType("Edit");
    setFormState({
      id: item.id,
      universityName: item.universityName || "",
      division: item.division || "Dhaka",
      department: item.department || "",
      totalCredits: item.totalCredits || "",
      perCreditFee: item.perCreditFee || "",
      totalDegreeCost: item.totalDegreeCost || "",
      requirements: item.requirements || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      if (isFirebaseConfigured && db && !String(item.id).startsWith("seed-")) {
        await deleteDoc(doc(db, "university_records", item.id));
      } else {
        setRecords((prev) => prev.filter((r) => r.id !== item.id));
      }
      toast.success("Record deleted.");
    } catch (err) {
      toast.error(err?.message || "Failed to delete record.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      universityName: formState.universityName.trim(),
      division: formState.division,
      department: formState.department.trim(),
      totalCredits: String(formState.totalCredits || ""),
      perCreditFee: String(formState.perCreditFee || ""),
      totalDegreeCost: String(formState.totalDegreeCost || ""),
      requirements: String(formState.requirements || ""),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (isFirebaseConfigured && db) {
        if (
          modalType === "Edit" &&
          formState.id &&
          !String(formState.id).startsWith("seed-")
        ) {
          await updateDoc(doc(db, "university_records", formState.id), {
            ...payload,
            updatedAt: serverTimestamp(),
          });
        } else {
          await addDoc(collection(db, "university_records"), {
            ...payload,
            createdAt: serverTimestamp(),
          });
        }
      } else if (modalType === "Edit" && formState.id) {
        setRecords((prev) =>
          prev.map((r) => (r.id === formState.id ? { ...r, ...payload } : r)),
        );
      } else {
        setRecords((prev) => [
          { id: `local-${Date.now()}`, ...payload },
          ...prev,
        ]);
      }

      toast.success(
        `Record ${modalType === "Add" ? "added" : "updated"} successfully!`,
      );
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.message || "Failed to save record.");
    }
  };

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-bold text-content">Admin Portal</h1>
          <p className="text-content-muted">
            Manage university program fees, credits, and admission notes.
          </p>
        </div>
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-content">
            University Program Records
          </h2>
          <Button onClick={handleOpenAdd} size="sm">
            <PlusCircle className="w-4 h-4" /> Add New
          </Button>
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
              {records.map((item) => (
                <tr
                  key={item.id}
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
                      onClick={() => handleDelete(item)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
                {modalType} University Record
              </h2>
              <p className="text-sm text-content-muted mb-6">
                Update tuition, credits, and admission requirements.
              </p>

              <form
                onSubmit={handleSave}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <FormField label="University Name" className="md:col-span-2">
                  <Input
                    type="text"
                    placeholder="e.g. BRAC University"
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
                  label="Admission Requirements (GPA / Subjects)"
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

                <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t border-line pt-5">
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    variant="secondary"
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="w-4 h-4" /> Save Record
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
