import { useState } from "react";
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
    technologies: ["Django", "PostgreSQL", "AWS S3", "Redis", "WebSockets"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Board Exam Ranking Website",
    description: "Educational Data Analytics Platform",
    achievements: [
      "Automated scraping of 50,000+ student records using Selenium and BeautifulSoup",
      "Architected scalable database supporting 3 academic tracks, reducing page load times from 4.2s to 0.8s",
      "Implemented comprehensive search and filtering system handling 100+ concurrent queries",
    ],
    technologies: ["Django", "Selenium", "BeautifulSoup", "MySQL", "Celery"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Bhara Marketplace",
    description: "Rental Platform MVP",
    achievements: [
      "Led end-to-end MVP development in 3 months with complete product vision",
      "Engineered microservices backend with 80% test coverage",
      "Designed AWS infrastructure for horizontal scaling and high-traffic demands",
    ],
    technologies: ["React", "TypeScript", "Django REST", "PostgreSQL", "AWS", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mb-6 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitch Effect Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none z-0" />
      )}

      {/* Project Preview/Thumbnail */}
      <div className="mb-4 h-48 bg-muted rounded-lg overflow-hidden relative">
        {/* Gradient Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="border border-primary/20 group-hover:border-primary/40 transition-all"
                style={{
                  transitionDelay: `${i * 10}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Project Initials */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">
          {project.title.split(' ').map(w => w[0]).join('')}
        </div>

        {/* Hover Overlay with Buttons */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4 animate-fade-in z-10">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/80 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 terminal-cyan" />
              <h3 className="text-base font-semibold terminal-cyan">
                {project.title}
              </h3>
            </div>
            <p className="text-muted-foreground terminal-purple text-xs">
              // {project.description}
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-3">
          <div className="space-y-1.5">
            <div className="terminal-green text-xs flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" />
              Key Achievements:
            </div>
            {project.achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="terminal-cyan mt-0.5 text-xs">▹</span>
                <p className="text-foreground text-xs leading-relaxed">{achievement}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border">
            <div className="terminal-purple text-xs mb-2">// Technologies:</div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div className="terminal-green mb-4 text-xs">// Featured Projects</div>

      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default ProjectsContent;
