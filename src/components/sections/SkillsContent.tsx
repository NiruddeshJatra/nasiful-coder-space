import { Code, Cloud, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    category: "Languages & Frameworks",
    icon: Code,
    skills: [
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Django", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "React", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "SQL", level: 85 },
      { name: "C", level: 70 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS EC2", level: 85 },
      { name: "AWS S3", level: 90 },
      { name: "AWS RDS", level: 85 },
      { name: "Docker", level: 80 },
      { name: "Redis", level: 85 },
      { name: "GitHub Actions", level: 80 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQLite", level: 85 },
    ],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git", level: 95 },
      { name: "BeautifulSoup", level: 85 },
      { name: "Selenium", level: 80 },
    ],
  },
];

const SkillsContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div className="space-y-2">
        <span className="terminal-yellow">{"{"}</span>
      </div>

      <div className="pl-6 space-y-3">
        <div>
          <span className="terminal-blue">"name":</span>{" "}
          <span className="terminal-orange">"Nasiful Alam"</span>,
        </div>
        <div>
          <span className="terminal-blue">"version":</span>{" "}
          <span className="terminal-orange">"3.0.0"</span>,
        </div>
        <div>
          <span className="terminal-blue">"description":</span>{" "}
          <span className="terminal-orange">"Full-stack engineer specializing in scalable systems"</span>,
        </div>
      </div>

      <div className="space-y-2">
        <span className="terminal-yellow">{"}"}</span>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <div className="terminal-green mb-4 text-xs">// Technical Skills</div>

        <div className="space-y-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 terminal-cyan" />
                  <h3 className="text-sm font-semibold terminal-purple">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pl-6">
                  {category.skills.map((skill, idx) => (
                    <div 
                      key={idx} 
                      className="px-2.5 py-1 bg-muted/30 border border-border rounded text-xs terminal-blue hover:bg-muted/50 transition-colors flex items-center gap-1.5"
                    >
                      <Icon className="w-3 h-3 terminal-cyan" />
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <div className="terminal-green mb-3 text-xs">// Export</div>
        <div className="space-y-1.5 text-xs">
          <div>
            <span className="terminal-purple">export default</span>{" "}
            <span className="terminal-yellow">{"{"}</span>
          </div>
          <div className="pl-4">
            <span className="terminal-blue">languages:</span> [
            <span className="terminal-orange">"Python"</span>,{" "}
            <span className="terminal-orange">"TypeScript"</span>,{" "}
            <span className="terminal-orange">"JavaScript"</span>
            ],
          </div>
          <div className="pl-4">
            <span className="terminal-blue">frameworks:</span> [
            <span className="terminal-orange">"Django"</span>,{" "}
            <span className="terminal-orange">"React"</span>,{" "}
            <span className="terminal-orange">"Node.js"</span>
            ],
          </div>
          <div className="pl-4">
            <span className="terminal-blue">cloud:</span> [
            <span className="terminal-orange">"AWS"</span>,{" "}
            <span className="terminal-orange">"Docker"</span>,{" "}
            <span className="terminal-orange">"Redis"</span>
            ],
          </div>
          <div>
            <span className="terminal-yellow">{"}"}</span>;
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsContent;
