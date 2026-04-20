import { Library } from "lucide-react";

interface Row {
  label: string;
  value: string | JSX.Element;
}

const stack: Row[] = [
  { label: "framework", value: "React 18 + TypeScript 5" },
  { label: "build", value: "Vite 5 (Rollup, SWC)" },
  { label: "styling", value: "Tailwind CSS + shadcn/ui primitives" },
  { label: "routing", value: "react-router-dom v6, URL-driven state" },
  { label: "state", value: "TanStack Query for async, local state otherwise" },
  { label: "fonts", value: "JetBrains Mono (editor chrome), system sans (body)" },
  { label: "deploy", value: "Vercel, preview on every PR" },
  { label: "source", value: "github.com/NiruddeshJatra/nasiful-coder-space" },
];

const inspirations: Row[] = [
  {
    label: "matrix rain",
    value:
      "Simon Whiteley's mirror-kana (Matrix 1999) — half-width katakana U+FF65–FF9F, mirrored glyphs, phosphor trail.",
  },
  {
    label: "/now page",
    value: "Derek Sivers's nownownow.com convention.",
  },
  {
    label: "digital garden",
    value: "Maggie Appleton's seedling / budding / evergreen taxonomy.",
  },
  {
    label: "living changelog",
    value: "Maggie Appleton, Gwern, Andy Matuschak — sites that admit they're in flux.",
  },
  {
    label: "editor shell",
    value: "VS Code's focus-mode, Cmd+P, and status bar — stolen wholesale.",
  },
  {
    label: "palette",
    value: "Matrix films' desaturated green, amber phosphor, cyan for interactive accents.",
  },
];

const Field = ({ label, value }: Row) => (
  <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-3">
    <span className="terminal-purple shrink-0 md:w-32">{label}:</span>
    <span className="text-foreground/90">{value}</span>
  </div>
);

const ColophonContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div className="flex items-center gap-2">
        <Library className="w-4 h-4 terminal-cyan" />
        <div>
          <span className="terminal-purple">const</span>{" "}
          <span className="terminal-cyan">colophon</span> ={" "}
          <span className="terminal-yellow">{"{"}</span>
        </div>
      </div>

      <div className="pl-4 space-y-6">
        <section className="space-y-2">
          <h2 className="terminal-cyan text-sm font-semibold">stack/</h2>
          <div className="space-y-1.5 text-xs pl-2">
            {stack.map((row) => (
              <Field key={row.label} {...row} />
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="terminal-cyan text-sm font-semibold">inspirations/</h2>
          <div className="space-y-2 text-xs pl-2">
            {inspirations.map((row) => (
              <Field key={row.label} {...row} />
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="terminal-cyan text-sm font-semibold">philosophy/</h2>
          <p className="text-xs text-foreground/90 pl-2">
            The editor isn&apos;t a costume — every affordance it implies should do real work.
            Terminal navigates. Status bar tracks path. Matrix reacts to typing.
            If it doesn&apos;t earn its place, it gets deleted.
          </p>
        </section>
      </div>

      <div>
        <span className="terminal-yellow">{"};"}</span>
      </div>
    </div>
  );
};

export default ColophonContent;
