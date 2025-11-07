// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";

import { Navbar } from "@/components/Navbar";
import MeditationScene from "@/components/screensaver/MeditationScene";

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import MeditationPage from "@/pages/Meditation/MeditationPage";
import PoseDetail from "@/pages/Meditation/PoseDetail";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import { supabase } from "@/lib/database/supabaseClient"; // ✅ Asegúrate de importar esto

const queryClient = new QueryClient();

function AppContent() {
  const [activeSection, setActiveSection] = useState<
    "home" | "meditate" | "breathe"
  >("home");

  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  const [showScreensaver, setShowScreensaver] = useState(false);

  // ✅ Nuevo estado de usuario
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1️⃣ Obtener usuario activo
    const getUserSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUserSession();

    // 2️⃣ Escuchar cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🧘 Protector de pantalla
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      setShowScreensaver(false);
      clearTimeout(timer);
      timer = setTimeout(() => setShowScreensaver(true), 20000);
    };

    ["mousemove", "keydown", "click", "scroll"].forEach((evt) =>
      window.addEventListener(evt, resetTimer)
    );

    resetTimer();
    return () => {
      clearTimeout(timer);
      ["mousemove", "keydown", "click", "scroll"].forEach((evt) =>
        window.removeEventListener(evt, resetTimer)
      );
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {showScreensaver && (
        <div className="fixed inset-0 z-10 animate-fade-in">
          <MeditationScene />
        </div>
      )}

      {/* ✅ Navbar recibe el usuario */}
      {!hideNavbar && (
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          user={user}
        />
      )}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meditation"
          element={
            <ProtectedRoute>
              <MeditationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meditation/pose/:id"
          element={
            <ProtectedRoute>
              <PoseDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
