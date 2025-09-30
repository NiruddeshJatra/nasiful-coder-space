import { Folder, File, ChevronRight } from "lucide-react";

interface FileExplorerProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const files = [
  { name: "about.txt", section: "about", icon: File },
  { name: "experience.txt", section: "experience", icon: File },
  { name: "projects.txt", section: "projects", icon: File },
  { name: "skills.json", section: "skills", icon: File },
  { name: "education.txt", section: "education", icon: File },
  { name: "blog.md", section: "blog", icon: File },
  { name: "contact.md", section: "contact", icon: File },
];

const FileExplorer = ({ currentSection, onSectionChange }: FileExplorerProps) => {
  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] border-r border-border">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
        <Folder className="w-4 h-4 terminal-blue" />
        <span className="text-xs font-semibold uppercase tracking-wide">Explorer</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-2">
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-muted-foreground mb-1">
            <ChevronRight className="w-3 h-3" />
            <Folder className="w-3 h-3 terminal-blue" />
            <span>PORTFOLIO</span>
          </div>
          
          <div className="pl-4 space-y-0.5">
            {files.map((file) => {
              const Icon = file.icon;
              const isActive = currentSection === file.section;
              
              return (
                <div
                  key={file.section}
                  onClick={() => onSectionChange(file.section)}
                  className={`
                    flex items-center gap-2 px-2 py-1 text-xs cursor-pointer rounded
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-muted text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }
                  `}
                >
                  <Icon className={`w-3 h-3 transition-transform group-hover:scale-110 ${
                    isActive ? 'terminal-cyan' : ''
                  }`} />
                  <span>{file.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-3 py-2 border-t border-border bg-muted/20 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
