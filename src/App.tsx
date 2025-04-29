import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Index from "./pages/Index";
import Scene from "./pages/Scene";
import NotFound from "./pages/NotFound";
import CocosEmbed, { GlobalIframe } from "./components/CocosEmbed";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
      <CocosEmbed>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* LoadingScreen as initial route */}
                  <Route path="/" element={<LoadingScreen />} />
                  
                  {/* Main app routes */}
                  <Route path="/home" element={<Index />} />
                  <Route path="/scene" element={<Scene />} />
                  
                  {/* Redirect old routes */}
                  <Route path="/index" element={<Navigate replace to="/home" />} />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </CocosEmbed>
      <GlobalIframe />
    </>
  );
};

export default App;
