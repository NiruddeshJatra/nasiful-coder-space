import { GraduationCap, Calendar, MapPin } from "lucide-react";

const EducationContent = () => {
  return (
    <div className="space-y-8 animate-fade-in font-mono">
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

      <div className="mt-8 border-t border-border pt-6">
        <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <GraduationCap className="w-8 h-8 terminal-cyan" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-semibold terminal-cyan mb-2">
                  BSc in Computer Science
                </h3>
                <p className="terminal-purple text-lg">
                  Chittagong University of Engineering & Technology (CUET)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 terminal-blue" />
                  <span>Feb 2017 - May 2022</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 terminal-green" />
                  <span>Chattogram, Bangladesh</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="terminal-green text-sm mb-3">// Academic Focus:</div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-1.5">▹</span>
                    <p className="text-foreground">Core Computer Science fundamentals</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-1.5">▹</span>
                    <p className="text-foreground">Software Engineering principles</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-1.5">▹</span>
                    <p className="text-foreground">Data Structures & Algorithms</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-1.5">▹</span>
                    <p className="text-foreground">Database Management Systems</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="terminal-cyan mt-1.5">▹</span>
                    <p className="text-foreground">Web Technologies & Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-muted/30 border border-border rounded-lg">
        <div className="terminal-purple mb-3">// Additional Training & Certifications</div>
        <p className="text-muted-foreground">
          Continuously learning through hands-on projects, open-source contributions, 
          and staying updated with the latest technologies in cloud computing, 
          microservices architecture, and full-stack development.
        </p>
      </div>
    </div>
  );
};

export default EducationContent;
