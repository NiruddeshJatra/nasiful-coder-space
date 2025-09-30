import profilePhoto from "@/assets/profile.jpg";

const AboutContent = () => {
  return (
    <div className="space-y-4 animate-fade-in font-mono text-sm">
      <div className="space-y-2">
        <span className="terminal-purple">const</span>{" "}
        <span className="terminal-cyan">developer</span> ={" "}
        <span className="terminal-yellow">{"{"}</span>
      </div>
      
      <div className="pl-6 space-y-1.5">
        <div className="flex items-center gap-4 mb-3">
          <img src={profilePhoto} alt="Nasiful Alam" className="w-16 h-16 rounded-full border-2 border-primary" />
          <div>
            <div className="terminal-cyan text-base font-semibold">Nasiful Alam</div>
            <div className="text-muted-foreground text-xs">Software Engineer</div>
          </div>
        </div>
        <div>
          <span className="terminal-blue">name:</span>{" "}
          <span className="terminal-orange">"Nasiful Alam"</span>,
        </div>
        <div>
          <span className="terminal-blue">role:</span>{" "}
          <span className="terminal-orange">"Startup Founder & Full-Stack Engineer"</span>,
        </div>
        <div>
          <span className="terminal-blue">location:</span>{" "}
          <span className="terminal-orange">"Chattogram, Bangladesh"</span>,
        </div>
        <div>
          <span className="terminal-blue">email:</span>{" "}
          <span className="terminal-orange">"nasifulalam1212@gmail.com"</span>,
        </div>
        <div>
          <span className="terminal-blue">phone:</span>{" "}
          <span className="terminal-orange">"+8801626-181662"</span>,
        </div>
      </div>
      
      <div className="space-y-2">
        <span className="terminal-yellow">{"}"}</span>;
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-4">
        <div className="terminal-green text-xs">// Summary</div>
        <p className="text-foreground leading-relaxed text-xs">
          Startup founder and full-stack engineer with deep experience building 
          production-grade web platforms on AWS. Proven track record in delivering 
          scalable MVPs, implementing cloud infrastructure, optimizing performance, 
          and leading product vision.
        </p>
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-4">
        <div className="terminal-green text-xs">// What I'm Looking For</div>
        <p className="text-foreground leading-relaxed text-xs">
          Seeking software engineer roles focused on:
        </p>
        <ul className="list-disc list-inside space-y-0.5 text-muted-foreground ml-4 text-xs">
          <li>Scalable systems architecture</li>
          <li>Clean code and best practices</li>
          <li>Developer experience optimization</li>
          <li>High-impact product development</li>
        </ul>
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-4">
        <div className="terminal-green text-xs">// Current Focus</div>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="terminal-cyan">▹</span>
            <p className="text-foreground text-xs">Building mentorship platforms at Intellectify.io</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="terminal-cyan">▹</span>
            <p className="text-foreground text-xs">Developing scalable cloud infrastructure on AWS</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="terminal-cyan">▹</span>
            <p className="text-foreground text-xs">Implementing microservices architecture</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="terminal-cyan">▹</span>
            <p className="text-foreground text-xs">Optimizing full-stack application performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
