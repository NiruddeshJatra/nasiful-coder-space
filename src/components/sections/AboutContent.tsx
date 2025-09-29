const AboutContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono">
      <div className="space-y-2">
        <span className="terminal-purple">const</span>{" "}
        <span className="terminal-cyan">developer</span> ={" "}
        <span className="terminal-yellow">{"{"}</span>
      </div>
      
      <div className="pl-6 space-y-2">
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

      <div className="mt-8 space-y-4 border-t border-border pt-6">
        <div className="terminal-green">// Summary</div>
        <p className="text-foreground leading-relaxed">
          Startup founder and full-stack engineer with deep experience building 
          production-grade web platforms on AWS. Proven track record in delivering 
          scalable MVPs, implementing cloud infrastructure, optimizing performance, 
          and leading product vision.
        </p>
      </div>

      <div className="mt-8 space-y-4 border-t border-border pt-6">
        <div className="terminal-green">// What I'm Looking For</div>
        <p className="text-foreground leading-relaxed">
          Seeking software engineer roles focused on:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
          <li>Scalable systems architecture</li>
          <li>Clean code and best practices</li>
          <li>Developer experience optimization</li>
          <li>High-impact product development</li>
        </ul>
      </div>

      <div className="mt-8 space-y-4 border-t border-border pt-6">
        <div className="terminal-green">// Current Focus</div>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="terminal-cyan">▹</span>
            <p className="text-foreground">Building mentorship platforms at Intellectify.io</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="terminal-cyan">▹</span>
            <p className="text-foreground">Developing scalable cloud infrastructure on AWS</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="terminal-cyan">▹</span>
            <p className="text-foreground">Implementing microservices architecture</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="terminal-cyan">▹</span>
            <p className="text-foreground">Optimizing full-stack application performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
