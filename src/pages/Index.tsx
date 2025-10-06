import { useState } from "react";
import { Terminal as TerminalIcon, Mail, Github, Linkedin } from "lucide-react";
import Terminal from "@/components/Terminal";
import Editor from "@/components/Editor";
import FileExplorer from "@/components/FileExplorer";
import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCursor from "@/components/InteractiveCursor";
import ThemeSwitcher from "@/components/ThemeSwitcher";

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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCommand = (section: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(section);
      setIsTransitioning(false);
    }, 200);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div 
      className="h-screen flex flex-col overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Matrix Background Effect */}
      <MatrixBackground />
      
      {/* Interactive 3D Cursor */}
      <InteractiveCursor />

      {/* Header Bar */}
      <div className="bg-[#1e1e1e] border-b border-border px-4 py-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="terminal-green" size={18} />
            <span className="font-bold text-base">Nasiful Alam</span>
          </div>
          <span className="text-muted-foreground text-xs">Full-Stack Engineer</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <ThemeSwitcher currentTheme={theme} onThemeChange={handleThemeChange} />
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a 
              href="mailto:nasifulalam1212@gmail.com" 
              className="hover:text-primary transition" 
              title="Email"
            >
              <Mail size={16} />
            </a>
            <a 
              href="https://github.com/niruddeshjatra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition" 
              title="GitHub"
            >
              <Github size={16} />
            </a>
            <a 
              href="https://linkedin.com/in/nasiful-alam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition" 
              title="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* File Explorer - Left Side */}
        <div className="w-48 hidden md:block">
          <FileExplorer 
            currentSection={currentSection} 
            onSectionChange={handleCommand} 
          />
        </div>

        {/* Editor - Center/Right with Glitch Transition */}
        <div 
          className={`flex-1 transition-all duration-200 ${
            isTransitioning ? 'opacity-0 blur-sm scale-[0.98]' : 'opacity-100 blur-0 scale-100'
          }`}
        >
          <Editor currentSection={currentSection} />
        </div>
      </div>

      {/* Terminal - Bottom (includes stats now) */}
      <div className="h-56 border-t border-border relative z-10">
        <Terminal 
          onCommand={handleCommand} 
          currentSection={currentSection}
          onThemeChange={handleThemeChange}
        />
      </div>
    </div>
  );
};

export default Index;
