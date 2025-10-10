import React, { useRef, useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';
import Terminal from './Terminal';
import { useTouchGestures } from '../hooks/useTouchGestures';
import { getMobileTerminalHeight, Z_INDEX } from '../utils/responsive';

interface Theme {
  name: string;
  bg: string;
  accent: string;
}

interface ResponsiveTerminalProps {
  onCommand: (command: string) => void;
  currentSection: string;
  onThemeChange?: (theme: Theme) => void;
  isMobile: boolean;
  isTablet: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

const ResponsiveTerminal: React.FC<ResponsiveTerminalProps> = ({
  onCommand,
  currentSection,
  onThemeChange,
  isMobile,
  isTablet,
  isExpanded,
  onToggleExpanded
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Get viewport height for calculating terminal height
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
  const terminalHeight = getMobileTerminalHeight(viewportHeight, isExpanded);

  // Handle swipe gestures for expand/collapse
  useTouchGestures(dragHandleRef, {
    onSwipeUp: () => {
      if (!isExpanded) {
        onToggleExpanded();
      }
    },
    onSwipeDown: () => {
      if (isExpanded) {
        onToggleExpanded();
      }
    }
  });

  if (!isMobile) {
    // For tablet/desktop, use regular terminal
    return (
      <div className="h-56 border-t border-border relative" style={{ zIndex: Z_INDEX.terminal }}>
        <Terminal 
          onCommand={onCommand} 
          currentSection={currentSection}
          onThemeChange={onThemeChange}
        />
      </div>
    );
  }

  return (
    <div
      ref={terminalRef}
      className={`
        fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-border
        transition-all duration-200 ease-out
        ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'}
      `}
      style={{ 
        height: terminalHeight,
        zIndex: Z_INDEX.terminal
      }}
    >
      {/* Drag Handle */}
      <div
        ref={dragHandleRef}
        className="flex items-center justify-center h-6 bg-muted/20 border-b border-border cursor-grab"
        role="button"
        tabIndex={0}
        aria-label={isExpanded ? 'Collapse terminal' : 'Expand terminal'}
        onClick={onToggleExpanded}
      >
        <div className="w-8 h-1 bg-muted-foreground/50 rounded-full" />
        
        <button
          className="absolute right-2 p-1 rounded hover:bg-muted/50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpanded();
          }}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Terminal Content */}
      <div className={`
        flex-1 overflow-hidden transition-opacity duration-200
        ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <Terminal 
          onCommand={onCommand} 
          currentSection={currentSection}
          onThemeChange={onThemeChange}
        />
      </div>
    </div>
  );
};

export default ResponsiveTerminal;