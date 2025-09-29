import { useState } from "react";
import Terminal from "@/components/Terminal";
import Editor from "@/components/Editor";
import StatusBar from "@/components/StatusBar";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("welcome");

  const handleCommand = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Terminal - Left Side */}
        <div className="w-full md:w-96 border-r border-border">
          <Terminal onCommand={handleCommand} currentSection={currentSection} />
        </div>

        {/* Editor - Right Side */}
        <div className="flex-1 hidden md:block">
          <Editor currentSection={currentSection} />
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Index;
