const AboutContent = () => {
  return (
    <div className="animate-fade-in font-mono text-sm leading-relaxed max-w-2xl mx-auto px-4 py-6">

      <div className="text-muted-foreground space-y-0.5 mb-6 text-xs">
        <div><span className="terminal-green">/**</span></div>
        <div className="pl-3"><span className="terminal-green"> * about.md — nasiful alam</span></div>
        <div className="pl-3"><span className="terminal-green"> * builds systems. writes. makes 2d games.</span></div>
        <div className="pl-3"><span className="terminal-green"> * Chattogram, Bangladesh</span></div>
        <div><span className="terminal-green"> */</span></div>
      </div>

      <div className="mb-1">
        <span className="terminal-purple">const </span>
        <span className="terminal-cyan">me</span>
        <span className="text-foreground"> = </span>
        <span className="terminal-yellow">{"{"}</span>
      </div>

      <div className="pl-6 space-y-5">

        <div className="space-y-1">
          <div className="terminal-green text-xs">// who</div>
          <div>
            <span className="terminal-blue">name</span>
            <span className="text-muted-foreground">: </span>
            <span className="terminal-orange">"Nasiful Alam"</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div>
            <span className="terminal-blue">based_in</span>
            <span className="text-muted-foreground">: </span>
            <span className="terminal-orange">"Chattogram, Bangladesh"</span>
            <span className="text-muted-foreground">,</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="terminal-green text-xs">// what I do</div>
          <div>
            <span className="terminal-blue">engineer</span>
            <span className="text-muted-foreground">: </span>
            <span className="terminal-orange">"full-stack — Django, MERN, AWS"</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div>
            <span className="terminal-blue">also</span>
            <span className="text-muted-foreground">: [</span>
            <span className="terminal-orange">"write"</span>
            <span className="text-muted-foreground">, </span>
            <span className="terminal-orange">"make 2d arcade games"</span>
            <span className="text-muted-foreground">],</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="terminal-green text-xs">// now</div>
          <div>
            <span className="terminal-blue">building</span>
            <span className="text-muted-foreground">: </span>
            <span className="terminal-orange">"Intellectify.io"</span>
            <span className="text-muted-foreground">, </span>
            <span className="terminal-green text-xs">// mentorship platform</span>
          </div>
          <div>
            <span className="terminal-blue">deep_in</span>
            <span className="text-muted-foreground">: </span>
            <span className="terminal-orange">"AWS infrastructure, microservices"</span>
            <span className="text-muted-foreground">,</span>
          </div>
        </div>

      </div>

      <div className="mt-1">
        <span className="terminal-yellow">{"}"}</span>
        <span className="text-muted-foreground">;</span>
      </div>

      <div className="mt-6 text-xs">
        <span className="terminal-purple">export default </span>
        <span className="terminal-cyan">me</span>
        <span className="text-muted-foreground">;</span>
      </div>

      <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground">
        <span className="terminal-green">// </span>
        email and contact info →{" "}
        <span className="terminal-cyan">contact.md</span>
      </div>

    </div>
  );
};

export default AboutContent;
