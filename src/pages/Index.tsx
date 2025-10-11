import { useState, useEffect } from "react";
import { LazyInteractiveCursor, ConditionalLazy } from "@/components/LazyComponents";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import { MemoryManager } from "@/utils/memoryOptimization";
import { getPerformanceMonitor } from "@/utils/performance";

interface Theme {
  name: string;
  bg: string;
  accent: string;
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState("welcome");
  const [theme, setTheme] = useState<Theme>({ 
    name: 'matrix', 
    bg: '#0d0d0d', 
    accent: '#00ff00' 
  });

  // Initialize performance monitoring and memory management
  useEffect(() => {
    // Initialize memory management
    MemoryManager.init();
    
    // Initialize performance monitoring
    const performanceMonitor = getPerformanceMonitor();
    
    // Cleanup function
    return () => {
      performanceMonitor.destroy();
    };
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Interactive Cursor - Only on desktop, lazy loaded */}
      <ConditionalLazy fallback={null}>
        <LazyInteractiveCursor />
      </ConditionalLazy>

      {/* Responsive Layout System - Always loaded as it's critical */}
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
