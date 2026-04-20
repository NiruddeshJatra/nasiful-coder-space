import React, { useRef, useState } from "react";
import { Folder, File, ChevronRight } from "lucide-react";
import { useListKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { MIN_TOUCH_TARGET_SIZE } from '../utils/accessibility';

export interface FileItem {
  name: string;
  section: string;
  icon: typeof File;
}

interface FileExplorerProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const files: FileItem[] = [
  { name: "about.txt", section: "about", icon: File },
  { name: "experience.txt", section: "experience", icon: File },
  { name: "projects.txt", section: "projects", icon: File },
  { name: "skills.json", section: "skills", icon: File },
  { name: "education.txt", section: "education", icon: File },
  { name: "now.md", section: "now", icon: File },
  { name: "lab/", section: "lab", icon: Folder },
  { name: "notes/", section: "notes", icon: Folder },
  { name: "blog.md", section: "blog", icon: File },
  { name: "contact.md", section: "contact", icon: File },
  { name: "colophon.md", section: "colophon", icon: File },
];

const FileExplorer = ({ currentSection, onSectionChange }: FileExplorerProps) => {
  const explorerRef = useRef<HTMLElement>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);

  // Get file buttons for keyboard navigation
  const getFileButtons = () => {
    if (!explorerRef.current) return [];
    return Array.from(
      explorerRef.current.querySelectorAll('[data-file-button]')
    ) as HTMLElement[];
  };

  // Keyboard navigation for file list
  useListKeyboardNavigation(
    getFileButtons(),
    focusedItemIndex,
    setFocusedItemIndex,
    (index) => {
      const file = files[index];
      if (file) {
        onSectionChange(file.section);
      }
    },
    true
  );

  return (
    <nav
      ref={explorerRef}
      className="h-full flex flex-col bg-black/90 backdrop-blur-sm border-r border-border"
      aria-label="Portfolio sections"
      role="navigation"
    >
      <div className="border-b border-border bg-black/50">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Folder className="w-4 h-4 terminal-blue" aria-hidden="true" />
          <h2 className="text-xs font-semibold uppercase tracking-wide">
            Explorer — nasif/
          </h2>
        </div>
        <p className="text-[10px] opacity-40 px-2 pb-2">
          a site shaped like a codebase
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-1">
        <div className="mb-2">
          <div
            className="flex items-center gap-1 px-1.5 text-xs font-medium text-muted-foreground mb-1"
            role="presentation"
          >
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Folder className="w-3 h-3 terminal-blue" aria-hidden="true" />
            <span>PORTFOLIO</span>
          </div>

          <ul className="pl-2" role="menu">
            {files.map((file, index) => {
              const Icon = file.icon;
              const isActive = currentSection === file.section;
              const isFocused = focusedItemIndex === index;

              return (
                <li key={file.section} role="none">
                  <button
                    data-file-button
                    onClick={() => onSectionChange(file.section)}
                    className={`
                      w-full flex items-center gap-1.5 px-1.5 py-1 text-xs text-left rounded
                      transition-all duration-200 group focus-visible:focus-visible
                      min-h-[${MIN_TOUCH_TARGET_SIZE}px]
                      ${isActive
                        ? 'bg-muted text-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }
                      ${isFocused ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                    `}
                    aria-current={isActive ? 'page' : undefined}
                    aria-describedby={isActive ? `current-section-${file.section}` : undefined}
                    role="menuitem"
                    type="button"
                  >
                    <Icon
                      className={`w-3 h-3 transition-transform group-hover:scale-110 ${isActive ? 'terminal-cyan' : ''
                        }`}
                      aria-hidden="true"
                    />
                    <span>{file.name}</span>
                    {isActive && (
                      <span
                        id={`current-section-${file.section}`}
                        className="sr-only"
                      >
                        (current section)
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className="px-2 py-1.5 border-t border-border bg-muted/20 text-[10px] text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-1">
          <div
            className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
            aria-hidden="true"
          />
          <span>Ready</span>
        </div>
      </div>
    </nav>
  );
};

export default FileExplorer;
