import { useState } from "react";
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
