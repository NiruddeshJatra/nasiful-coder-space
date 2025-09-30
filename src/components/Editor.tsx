import { FileCode, FileText, FileJson, Mail } from "lucide-react";
import AboutContent from "./sections/AboutContent";
import ExperienceContent from "./sections/ExperienceContent";
import ProjectsContent from "./sections/ProjectsContent";
import SkillsContent from "./sections/SkillsContent";
import EducationContent from "./sections/EducationContent";
import ContactContent from "./sections/ContactContent";

interface EditorProps {
  currentSection: string;
}

const getFileIcon = (section: string) => {
  switch (section) {
    case "about":
      return <FileText className="w-4 h-4 terminal-blue" />;
    case "skills":
      return <FileJson className="w-4 h-4 terminal-yellow" />;
    case "contact":
      return <Mail className="w-4 h-4 terminal-orange" />;
    default:
      return <FileCode className="w-4 h-4 terminal-cyan" />;
  }
};

const getFileName = (section: string) => {
  switch (section) {
    case "about":
      return "about.txt";
    case "experience":
      return "experience.txt";
    case "projects":
      return "projects.txt";
    case "skills":
      return "skills.json";
    case "education":
      return "education.txt";
    case "contact":
      return "contact.md";
    default:
      return "welcome.txt";
  }
};

const Editor = ({ currentSection }: EditorProps) => {
  const renderContent = () => {
    switch (currentSection) {
      case "about":
        return <AboutContent />;
      case "experience":
        return <ExperienceContent />;
      case "projects":
        return <ProjectsContent />;
      case "skills":
        return <SkillsContent />;
      case "education":
        return <EducationContent />;
      case "contact":
        return <ContactContent />;
      default:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-6xl font-bold terminal-cyan mb-4">
              NASIFUL ALAM
            </div>
            <div className="text-2xl terminal-green mb-8">
              $ <span className="typewriter inline-block">Startup Founder & Full-Stack Engineer</span>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-lg">Building scalable systems on AWS</p>
              <p>📍 Chattogram, Bangladesh</p>
            </div>
            <div className="mt-12 space-y-2">
              <p className="terminal-purple">// Start exploring:</p>
              <p className="text-muted-foreground">Type <span className="terminal-cyan">'help'</span> in the terminal to see available commands</p>
              <p className="text-muted-foreground">Or try <span className="terminal-cyan">'cat about.txt'</span> to learn more about me</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d0d]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-[#0a0a0a]">
        {getFileIcon(currentSection)}
        <span className="text-sm font-medium">{getFileName(currentSection)}</span>
        <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>UTF-8</span>
          <span>•</span>
          <span>LF</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex h-full">
          <div className="w-12 bg-[#0a0a0a] text-right pr-3 py-4 text-xs text-muted-foreground/40 select-none border-r border-border/30">
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i} className="leading-6 hover:text-muted-foreground transition-colors">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex-1 p-8 animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
