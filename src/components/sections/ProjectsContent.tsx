import { ExternalLink, Github, Code2, TrendingUp } from "lucide-react";

const projects = [
  {
    title: "BlogSpot",
    description: "Full-Stack Blogging Platform",
    achievements: [
      "Developed real-time comment system and notification engine, boosting engagement by 40%",
      "Streamlined content workflow with author dashboards, reducing approval time by 65%",
      "Optimized for mobile with 2.5x faster page loads through responsive design and efficient queries",
    ],
    technologies: ["Django", "PostgreSQL", "AWS S3"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Board Exam Ranking Website",
    description: "Educational Data Analytics Platform",
    achievements: [
      "Automated scraping of 50,000+ student records using Selenium and BeautifulSoup",
      "Architected scalable database supporting 3 academic tracks, reducing page load times from 4.2s to 0.8s",
      "Implemented comprehensive search and filtering system handling 100+ concurrent queries",
    ],
    technologies: ["Django", "Selenium", "BeautifulSoup", "MySQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const ProjectsContent = () => {
  return (
    <div className="space-y-8 animate-fade-in font-mono">
      <div className="space-y-2">
        <span className="terminal-purple">class</span>{" "}
        <span className="terminal-cyan">Project</span>{" "}
        <span className="terminal-yellow">{"{"}</span>
      </div>

      <div className="pl-6 space-y-2 text-muted-foreground">
        <div>
          <span className="terminal-purple">constructor</span>
          <span className="terminal-yellow">(</span>
        </div>
        <div className="pl-6">
          <span className="terminal-blue">public</span> title: string,
        </div>
        <div className="pl-6">
          <span className="terminal-blue">public</span> description: string,
        </div>
        <div className="pl-6">
          <span className="terminal-blue">public</span> technologies: string[],
        </div>
        <div className="pl-6">
          <span className="terminal-blue">public</span> achievements: string[]
        </div>
        <div>
          <span className="terminal-yellow">)</span> {"{"}
          {"}"}
        </div>
      </div>

      <div className="space-y-2">
        <span className="terminal-yellow">{"}"}</span>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="terminal-green mb-6">// Featured Projects</div>

        {projects.map((project, index) => (
          <div
            key={index}
            className="mb-8 p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 terminal-cyan" />
                  <h3 className="text-2xl font-semibold terminal-cyan">
                    {project.title}
                  </h3>
                </div>
                <p className="text-muted-foreground terminal-purple">
                  // {project.description}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors group"
                >
                  <ExternalLink className="w-5 h-5 terminal-blue group-hover:terminal-cyan" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors group"
                >
                  <Github className="w-5 h-5 terminal-blue group-hover:terminal-cyan" />
                </a>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="terminal-green text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Key Achievements:
                </div>
                {project.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="terminal-cyan mt-1.5">▹</span>
                    <p className="text-foreground">{achievement}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="terminal-purple text-sm mb-2">// Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
