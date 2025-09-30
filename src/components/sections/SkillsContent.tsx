import { Code, Cloud, Database, Wrench } from "lucide-react";
import { FaPython, FaJs, FaNodeJs, FaReact, FaHtml5, FaCss3Alt, FaDocker, FaAws, FaGithub } from "react-icons/fa";
import { SiTypescript, SiDjango, SiExpress, SiPostgresql, SiMysql, SiMongodb, SiSqlite, SiGit, SiSelenium, SiRedis } from "react-icons/si";
import { DiPython } from "react-icons/di";

const skillIcons: { [key: string]: JSX.Element } = {
  'Python': <FaPython className="text-blue-400" />,
  'TypeScript': <SiTypescript className="text-blue-600" />,
  'JavaScript': <FaJs className="text-yellow-400" />,
  'Django': <SiDjango className="text-emerald-700" />,
  'Node.js': <FaNodeJs className="text-green-500" />,
  'Express.js': <SiExpress className="text-gray-200" />,
  'React': <FaReact className="text-cyan-400" />,
  'HTML': <FaHtml5 className="text-orange-500" />,
  'CSS': <FaCss3Alt className="text-blue-500" />,
  'SQL': <span className="text-pink-400">SQL</span>,
  'C': <span className="text-blue-300">C</span>,
  'AWS EC2': <FaAws className="text-orange-500" />,
  'AWS S3': <FaAws className="text-orange-500" />,
  'AWS RDS': <FaAws className="text-orange-500" />,
  'Docker': <FaDocker className="text-blue-400" />,
  'Redis': <SiRedis className="text-red-500" />,
  'GitHub Actions': <FaGithub className="text-purple-400" />,
  'PostgreSQL': <SiPostgresql className="text-blue-600" />,
  'MySQL': <SiMysql className="text-blue-500" />,
  'MongoDB': <SiMongodb className="text-green-500" />,
  'SQLite': <SiSqlite className="text-blue-400" />,
  'Git': <SiGit className="text-orange-600" />,
  'BeautifulSoup': <DiPython className="text-blue-400" />,
  'Selenium': <SiSelenium className="text-green-500" />
};

const skillCategories = [
  {
    category: "Languages & Frameworks",
    icon: Code,
    skills: ["Python", "TypeScript", "JavaScript", "Django", "Node.js", "Express.js", "React", "HTML", "CSS", "SQL", "C"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS EC2", "AWS S3", "AWS RDS", "Docker", "Redis", "GitHub Actions"],
  },
  {
    category: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["Git", "BeautifulSoup", "Selenium"],
  },
];

const SkillsContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
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

              <div className="flex flex-wrap gap-3 pl-6">
                {category.skills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="px-3 py-2 bg-muted/10 hover:bg-muted/30 border border-border rounded-md text-xs text-foreground/90 hover:text-foreground transition-all flex flex-col items-center justify-center gap-1.5 w-24 h-24 group"
                    title={skill}
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      {skillIcons[skill] || skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </div>
                    <span className="text-center text-xs font-medium mt-1">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
