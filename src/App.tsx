// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { supabase } from "@/lib/database/supabaseClient";

import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import MeditationScene from "@/components/screensaver/MeditationScene";

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import Favorites from "@/pages/Favorites";
import PoseDetail from "@/pages/Meditation/PoseDetail";
import EjercisePage from "@/pages/Ejerice/EjercicePage";
import NutritionPage from "@/pages/Nutrition/NutritionPage";
import MeditationPage from "@/pages/Meditation/MeditationPage";
import ExerciseDetail from "./pages/Ejerice/ExerciseDetail";

const queryClient = new QueryClient();

function AppContent() {
  const [activeSection, setActiveSection] = useState<
    "home" | "meditate" | "breathe"
  >("home");

  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUserSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUserSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

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
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nutrition"
          element={
            <ProtectedRoute>
              <NutritionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercise"
          element={
            <ProtectedRoute>
              <EjercisePage />
            </ProtectedRoute>
          }
        />
        <Route path="/exercise/:name" element={<ExerciseDetail />} />

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
