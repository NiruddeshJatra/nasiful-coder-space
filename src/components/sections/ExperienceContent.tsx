import { Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Intellectify.io",
    period: "Aug 2025 - Present",
    location: "Remote",
    description: "Mentorship Platform",
    achievements: [
      "Developed platform features with Node.js, React, and JavaScript",
      "Implemented OAuth and admin authentication for secure role-based access",
      "Built a content management system with CKEditor for rich-text publishing",
      "Contributed to business management tool by adding reporting feature using Django, improving operational insights",
    ],
  },
  {
    title: "Lead Developer",
    company: "Bhara",
    period: "Jan 2025 - July 2025",
    location: "Remote",
    description: "Rental Marketplace Platform",
    achievements: [
      "Led end-to-end MVP development in 3 months, setting product vision and technical architecture",
      "Engineered microservices backend (Django REST) and React/TypeScript frontend with 80% test coverage",
      "Set up robust debugging protocols using logging and monitoring tools to detect issues early",
      "Built secure JWT auth with role-based access; improved API responsiveness via Redis and query optimization",
      "Designed AWS infrastructure (EC2, RDS, S3) to support horizontal scaling for future high-traffic demands",
      "Set up CI/CD pipelines and GitHub Actions for continuous delivery",
      "Defined product roadmap, collaborated with early users, and gathered actionable feedback",
    ],
  },
];

const ExperienceContent = () => {
  return (
    <div className="space-y-8 animate-fade-in font-mono">
      <div className="space-y-2">
        <span className="terminal-purple">interface</span>{" "}
        <span className="terminal-cyan">Experience</span>{" "}
        <span className="terminal-yellow">{"{"}</span>
      </div>

      <div className="pl-6 space-y-2 text-muted-foreground">
        <div><span className="terminal-blue">title:</span> string;</div>
        <div><span className="terminal-blue">company:</span> string;</div>
        <div><span className="terminal-blue">period:</span> string;</div>
        <div><span className="terminal-blue">achievements:</span> string[];</div>
      </div>

      <div className="space-y-2">
        <span className="terminal-yellow">{"}"}</span>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="terminal-green mb-6">// Professional Experience</div>
        
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="mb-8 p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold terminal-cyan">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span className="terminal-orange">{exp.company}</span>
                  <span className="text-xs terminal-purple">({exp.description})</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 terminal-blue" />
                  <span>{exp.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 terminal-green" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="terminal-green text-sm">// Key Achievements:</div>
              {exp.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="terminal-cyan mt-1.5">▹</span>
                  <p className="text-foreground">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceContent;
