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
    <div className="space-y-8 animate-fade-in font-mono">
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

      <div className="mt-8 border-t border-border pt-6">
        <div className="terminal-green mb-6">// Technical Skills</div>

        <div className="space-y-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 terminal-cyan" />
                  <h3 className="text-lg font-semibold terminal-purple">
                    {category.category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm terminal-blue">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-terminal-cyan transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="terminal-green mb-4">// Export</div>
        <div className="space-y-2">
          <div>
            <span className="terminal-purple">export default</span>{" "}
            <span className="terminal-yellow">{"{"}</span>
          </div>
          <div className="pl-6">
            <span className="terminal-blue">languages:</span> [
            <span className="terminal-orange">"Python"</span>,{" "}
            <span className="terminal-orange">"TypeScript"</span>,{" "}
            <span className="terminal-orange">"JavaScript"</span>
            ],
          </div>
          <div className="pl-6">
            <span className="terminal-blue">frameworks:</span> [
            <span className="terminal-orange">"Django"</span>,{" "}
            <span className="terminal-orange">"React"</span>,{" "}
            <span className="terminal-orange">"Node.js"</span>
            ],
          </div>
          <div className="pl-6">
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
