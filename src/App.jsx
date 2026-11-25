import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { UniversityDataProvider } from "@/context/UniversityDataContext";
import AppRoutes from "@/routes/AppRoutes";
import PromoModal from "@/components/common/PromoModal";

function AppToaster() {
  const { isDark } = useTheme();
  return (
    <Toaster
      position="top-right"
      richColors
      theme={isDark ? "dark" : "light"}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UniversityDataProvider>
          <BrowserRouter>
            <AppRoutes />
            <PromoModal />
            <AppToaster />
          </BrowserRouter>
        </UniversityDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
