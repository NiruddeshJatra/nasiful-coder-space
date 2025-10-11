import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ChevronRight, GitBranch, Activity, Coffee, Zap, Clock } from "lucide-react";

interface TerminalProps {
  onCommand: (command: string) => void;
  currentSection: string;
  onThemeChange?: (theme: { name: string; bg: string; accent: string }) => void;
}

const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cat about.txt",
  "cat experience.txt",
  "cat projects.txt",
  "cat skills.json",
  "cat education.txt",
  "cat blog.md",
  "contact",
  "clear",
  "github",
  "linkedin",
  "secrets",
  "theme matrix",
];

const EASTER_EGGS: { [key: string]: string[] } = {
  'sudo make coffee': [
    '☕ Brewing coffee...',
    '▓▓▓▓▓▓▓▓▓▓ 100%',
    '☕ Coffee ready! But I\'m a terminal, I can\'t drink it 😢',
    ''
  ],
  'hack nasa': [
    '🚀 Accessing NASA mainframe...',
    '🔒 Access denied!',
    'Nice try though 😄',
    ''
  ],
  'sl': [
    '🚂💨💨💨 (The train is running because you typed sl instead of ls)',
    ''
  ],
  'vim': [
    'Starting Vim...',
    'Just kidding! This isn\'t Vim. Use Ctrl+C to exit... oh wait 😅',
    ''
  ],
  'rm -rf /': [
    '😱 WHOA THERE!',
    'That\'s not happening in my terminal!',
    '✅ Crisis averted.',
    ''
  ],
  'order pizza': [
    '🍕 Ordering pizza...',
    'Your pizza will arrive in 30 minutes!',
    'Just kidding, you have to order it yourself 😋',
    ''
  ],
  'matrix': [
    'Entering the Matrix...',
    '01001000 01100101 01101100 01101100 01101111',
    'Welcome to the real world, Neo.',
    ''
  ],
  'sudo apt-get install girlfriend': [
    '💝 Searching repositories...',
    'E: Package \'girlfriend\' has no installation candidate',
    'Try: sudo apt-get install cats',
    ''
  ],
  'cowsay': [
    ' ___________________',
    '< Moo! I\'m a cow! >',
    ' -------------------',
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||',
    ''
  ],
};

const Terminal = ({ onCommand, currentSection, onThemeChange }: TerminalProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Nasiful Alam's Portfolio Terminal v2.0 🚀",
    "Type 'help' to see available commands",
    "Try 'secrets' to discover easter eggs 🥚",
    "",
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [time, setTime] = useState(new Date());
  const [coffeeCount, setCoffeeCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (input) {
      const filtered = COMMANDS.filter((cmd) =>
        cmd.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  // Stats Dashboard timers
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const coffeeTimer = setInterval(() => {
      setCoffeeCount(prev => (prev + 1) % 10);
    }, 5000);
    
    return () => {
      clearInterval(timer);
      clearInterval(coffeeTimer);
    };
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, `$ ${cmd}`];

    // Check for easter eggs first
    if (EASTER_EGGS[trimmedCmd]) {
      newHistory.push(...EASTER_EGGS[trimmedCmd]);
    } else if (trimmedCmd === "secrets" || trimmedCmd === "easter eggs") {
      newHistory.push(
        "🥚 Easter Eggs Available:",
        "  sudo make coffee           - Brew some virtual coffee",
        "  hack nasa                  - Try to hack NASA",
        "  sl                         - A classic Unix typo",
        "  vim                        - Enter Vim (not really)",
        "  rm -rf /                   - DON'T try this at home",
        "  order pizza                - Order pizza",
        "  matrix                     - Enter the Matrix",
        "  sudo apt-get install girlfriend - Install girlfriend",
        "  cowsay                     - Cow wisdom",
        ""
      );
    } else if (trimmedCmd === "help") {
      newHistory.push(
        "Available commands:",
        "  whoami           - Display information about me",
        "  ls               - List all sections",
        "  cat <file>       - Display content (about.txt, experience.txt, projects.txt, skills.json, education.txt, blog.md)",
        "  contact          - Show contact information",
        "  github           - Open GitHub profile",
        "  linkedin         - Open LinkedIn profile",
        "  theme matrix     - Change to matrix theme",
        "  secrets          - Show easter eggs 🥚",
        "  clear            - Clear terminal",
        ""
      );
    } else if (trimmedCmd === "whoami") {
      newHistory.push(
        "Nasiful Alam",
        "Startup founder & full-stack engineer",
        "Location: Chattogram, Bangladesh",
        "Building scalable systems on AWS",
        "Email: nasifulalam1212@gmail.com",
        ""
      );
    } else if (trimmedCmd === "ls") {
      newHistory.push(
        "about.txt",
        "experience.txt",
        "projects.txt",
        "skills.json",
        "education.txt",
        "blog.md",
        "contact.md",
        ""
      );
    } else if (trimmedCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (trimmedCmd === "github") {
      newHistory.push("Opening GitHub profile...", "");
      window.open("https://github.com/niruddeshjatra", "_blank");
    } else if (trimmedCmd === "linkedin") {
      newHistory.push("Opening LinkedIn profile...", "");
      window.open("https://www.linkedin.com/in/nasiful-alam", "_blank");
    } else if (trimmedCmd.startsWith("theme ")) {
      const themeName = trimmedCmd.substring(6).trim();
      const matrixTheme = { name: 'matrix', bg: '#0d0d0d', accent: '#00ff00' };
      
      if (themeName === 'matrix' && onThemeChange) {
        onThemeChange(matrixTheme);
        newHistory.push(`✨ Theme changed to ${themeName}`, "");
      } else {
        newHistory.push(`❌ Unknown theme: ${themeName}`, "Available: matrix", "");
      }
    } else if (trimmedCmd.startsWith("cat ")) {
      const file = trimmedCmd.substring(4).trim();
      if (file === "about.txt") {
        onCommand("about");
        newHistory.push("📄 Loading about.txt...", "");
      } else if (file === "experience.txt") {
        onCommand("experience");
        newHistory.push("📄 Loading experience.txt...", "");
      } else if (file === "projects.txt") {
        onCommand("projects");
        newHistory.push("📄 Loading projects.txt...", "");
      } else if (file === "skills.json") {
        onCommand("skills");
        newHistory.push("📄 Loading skills.json...", "");
      } else if (file === "education.txt") {
        onCommand("education");
        newHistory.push("📄 Loading education.txt...", "");
      } else if (file === "blog.md") {
        onCommand("blog");
        newHistory.push("📄 Loading blog.md...", "");
      } else {
        newHistory.push(`❌ cat: ${file}: No such file or directory`, "");
      }
    } else if (trimmedCmd === "contact") {
      onCommand("contact");
      newHistory.push("📧 Loading contact information...", "");
    } else if (trimmedCmd !== "") {
      newHistory.push(`❌ Command not found: ${trimmedCmd}`, "Type 'help' for available commands", "");
    }

    setHistory(newHistory);
    setCommandHistory([...commandHistory, cmd]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
      }
    }
  };

  const stats = [
    { icon: GitBranch, label: 'Branch', value: 'main', color: 'terminal-cyan' },
    { icon: Activity, label: 'Lines', value: '10,000+', color: 'text-muted-foreground' },
    { icon: Coffee, label: 'Coffee', value: String(coffeeCount + 5), color: 'text-muted-foreground' },
    { icon: Zap, label: 'Bugs Fixed', value: '999', color: 'text-muted-foreground' },
  ];

  return (
    <div className="h-full flex flex-col bg-black/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-black/80">
        <TerminalIcon className="w-4 h-4 terminal-cyan" />
        <span className="text-xs font-semibold uppercase tracking-wide">Terminal</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-muted-foreground">bash</span>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 text-sm custom-scrollbar"
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap font-mono animate-fade-in">
            {line.startsWith("$") ? (
              <span className="terminal-green font-semibold">{line}</span>
            ) : line.includes("Loading") || line.includes("Opening") || line.includes("☕") || line.includes("🚀") || line.includes("🍕") ? (
              <span className="terminal-cyan">{line}</span>
            ) : line.includes("not found") || line.includes("No such") || line.includes("❌") ? (
              <span className="terminal-orange">{line}</span>
            ) : line.includes("✨") || line.includes("✅") ? (
              <span className="terminal-green">{line}</span>
            ) : (
              <span className="text-gray-300">{line}</span>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2 mt-2">
          <ChevronRight className="w-4 h-4 terminal-green flex-shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-gray-100 font-mono placeholder:text-gray-600"
            placeholder="Type 'help' for commands..."
            autoFocus
          />
          <span className="cursor-blink terminal-cyan font-bold">▋</span>
        </div>

        {suggestions.length > 0 && input && (
          <div className="mt-2 pl-6 text-muted-foreground text-xs animate-slide-in">
            <span className="terminal-blue font-semibold">→</span> {suggestions.join(", ")}
          </div>
        )}
      </div>

      {/* Merged Stats Dashboard + Tips */}
      <div className="px-4 py-1 border-t border-border bg-black/80 backdrop-blur-sm">
        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 terminal-cyan">
              <Clock className="w-3 h-3" />
              <span>{time.toLocaleTimeString()}</span>
            </div>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className={`flex items-center gap-1.5 ${stat.color}`}>
                  <Icon className="w-3 h-3" />
                  <span>{stat.label}: {stat.value}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <span className="terminal-purple">💡 Tip:</span>
            <span>Tab for autocomplete • ↑↓ for history • Try 'secrets' for fun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
