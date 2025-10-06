import { FileCode, FileText, FileJson, Mail, Terminal, Zap } from "lucide-react";
import AboutContent from "./sections/AboutContent";
import ExperienceContent from "./sections/ExperienceContent";
import ProjectsContent from "./sections/ProjectsContent";
import SkillsContent from "./sections/SkillsContent";
import EducationContent from "./sections/EducationContent";
import BlogContent from "./sections/BlogContent";
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
    case "blog":
      return "blog.md";
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
      case "blog":
        return <BlogContent />;
      case "contact":
        return <ContactContent />;
      default:
        return (
          <div className="space-y-6 animate-fade-in font-mono">
            {/* ASCII Art Header */}
            <div className="terminal-cyan font-bold text-sm leading-tight mb-6">
              <pre className="text-[10px] sm:text-xs">
{`
 ███▄    █  ▄▄▄        ██████  ██▓  █████▒█    ██  ██▓    
 ██ ▀█   █ ▒████▄    ▒██    ▒ ▓██▒▓██   ▒ ██  ▓██▒▓██▒    
▓██  ▀█ ██▒▒██  ▀█▄  ░ ▓██▄   ▒██▒▒████ ░▓██  ▒██░▒██░    
▓██▒  ▐▌██▒░██▄▄▄▄██   ▒   ██▒░██░░▓█▒  ░▓▓█  ░██░▒██░    
▒██░   ▓██░ ▓█   ▓██▒▒██████▒▒░██░░▒█░   ▒▒█████▓ ░██████▒
░ ▒░   ▒ ▒  ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░░▓   ▒ ░   ░▒▓▒ ▒ ▒ ░ ▒░▓  ░
░ ░░   ░ ▒░  ▒   ▒▒ ░░ ░▒  ░ ░ ▒ ░ ░     ░░▒░ ░ ░ ░ ░ ▒  ░
   ░   ░ ░   ░   ▒   ░  ░  ░   ▒ ░ ░ ░    ░░░ ░ ░   ░ ░   
         ░       ░  ░      ░   ░            ░         ░  ░
`}
              </pre>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Terminal className="w-8 h-8 terminal-green animate-pulse" />
                <div>
                  <h1 className="text-3xl font-bold terminal-cyan">Nasiful Alam</h1>
                  <div className="terminal-green text-sm mt-1">
                    <span className="animate-pulse">$</span> Startup Founder & Full-Stack Engineer
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-card/50 border border-border rounded-lg hover:border-primary/50 transition-all">
                <div className="terminal-purple text-xs mb-2">// Location</div>
                <div className="text-foreground">📍 Chattogram, Bangladesh</div>
              </div>
              <div className="p-4 bg-card/50 border border-border rounded-lg hover:border-primary/50 transition-all">
                <div className="terminal-purple text-xs mb-2">// Tech Stack</div>
                <div className="text-foreground">⚡ Django • MERN • AWS</div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 terminal-yellow animate-pulse" />
                <h2 className="text-lg font-semibold terminal-cyan">What I Build</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="terminal-green">→ Scalable Systems</div>
                  <div className="text-muted-foreground text-xs">Production-grade architectures on AWS</div>
                </div>
                <div className="space-y-1">
                  <div className="terminal-green">→ Full-Stack Apps</div>
                  <div className="text-muted-foreground text-xs">React, Django, Node.js platforms</div>
                </div>
                <div className="space-y-1">
                  <div className="terminal-green">→ MVPs & Products</div>
                  <div className="text-muted-foreground text-xs">From idea to production in weeks</div>
                </div>
              </div>
            </div>

            {/* Terminal Commands Guide */}
            <div className="mt-8 space-y-3 p-4 bg-black/30 border border-border rounded-lg">
              <div className="terminal-purple text-xs">// Quick Start Guide</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <span className="terminal-cyan">→</span>
                  <div>
                    <span className="terminal-yellow">cat about.txt</span>
                    <span className="text-muted-foreground ml-2">Learn about my background</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="terminal-cyan">→</span>
                  <div>
                    <span className="terminal-yellow">cat projects.txt</span>
                    <span className="text-muted-foreground ml-2">View my featured projects</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="terminal-cyan">→</span>
                  <div>
                    <span className="terminal-yellow">cat experience.txt</span>
                    <span className="text-muted-foreground ml-2">See my work experience</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="terminal-cyan">→</span>
                  <div>
                    <span className="terminal-yellow">secrets</span>
                    <span className="text-muted-foreground ml-2">Discover easter eggs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-card/30 border border-border rounded">
                <div className="text-2xl font-bold terminal-cyan">3+</div>
                <div className="text-xs text-muted-foreground">Years Coding</div>
              </div>
              <div className="p-3 bg-card/30 border border-border rounded">
                <div className="text-2xl font-bold terminal-green">10K+</div>
                <div className="text-xs text-muted-foreground">Lines Written</div>
              </div>
              <div className="p-3 bg-card/30 border border-border rounded">
                <div className="text-2xl font-bold terminal-yellow">∞</div>
                <div className="text-xs text-muted-foreground">Coffee Cups</div>
              </div>
              <div className="p-3 bg-card/30 border border-border rounded">
                <div className="text-2xl font-bold terminal-purple">999</div>
                <div className="text-xs text-muted-foreground">Bugs Fixed</div>
              </div>
            </div>

            {/* Bottom Tip */}
            <div className="mt-8 text-xs text-muted-foreground text-center pb-4">
              <span className="terminal-blue">💡 Pro Tip:</span> Use the terminal below or click files on the left to explore
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-black/80 backdrop-blur-sm">
        {getFileIcon(currentSection)}
        <span className="text-sm font-medium">{getFileName(currentSection)}</span>
        <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>UTF-8</span>
          <span>•</span>
          <span>LF</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex h-full">
          <div className="w-12 bg-[#0a0a0a] text-right pr-3 py-4 text-xs text-muted-foreground/40 select-none border-r border-border/30">
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i} className="leading-6 hover:text-muted-foreground transition-colors">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex-1 p-6 animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
