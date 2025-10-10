import React, { useState, useEffect, useRef } from "react";
import { FileCode, FileText, FileJson, Mail, Terminal, Zap, ChevronUp } from "lucide-react";
import AboutContent from "./sections/AboutContent";
import ExperienceContent from "./sections/ExperienceContent";
import ProjectsContent from "./sections/ProjectsContent";
import SkillsContent from "./sections/SkillsContent";
import EducationContent from "./sections/EducationContent";
import BlogContent from "./sections/BlogContent";
import ContactContent from "./sections/ContactContent";
import { useViewport } from "../hooks/useViewport";
import { getResponsiveFontSize, getResponsivePadding } from "../utils/responsive";
import "./Editor.css";

interface EditorProps {
  currentSection: string;
}

// Responsive Code Block Component
const ResponsiveCodeBlock = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { isMobile } = useViewport();
  
  return (
    <div className={`editor-code-block overflow-x-auto ${className}`}>
      <pre className={`${isMobile ? 'text-xs' : 'text-sm'} whitespace-pre font-mono`}>
        {children}
      </pre>
    </div>
  );
};

// Responsive Image Component
const ResponsiveImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  const { isMobile, width } = useViewport();
  
  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className={`w-full h-auto object-contain ${isMobile ? 'max-h-48' : 'max-h-96'}`}
        style={{
          maxWidth: isMobile ? '100%' : `${Math.min(width * 0.8, 800)}px`
        }}
      />
    </div>
  );
};

// Responsive Text Container
const ResponsiveTextContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { isMobile } = useViewport();
  
  return (
    <div className={`${isMobile ? 'text-sm leading-relaxed' : 'text-base leading-normal'} ${className}`}>
      {children}
    </div>
  );
};

// Smooth Scroll Container for Editor Content
const SmoothScrollContainer = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
    const { isMobile } = useViewport();
    
    return (
      <div 
        ref={ref}
        className={`
          editor-smooth-scroll
          overflow-y-auto overflow-x-hidden
          ${isMobile ? 'scroll-smooth' : 'custom-scrollbar'}
          ${className}
        `}
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
          scrollbarWidth: isMobile ? 'none' : 'thin', // Firefox
          msOverflowStyle: isMobile ? 'none' : 'auto' // IE/Edge
        }}
      >
        {children}
      </div>
    );
  }
);

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
  const { isMobile, isTablet, width } = useViewport();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll events for mobile scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  // Responsive classes based on viewport
  const responsiveClasses = {
    fontSize: getResponsiveFontSize(isMobile, isTablet),
    padding: getResponsivePadding(isMobile),
    textSize: isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base',
    headingSize: isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl',
    codeSize: isMobile ? 'text-[10px]' : 'text-xs',
    gridCols: isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    spacing: isMobile ? 'space-y-4' : 'space-y-6'
  };
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
          <div className={`${responsiveClasses.spacing} animate-fade-in font-mono`}>
            {/* ASCII Art Header - Responsive */}
            {!isMobile && (
              <div className="terminal-cyan font-bold text-sm leading-tight mb-6">
                <pre className={responsiveClasses.codeSize}>
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
            )}

            {/* Main Title - Responsive */}
            <div className="space-y-3">
              <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                <Terminal className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} terminal-green animate-pulse`} />
                <div>
                  <h1 className={`${responsiveClasses.headingSize} font-bold terminal-cyan`}>Nasiful Alam</h1>
                  <div className={`terminal-green ${responsiveClasses.textSize} mt-1`}>
                    <span className="animate-pulse">$</span> Startup Founder & Full-Stack Engineer
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info - Responsive Grid */}
            <div className={`grid ${responsiveClasses.gridCols} gap-4 mt-6`}>
              <div className={`${isMobile ? 'p-3' : 'p-4'} bg-card/50 border border-border rounded-lg hover:border-primary/50 transition-all`}>
                <div className={`terminal-purple ${responsiveClasses.textSize} mb-2`}>// Location</div>
                <div className={`text-foreground ${responsiveClasses.textSize}`}>📍 Chattogram, Bangladesh</div>
              </div>
              <div className={`${isMobile ? 'p-3' : 'p-4'} bg-card/50 border border-border rounded-lg hover:border-primary/50 transition-all`}>
                <div className={`terminal-purple ${responsiveClasses.textSize} mb-2`}>// Tech Stack</div>
                <div className={`text-foreground ${responsiveClasses.textSize}`}>⚡ Django • MERN • AWS</div>
              </div>
            </div>

            {/* Feature Highlights - Responsive */}
            <div className={`mt-8 ${isMobile ? 'p-4' : 'p-6'} bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-lg`}>
              <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-2'} mb-4`}>
                <Zap className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} terminal-yellow animate-pulse`} />
                <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold terminal-cyan`}>What I Build</h2>
              </div>
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'} ${responsiveClasses.textSize}`}>
                <div className="space-y-1">
                  <div className="terminal-green">→ Scalable Systems</div>
                  <div className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>Production-grade architectures on AWS</div>
                </div>
                <div className="space-y-1">
                  <div className="terminal-green">→ Full-Stack Apps</div>
                  <div className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>React, Django, Node.js platforms</div>
                </div>
                <div className="space-y-1">
                  <div className="terminal-green">→ MVPs & Products</div>
                  <div className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>From idea to production in weeks</div>
                </div>
              </div>
            </div>

            {/* Terminal Commands Guide - Responsive with horizontal scroll for code */}
            <div className={`mt-8 space-y-3 ${isMobile ? 'p-3' : 'p-4'} bg-black/30 border border-border rounded-lg`}>
              <div className={`terminal-purple ${responsiveClasses.textSize}`}>// Quick Start Guide</div>
              <div className={`space-y-2 ${responsiveClasses.textSize}`}>
                <div className="flex items-start gap-3">
                  <span className="terminal-cyan flex-shrink-0">→</span>
                  <div className="min-w-0 flex-1">
                    <div className="overflow-x-auto">
                      <span className="terminal-yellow whitespace-nowrap">cat about.txt</span>
                    </div>
                    <span className="text-muted-foreground ml-2 block">Learn about my background</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="terminal-cyan flex-shrink-0">→</span>
                  <div className="min-w-0 flex-1">
                    <div className="overflow-x-auto">
                      <span className="terminal-yellow whitespace-nowrap">cat projects.txt</span>
                    </div>
                    <span className="text-muted-foreground ml-2 block">View my featured projects</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="terminal-cyan flex-shrink-0">→</span>
                  <div className="min-w-0 flex-1">
                    <div className="overflow-x-auto">
                      <span className="terminal-yellow whitespace-nowrap">cat experience.txt</span>
                    </div>
                    <span className="text-muted-foreground ml-2 block">See my work experience</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="terminal-cyan flex-shrink-0">→</span>
                  <div className="min-w-0 flex-1">
                    <div className="overflow-x-auto">
                      <span className="terminal-yellow whitespace-nowrap">secrets</span>
                    </div>
                    <span className="text-muted-foreground ml-2 block">Discover easter eggs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun Stats - Responsive Grid */}
            <div className={`mt-6 grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-2 md:grid-cols-4 gap-3'} text-center`}>
              <div className={`${isMobile ? 'p-2' : 'p-3'} bg-card/30 border border-border rounded`}>
                <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold terminal-cyan`}>3+</div>
                <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground`}>Years Coding</div>
              </div>
              <div className={`${isMobile ? 'p-2' : 'p-3'} bg-card/30 border border-border rounded`}>
                <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold terminal-green`}>10K+</div>
                <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground`}>Lines Written</div>
              </div>
              <div className={`${isMobile ? 'p-2' : 'p-3'} bg-card/30 border border-border rounded`}>
                <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold terminal-yellow`}>∞</div>
                <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground`}>Coffee Cups</div>
              </div>
              <div className={`${isMobile ? 'p-2' : 'p-3'} bg-card/30 border border-border rounded`}>
                <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold terminal-purple`}>999</div>
                <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground`}>Bugs Fixed</div>
              </div>
            </div>

            {/* Bottom Tip - Responsive */}
            <div className={`mt-8 ${responsiveClasses.textSize} text-muted-foreground text-center pb-4`}>
              <span className="terminal-blue">💡 Pro Tip:</span> Use the terminal below or {isMobile ? 'menu' : 'click files on the left'} to explore
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Header - Responsive */}
      <div className={`flex items-center gap-2 ${isMobile ? 'px-3 py-2' : 'px-4 py-2'} border-b border-border bg-black/80 backdrop-blur-sm`}>
        {getFileIcon(currentSection)}
        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium truncate flex-1`}>{getFileName(currentSection)}</span>
        {!isMobile && (
          <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>UTF-8</span>
            <span>•</span>
            <span>LF</span>
          </div>
        )}
      </div>

      {/* Content Area - Responsive with Smooth Scrolling */}
      <SmoothScrollContainer className="flex-1" ref={scrollContainerRef}>
        <div className="flex min-h-full">
          {/* Line Numbers - Responsive and Dynamic */}
          {!isMobile && (
            <div className={`
              editor-line-numbers
              ${isMobile ? 'w-8' : 'w-12'} 
              bg-[#0a0a0a] text-right 
              ${isMobile ? 'pr-2' : 'pr-3'} 
              py-4 
              ${isMobile ? 'text-[10px]' : 'text-xs'} 
              text-muted-foreground/40 
              select-none 
              border-r border-border/30
              sticky top-0
              transition-all duration-200
            `}>
              {Array.from({ length: 100 }, (_, i) => (
                <div 
                  key={i} 
                  className={`
                    leading-6 
                    hover:text-muted-foreground 
                    transition-colors duration-150
                    ${isMobile ? 'py-1' : 'py-0'}
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          
          {/* Content Container - Enhanced for mobile scrolling */}
          <div className={`
            editor-content
            flex-1 
            ${responsiveClasses.padding} 
            animate-fade-in 
            transition-all duration-300 ease-out
            ${isMobile ? 'overflow-x-auto' : ''}
          `}>
            <div className="min-w-0 w-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </SmoothScrollContainer>

      {/* Scroll to Top Button - Mobile Only */}
      {isMobile && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-20 right-4 z-50
            w-12 h-12
            bg-primary/90 hover:bg-primary
            text-primary-foreground
            rounded-full
            shadow-lg
            transition-all duration-200
            flex items-center justify-center
            backdrop-blur-sm
            border border-primary/20
          "
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Editor;
