import { useState, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import { MemoryManager } from "@/utils/memoryOptimization";
import { getPerformanceMonitor } from "@/utils/performance";
import { startViewTransition } from "@/lib/viewTransition";

interface Theme {
  name: string;
  bg: string;
  accent: string;
}

const pathToSection = (pathname: string): string => {
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");
  return trimmed === "" ? "welcome" : trimmed;
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSection = pathToSection(location.pathname);

  const [theme, setTheme] = useState<Theme>({
    name: "matrix",
    bg: "#0d0d0d",
    accent: "#00ff00",
  });

  useEffect(() => {
    MemoryManager.init();
    const performanceMonitor = getPerformanceMonitor();
    return () => {
      performanceMonitor.destroy();
    };
  }, []);

  const handleSectionChange = useCallback(
    (section: string) => {
      const target = section === "welcome" ? "/" : `/${section}`;
      if (location.pathname !== target) {
        startViewTransition(() => {
          flushSync(() => navigate(target));
        });
      }
    },
    [navigate, location.pathname]
  );

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="h-screen overflow-hidden relative">
      <ResponsiveLayout
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
    </div>
  );
};

export default Index;
