import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent! ✓",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "nasifulalam1212@gmail.com",
      link: "mailto:nasifulalam1212@gmail.com",
      color: "terminal-cyan",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+8801626-181662",
      link: "tel:+8801626181662",
      color: "terminal-green",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chattogram, Bangladesh",
      link: null,
      color: "terminal-orange",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/nasifulalam",
      link: "https://github.com/nasifulalam",
      color: "terminal-purple",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/nasiful-alam",
      link: "https://www.linkedin.com/in/nasiful-alam",
      color: "terminal-blue",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in font-mono">
      <div className="space-y-2">
        <span className="terminal-purple">function</span>{" "}
        <span className="terminal-cyan">sendMessage</span>
        <span className="terminal-yellow">(</span>
      </div>

      <div className="pl-6 space-y-2 text-muted-foreground">
        <div>
          <span className="terminal-blue">name:</span> string,
        </div>
        <div>
          <span className="terminal-blue">email:</span> string,
        </div>
        <div>
          <span className="terminal-blue">message:</span> string
        </div>
      </div>

      <div className="space-y-2">
        <span className="terminal-yellow">)</span> {"{"}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="terminal-green mb-6">// Let's Connect!</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="terminal-purple mb-4">// Contact Information</div>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <div className="p-2 bg-muted rounded-lg">
                    <Icon className={`w-5 h-5 ${info.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">
                      {info.label}
                    </div>
                    {info.link ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-foreground">{info.value}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <div className="terminal-purple mb-4">// Send a Message</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm terminal-blue block mb-2">
                  name:
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  required
                  className="bg-muted border-border"
                />
              </div>

              <div>
                <label className="text-sm terminal-blue block mb-2">
                  email:
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                  required
                  className="bg-muted border-border"
                />
              </div>

              <div>
                <label className="text-sm terminal-blue block mb-2">
                  message:
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Your message here..."
                  required
                  rows={5}
                  className="bg-muted border-border resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-border pt-6">
        <span className="terminal-yellow">{"}"}</span>
      </div>

      <div className="mt-4 p-4 bg-muted/30 border border-border rounded-lg">
        <div className="terminal-green mb-2">// Quick Response</div>
        <p className="text-muted-foreground text-sm">
          I typically respond within 24-48 hours. For urgent matters, feel free 
          to reach out directly via email or phone.
        </p>
      </div>
    </div>
  );
};

export default ContactContent;
