import { useViewport } from '../hooks/useViewport';

interface Theme {
  name: string;
  bg: string;
  accent: string;
}

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSwitcher = ({ currentTheme, onThemeChange }: ThemeSwitcherProps) => {
  const { isMobile } = useViewport();
  
  // Keep only the primary matrix theme
  const primaryTheme: Theme = { name: 'matrix', bg: '#0d0d0d', accent: '#00ff00' };
  
  return (
    <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
      <button
        onClick={() => onThemeChange(primaryTheme)}
        className={`
          ${isMobile ? 'min-h-[44px] min-w-[44px] p-2' : 'w-6 h-6'} 
          rounded border-2 transition-all hover:scale-110 flex items-center justify-center
          ${currentTheme.name === primaryTheme.name ? 'border-primary scale-110' : 'border-border'}
        `}
        title={primaryTheme.name}
        aria-label={`Switch to ${primaryTheme.name} theme`}
      >
        <div 
          className={`${isMobile ? 'w-6 h-6' : 'w-full h-full'} rounded`}
          style={{ backgroundColor: primaryTheme.accent }}
        />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
