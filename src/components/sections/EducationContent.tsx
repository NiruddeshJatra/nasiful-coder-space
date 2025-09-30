import { GraduationCap, Calendar, MapPin } from "lucide-react";

const EducationContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div className="space-y-2">
        <span className="terminal-green">/**</span>
      </div>
      <div className="pl-3 space-y-1 text-muted-foreground">
        <div><span className="terminal-green">*</span> Education Background</div>
        <div><span className="terminal-green">*</span> Academic qualifications and training</div>
        <div><span className="terminal-green">*</span> @author Nasiful Alam</div>
      </div>
      <div className="space-y-2">
        <span className="terminal-green">*/</span>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <div className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="w-5 h-5 terminal-cyan" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-base font-semibold terminal-cyan mb-1">
                  BSc in Computer Science
                </h3>
                <p className="terminal-purple text-xs">
                  Chittagong University of Engineering & Technology (CUET)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 text-muted-foreground text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 terminal-blue" />
                  <span>Feb 2017 - May 2022</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 terminal-green" />
                  <span>Chattogram, Bangladesh</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="terminal-green text-xs mb-2">// Academic Focus:</div>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-0.5 text-xs">▹</span>
                    <p className="text-foreground text-xs">Core Computer Science fundamentals</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-0.5 text-xs">▹</span>
                    <p className="text-foreground text-xs">Software Engineering principles</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-0.5 text-xs">▹</span>
                    <p className="text-foreground text-xs">Data Structures & Algorithms</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-0.5 text-xs">▹</span>
                    <p className="text-foreground text-xs">Database Management Systems</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-0.5 text-xs">▹</span>
                    <p className="text-foreground text-xs">Web Technologies & Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
        <div className="terminal-purple mb-2 text-xs">// Additional Training & Certifications</div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Continuously learning through hands-on projects, open-source contributions, 
          and staying updated with the latest technologies in cloud computing, 
          microservices architecture, and full-stack development.
        </p>
      </div>
    </div>
  );
};

export default EducationContent;
