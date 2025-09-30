import { Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Intellectify.io",
    period: "Aug 2025 - Present",
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
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div className="terminal-green mb-4 text-xs">// Professional Experience</div>
      
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="mb-6 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold terminal-cyan">
                {exp.title}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Building2 className="w-3 h-3" />
                <span className="terminal-orange">{exp.company}</span>
                <span className="terminal-purple">({exp.description})</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 terminal-blue" />
                <span>{exp.period}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 mt-3">
            <div className="terminal-green text-xs">// Key Achievements:</div>
            {exp.achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="terminal-cyan mt-0.5 text-xs">▹</span>
                <p className="text-foreground text-xs leading-relaxed">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceContent;
