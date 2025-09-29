import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";

interface TerminalProps {
  onCommand: (command: string) => void;
  currentSection: string;
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
  "contact",
  "clear",
  "github",
  "linkedin",
];

const Terminal = ({ onCommand, currentSection }: TerminalProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Nasiful Alam's Portfolio Terminal",
    "Type 'help' to see available commands",
    "",
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
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

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, `$ ${cmd}`];

    if (trimmedCmd === "help") {
      newHistory.push(
        "Available commands:",
        "  whoami           - Display information about me",
        "  ls               - List all sections",
        "  cat <file>       - Display content (about.txt, experience.txt, projects.txt, skills.json, education.txt)",
        "  contact          - Show contact information",
        "  github           - Open GitHub profile",
        "  linkedin         - Open LinkedIn profile",
        "  clear            - Clear terminal",
        ""
      );
    } else if (trimmedCmd === "whoami") {
      newHistory.push(
        "Nasiful Alam",
        "Startup founder & full-stack engineer",
        "Location: Chattogram, Bangladesh",
        "Building scalable systems on AWS",
        ""
      );
    } else if (trimmedCmd === "ls") {
      newHistory.push(
        "about.txt",
        "experience.txt",
        "projects.txt",
        "skills.json",
        "education.txt",
        "contact.md",
        ""
      );
    } else if (trimmedCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (trimmedCmd === "github") {
      newHistory.push("Opening GitHub profile...", "");
      window.open("https://github.com/nasifulalam", "_blank");
    } else if (trimmedCmd === "linkedin") {
      newHistory.push("Opening LinkedIn profile...", "");
      window.open("https://www.linkedin.com/in/nasiful-alam", "_blank");
    } else if (trimmedCmd.startsWith("cat ")) {
      const file = trimmedCmd.substring(4).trim();
      if (file === "about.txt") {
        onCommand("about");
        newHistory.push("Loading about.txt...", "");
      } else if (file === "experience.txt") {
        onCommand("experience");
        newHistory.push("Loading experience.txt...", "");
      } else if (file === "projects.txt") {
        onCommand("projects");
        newHistory.push("Loading projects.txt...", "");
      } else if (file === "skills.json") {
        onCommand("skills");
        newHistory.push("Loading skills.json...", "");
      } else if (file === "education.txt") {
        onCommand("education");
        newHistory.push("Loading education.txt...", "");
      } else {
        newHistory.push(`cat: ${file}: No such file or directory`, "");
      }
    } else if (trimmedCmd === "contact") {
      onCommand("contact");
      newHistory.push("Loading contact information...", "");
    } else if (trimmedCmd !== "") {
      newHistory.push(`Command not found: ${trimmedCmd}`, "Type 'help' for available commands", "");
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

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/50">
        <TerminalIcon className="w-4 h-4 terminal-cyan" />
        <span className="text-sm font-medium">terminal</span>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 text-sm"
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap font-mono">
            {line.startsWith("$") ? (
              <span className="terminal-green">{line}</span>
            ) : line.includes("Loading") || line.includes("Opening") ? (
              <span className="terminal-cyan">{line}</span>
            ) : line.includes("not found") || line.includes("No such") ? (
              <span className="terminal-orange">{line}</span>
            ) : (
              <span className="text-foreground">{line}</span>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2 mt-2">
          <ChevronRight className="w-4 h-4 terminal-green flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-foreground font-mono"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="cursor-blink terminal-cyan">▋</span>
        </div>

        {suggestions.length > 0 && input && (
          <div className="mt-2 pl-6 text-muted-foreground text-xs">
            <span className="terminal-blue">Suggestions:</span> {suggestions.join(", ")}
          </div>
        )}
      </div>

      <div className="px-4 py-2 border-t border-border bg-muted/50 text-xs text-muted-foreground">
        <span className="terminal-purple">Tip:</span> Use Tab for autocomplete, ↑↓ for history
      </div>
    </div>
  );
};

export default Terminal;
