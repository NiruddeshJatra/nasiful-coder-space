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
  const themes: Theme[] = [
    { name: 'matrix', bg: '#0d0d0d', accent: '#00ff00' },
    { name: 'dracula', bg: '#282a36', accent: '#bd93f9' },
    { name: 'monokai', bg: '#272822', accent: '#a6e22e' },
    { name: 'solarized', bg: '#002b36', accent: '#2aa198' },
  ];
  
  return (
    <div className="flex items-center gap-2">
      {themes.map(theme => (
        <button
          key={theme.name}
          onClick={() => onThemeChange(theme)}
          className={`w-6 h-6 rounded border-2 transition-all hover:scale-110 ${
            currentTheme.name === theme.name ? 'border-primary scale-110' : 'border-border'
          }`}
          style={{ backgroundColor: theme.accent }}
          title={theme.name}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  );
};

export default ThemeSwitcher;
