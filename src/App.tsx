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

// 🧘 Nuevo módulo de meditación
import MeditationPage from "@/pages/Meditation/MeditationPage";
import PoseDetail from "@/pages/Meditation/PoseDetail";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function AppContent() {
  const [activeSection, setActiveSection] = useState<
    "home" | "meditate" | "breathe"
  >("home");

  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  const [showScreensaver, setShowScreensaver] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      setShowScreensaver(false);
      clearTimeout(timer);
      timer = setTimeout(() => setShowScreensaver(true), 20000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {showScreensaver && (
        <div className="fixed inset-0 z-10 animate-fade-in">
          <MeditationScene />
        </div>
      )}

      {!hideNavbar && (
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* 🧘 Módulo de meditación */}
        <Route path="/meditation" element={
            <ProtectedRoute>
              <MeditationPage />
            </ProtectedRoute>
          }
        />
        <Route path="/meditation/pose/:id" element={<PoseDetail />} />

        {/* ❌ 404 */}
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
