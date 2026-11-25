// src/context/UniversityDataContext.jsx
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/firebase/config";
import {
  universities as baseUniversities,
  programmes as baseProgrammes,
  admissionRequirements as baseRequirements,
} from "@/data/unimatchData";
import { universityWebsites } from "@/data/universityWebsites";

const UniversityDataContext = createContext(null);

const customShortNames = {
  "Ahsanullah University of Science and Technology": "AUST",
  "American International University-Bangladesh": "AIUB",
  "BRAC University": "BRACU",
  "North South University": "NSU",
  "East West University": "EWU",
  "Daffodil International University": "DIU",
  "Independent University, Bangladesh": "IUB",
};

const toSlugId = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const buildShortName = (name) => {
  if (customShortNames[name]) return customShortNames[name];
  return (
    name.match(/\(([^)]+)\)/)?.[1] ||
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 5)
      .toUpperCase()
  );
};

export function UniversityDataProvider({ children }) {
  const [customRecords, setCustomRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unimatch_admin_records") || "[]");
    } catch {
      return [];
    }
  });

  const [deletedUniNames, setDeletedUniNames] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unimatch_deleted_unis") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    const unsub = onSnapshot(
      collection(db, "university_records"),
      (snap) => {
        const cloudItems = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setCustomRecords(cloudItems);
        localStorage.setItem(
          "unimatch_admin_records",
          JSON.stringify(cloudItems),
        );
      },
      (err) => {
        console.warn(
          "Firestore university_records listener:",
          err?.message || err,
        );
      },
    );

    return () => unsub();
  }, []);

  const mergedData = useMemo(() => {
    const deletedSet = new Set(deletedUniNames);
    const progOverrides = new Map();
    const extraProgrammes = [];
    const extraUniversities = [];
    const reqOverrides = new Map();

    for (const rec of customRecords) {
      const uniName = (rec.universityName || "").trim();
      const deptName = (rec.department || "").trim();
      if (!uniName) continue;
      if (deletedSet.has(uniName.toLowerCase())) continue;

      const uniId = rec.universityId || toSlugId(uniName);
      const progId =
        rec.programmeId || `${uniId}-${toSlugId(deptName || "general")}`;

      if (rec.isNewUniversity) {
        const existsInBase = baseUniversities.some(
          (u) => u.name.toLowerCase() === uniName.toLowerCase(),
        );
        const existsInExtra = extraUniversities.some(
          (u) => u.name.toLowerCase() === uniName.toLowerCase(),
        );
        if (!existsInBase && !existsInExtra) {
          extraUniversities.push({
            id: uniId,
            name: uniName,
            division: rec.division || "Dhaka",
            district: rec.city || rec.division || "Dhaka",
            area: rec.address || rec.division || "Bangladesh",
            ugcCaution:
              rec.requirements ||
              "Added via Admin Portal. Verify current fees & UGC status.",
            programmeRows: 1,
          });
        }
      }

      if (deptName) {
        const progEntry = {
          id: progId,
          university: uniName,
          programme: deptName,
          totalCredits: rec.totalCredits || "N/A",
          totalSemesters: rec.totalSemesters || "N/A",
          perCreditFee: rec.perCreditFee || "N/A",
          tuitionCost: rec.tuitionCost || "N/A",
          otherFees: rec.otherFees || "N/A",
          firstAdmissionPayment: rec.firstAdmissionPayment || "N/A",
          totalDegreeCost: rec.totalDegreeCost || "Not published",
          adminRecordId: rec.id,
        };

        const matchesBaseProg = baseProgrammes.some(
          (p) =>
            p.id === progId ||
            (p.university.toLowerCase() === uniName.toLowerCase() &&
              p.programme.toLowerCase() === deptName.toLowerCase()),
        );

        if (matchesBaseProg) {
          progOverrides.set(progId, progEntry);
        } else {
          const idx = extraProgrammes.findIndex((p) => p.id === progId);
          if (idx >= 0) extraProgrammes[idx] = progEntry;
          else extraProgrammes.push(progEntry);
        }
      }

      if (rec.requirements) {
        reqOverrides.set(
          `${uniName.toLowerCase()}::${deptName.toLowerCase()}`,
          {
            id: `req-${rec.id}`,
            university: uniName,
            applicableProgramme: deptName || "General / All UG",
            sscGpa: rec.sscGpa || "",
            hscGpa: rec.hscGpa || "",
            combinedGpa: rec.combinedGpa || "",
            requiredSubjects: rec.requiredSubjects || "",
            generalEligibility: rec.requirements,
          },
        );
      }
    }

    const allUniversities = [...baseUniversities, ...extraUniversities].filter(
      (u) => !deletedSet.has(u.name.toLowerCase()),
    );

    const allProgrammes = [
      ...baseProgrammes.map((p) => progOverrides.get(p.id) || p),
      ...extraProgrammes,
    ].filter((p) => !deletedSet.has(p.university.toLowerCase()));

    const seedList = allUniversities.map((u) => {
      const uProgs = allProgrammes.filter((p) => p.university === u.name);
      const customUniRec = customRecords.find(
        (r) =>
          (r.universityName || "").toLowerCase() === u.name.toLowerCase() &&
          (r.website || r.division || r.city || r.requirements),
      );
      const website =
        (customUniRec?.website && customUniRec.website.trim()) ||
        universityWebsites[u.id] ||
        "";

      return {
        id: u.id,
        name: u.name,
        shortName: buildShortName(u.name),
        division: customUniRec?.division || u.division,
        city: customUniRec?.city || u.district,
        address: customUniRec?.address || u.area,
        website,
        sourceUrl: website,
        established: null,
        featured: true,
        description: `${u.name} — ${customUniRec?.city || u.district}, Bangladesh. ${uProgs.length} programme fee records available.`,
        departments: uProgs.map((p) => p.programme),
        ugcStatus: "Check UGC / operation status",
        type: "Private",
        status: "published",
        rating: null,
        totalTuitionRange: "See programme-wise fees",
        lastVerifiedAt: "2026-11-25",
        ugcCaution: customUniRec?.requirements || u.ugcCaution,
      };
    });

    const allRequirements = [
      ...baseRequirements,
      ...Array.from(reqOverrides.values()),
    ].filter((r) => !deletedSet.has(String(r.university || "").toLowerCase()));

    return {
      universities: allUniversities,
      programmes: allProgrammes,
      seedUniversities: seedList,
      admissionRequirements: allRequirements,
    };
  }, [customRecords, deletedUniNames]);

  const saveUniversityRecord = async (payload, existingId = null) => {
    const cleanUniName = (payload.universityName || "").trim();
    const cleanDeptName = (payload.department || "").trim();

    if (cleanUniName && deletedUniNames.includes(cleanUniName.toLowerCase())) {
      const nextDeleted = deletedUniNames.filter(
        (n) => n !== cleanUniName.toLowerCase(),
      );
      setDeletedUniNames(nextDeleted);
      localStorage.setItem(
        "unimatch_deleted_unis",
        JSON.stringify(nextDeleted),
      );
    }

    const cleanPayload = {
      ...payload,
      universityName: cleanUniName,
      department: cleanDeptName,
      universityId: payload.universityId || toSlugId(cleanUniName),
      programmeId:
        payload.programmeId ||
        `${toSlugId(cleanUniName)}-${toSlugId(cleanDeptName || "general")}`,
      updatedAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      if (existingId && !String(existingId).startsWith("local-")) {
        await updateDoc(doc(db, "university_records", existingId), {
          ...cleanPayload,
          updatedAt: serverTimestamp(),
        });
        return existingId;
      }
      const docRef = await addDoc(collection(db, "university_records"), {
        ...cleanPayload,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    }

    const nextList = existingId
      ? customRecords.map((r) =>
          r.id === existingId ? { ...r, ...cleanPayload } : r,
        )
      : [{ id: `local-${Date.now()}`, ...cleanPayload }, ...customRecords];

    setCustomRecords(nextList);
    localStorage.setItem("unimatch_admin_records", JSON.stringify(nextList));
    return existingId;
  };

  const deleteUniversityRecord = async (id) => {
    if (isFirebaseConfigured && db && id && !String(id).startsWith("local-")) {
      await deleteDoc(doc(db, "university_records", id));
      return;
    }
    const nextList = customRecords.filter((r) => r.id !== id);
    setCustomRecords(nextList);
    localStorage.setItem("unimatch_admin_records", JSON.stringify(nextList));
  };

  const deleteUniversityCompletely = async (uniName) => {
    const cleanName = String(uniName || "").trim();
    if (!cleanName) return;

    const nextDeleted = Array.from(
      new Set([...deletedUniNames, cleanName.toLowerCase()]),
    );
    setDeletedUniNames(nextDeleted);
    localStorage.setItem("unimatch_deleted_unis", JSON.stringify(nextDeleted));

    const matchingCustom = customRecords.filter(
      (r) =>
        (r.universityName || "").trim().toLowerCase() ===
        cleanName.toLowerCase(),
    );
    for (const rec of matchingCustom) {
      await deleteUniversityRecord(rec.id);
    }
  };

  const restoreDeletedUniversities = () => {
    setDeletedUniNames([]);
    localStorage.removeItem("unimatch_deleted_unis");
  };

  return (
    <UniversityDataContext.Provider
      value={{
        ...mergedData,
        customRecords,
        deletedUniNames,
        saveUniversityRecord,
        deleteUniversityRecord,
        deleteUniversityCompletely,
        restoreDeletedUniversities,
      }}
    >
      {children}
    </UniversityDataContext.Provider>
  );
}

export function useUniversityData() {
  return useContext(UniversityDataContext);
}
