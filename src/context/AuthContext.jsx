// src/context/AuthContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  auth,
  db,
  googleProvider,
  isFirebaseConfigured,
} from "@/firebase/config";

const AuthContext = createContext(null);

const ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL || "admin@unimatch.com"
).toLowerCase();

const DEFAULT_PROFILE = {
  name: "Student User",
  sscGpa: "5.00",
  hscGpa: "4.83",
  targetSubject: "CSE / Engineering",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(
    () => localStorage.getItem("unimatch_role") || null,
  );
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("unimatch_profile");
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });
  const [savedUnis, setSavedUnis] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unimatch_saved_unis") || "[]");
    } catch {
      return [];
    }
  });
  const [testHistory, setTestHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unimatch_test_history") || "[]");
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);

  const syncUserDocument = useCallback(async (firebaseUser, extraName = "") => {
    if (!isFirebaseConfigured || !db || !firebaseUser) return null;

    const resolvedRole =
      firebaseUser.email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user";

    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        const initialData = {
          name:
            extraName ||
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "Student User",
          email: firebaseUser.email || "",
          role: resolvedRole,
          sscGpa: "5.00",
          hscGpa: "4.83",
          targetSubject: "CSE / Engineering",
          savedUniversities: [],
          testHistory: [],
          createdAt: serverTimestamp(),
        };
        await setDoc(userRef, initialData);
        return initialData;
      }

      const data = snap.data();
      return {
        ...data,
        role: data.role || resolvedRole,
      };
    } catch (err) {
      console.warn("Firestore profile sync skipped:", err?.message || err);
      return {
        name:
          extraName ||
          firebaseUser.displayName ||
          firebaseUser.email?.split("@")[0] ||
          "Student User",
        email: firebaseUser.email || "",
        role: resolvedRole,
      };
    }
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const fallbackRole =
          firebaseUser.email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
        setRole(fallbackRole);
        localStorage.setItem("unimatch_role", fallbackRole);

        const userData = await syncUserDocument(firebaseUser);
        if (userData) {
          const activeRole = userData.role || fallbackRole;
          setRole(activeRole);
          localStorage.setItem("unimatch_role", activeRole);

          const nextProfile = {
            name: userData.name || firebaseUser.displayName || "Student User",
            sscGpa: userData.sscGpa ?? "5.00",
            hscGpa: userData.hscGpa ?? "4.83",
            targetSubject: userData.targetSubject || "CSE / Engineering",
          };
          setProfile(nextProfile);
          localStorage.setItem("unimatch_profile", JSON.stringify(nextProfile));

          if (Array.isArray(userData.savedUniversities)) {
            setSavedUnis(userData.savedUniversities);
            localStorage.setItem(
              "unimatch_saved_unis",
              JSON.stringify(userData.savedUniversities),
            );
            window.dispatchEvent(new Event("unimatch_bookmark_updated"));
          }

          if (Array.isArray(userData.testHistory)) {
            setTestHistory(userData.testHistory);
            localStorage.setItem(
              "unimatch_test_history",
              JSON.stringify(userData.testHistory),
            );
          }
        }
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem("unimatch_role");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [syncUserDocument]);

  const loginWithEmail = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const userData = await syncUserDocument(cred.user);
      const activeRole =
        userData?.role ||
        (cred.user.email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user");
      setRole(activeRole);
      localStorage.setItem("unimatch_role", activeRole);
      return { role: activeRole };
    }

    if (email === "admin@unimatch.com" && password === "admin123") {
      localStorage.setItem("unimatch_role", "admin");
      setRole("admin");
      return { role: "admin" };
    }
    localStorage.setItem("unimatch_role", "user");
    setRole("user");
    return { role: "user" };
  };

  const signupWithEmail = async ({ name, email, password }) => {
    if (isFirebaseConfigured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        try {
          await updateProfile(cred.user, { displayName: name });
        } catch {
          // ignore profile update error
        }
      }
      const userData = await syncUserDocument(cred.user, name);
      const activeRole =
        userData?.role ||
        (cred.user.email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user");
      setRole(activeRole);
      localStorage.setItem("unimatch_role", activeRole);
      return { role: activeRole };
    }

    const updated = { ...profile, name: name || "Student User" };
    setProfile(updated);
    localStorage.setItem("unimatch_profile", JSON.stringify(updated));
    localStorage.setItem("unimatch_role", "user");
    setRole("user");
    return { role: "user" };
  };

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error(
        "Configure Firebase credentials in .env to use Google Sign-In.",
      );
    }
    const cred = await signInWithPopup(auth, googleProvider);
    const userData = await syncUserDocument(cred.user);
    const activeRole =
      userData?.role ||
      (cred.user.email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user");
    setRole(activeRole);
    localStorage.setItem("unimatch_role", activeRole);
    return { role: activeRole };
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem("unimatch_role");
    setRole(null);
    setUser(null);
  };

  const updateUserProfile = async (nextProfile) => {
    setProfile(nextProfile);
    localStorage.setItem("unimatch_profile", JSON.stringify(nextProfile));

    if (isFirebaseConfigured && db && user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          name: nextProfile.name,
          sscGpa: nextProfile.sscGpa,
          hscGpa: nextProfile.hscGpa,
          targetSubject: nextProfile.targetSubject,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn("Profile cloud update failed:", err?.message || err);
      }
    }
  };

  const toggleBookmarkUni = async (uniId) => {
    const current = JSON.parse(
      localStorage.getItem("unimatch_saved_unis") || "[]",
    );
    const exists = current.includes(uniId);
    const nextSaved = exists
      ? current.filter((id) => id !== uniId)
      : [...current, uniId];

    localStorage.setItem("unimatch_saved_unis", JSON.stringify(nextSaved));
    setSavedUnis(nextSaved);
    window.dispatchEvent(new Event("unimatch_bookmark_updated"));

    if (isFirebaseConfigured && db && user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          savedUniversities: nextSaved,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn("Bookmark cloud sync failed:", err?.message || err);
      }
    }

    return !exists;
  };

  const saveTestResult = async (entry) => {
    const current = JSON.parse(
      localStorage.getItem("unimatch_test_history") || "[]",
    );
    const nextHistory = [entry, ...current];
    localStorage.setItem("unimatch_test_history", JSON.stringify(nextHistory));
    setTestHistory(nextHistory);

    if (isFirebaseConfigured && db && user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          testHistory: nextHistory,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn("Test score cloud sync failed:", err?.message || err);
      }
    }
  };

  const clearTestHistory = async () => {
    localStorage.removeItem("unimatch_test_history");
    setTestHistory([]);

    if (isFirebaseConfigured && db && user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          testHistory: [],
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn("Clear history cloud sync failed:", err?.message || err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        profile,
        savedUnis,
        testHistory,
        loading,
        isFirebaseConfigured,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        logout,
        updateUserProfile,
        toggleBookmarkUni,
        saveTestResult,
        clearTestHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
