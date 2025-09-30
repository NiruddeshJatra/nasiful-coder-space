import { useState } from "react";
import { Terminal as TerminalIcon, Mail, Github, Linkedin } from "lucide-react";
import Terminal from "@/components/Terminal";
import Editor from "@/components/Editor";
import FileExplorer from "@/components/FileExplorer";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("welcome");

  const handleCommand = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Header Bar */}
      <div className="bg-[#1e1e1e] border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="terminal-green" size={18} />
            <span className="font-bold text-base">Nasiful Alam</span>
          </div>
          <span className="text-muted-foreground text-xs">Full-Stack Engineer</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="mailto:nasifulalam1212@gmail.com" className="hover:text-primary transition" title="Email">
            <Mail size={16} />
          </a>
          <a href="https://github.com/nasiful" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" title="GitHub">
            <Github size={16} />
          </a>
          <a href="https://linkedin.com/in/nasiful" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" title="LinkedIn">
            <Linkedin size={16} />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer - Left Side */}
        <div className="w-48 hidden md:block">
          <FileExplorer 
            currentSection={currentSection} 
            onSectionChange={setCurrentSection} 
          />
        </div>

        {/* Editor - Center/Right */}
        <div className="flex-1">
          <Editor currentSection={currentSection} />
        </div>
      </div>

      {/* Terminal - Bottom */}
      <div className="h-64 border-t border-border">
        <Terminal onCommand={handleCommand} currentSection={currentSection} />
      </div>
    </div>
  );
};

export default Index;
