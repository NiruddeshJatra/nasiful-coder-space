import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ResumeRedirect = () => {
  if (typeof window !== "undefined") {
    window.location.replace("/resume.html");
  }
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resume" element={<ResumeRedirect />} />
          <Route path="/about" element={<Index />} />
          <Route path="/experience" element={<Index />} />
          <Route path="/projects" element={<Index />} />
          <Route path="/skills" element={<Index />} />
          <Route path="/education" element={<Index />} />
          <Route path="/blog" element={<Index />} />
          <Route path="/contact" element={<Index />} />
          <Route path="/now" element={<Index />} />
          <Route path="/lab" element={<Index />} />
          <Route path="/notes" element={<Index />} />
          <Route path="/colophon" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
