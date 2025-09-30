import { Calendar, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  content: string;
}

// Add your blog posts here
const blogPosts: BlogPost[] = [
  {
    id: "getting-started-with-aws",
    title: "Getting Started with AWS: A Developer's Journey",
    date: "2025-01-15",
    readTime: "5 min read",
    content: `
## Introduction

Building scalable applications on AWS has been an incredible learning experience. 
In this post, I'll share my journey and key learnings.

### Key Takeaways

- **EC2 Instances**: Understanding instance types and pricing models
- **S3 Storage**: Best practices for object storage and CDN integration
- **RDS Databases**: Setting up managed PostgreSQL with automated backups
- **Security**: IAM roles, security groups, and VPC configuration

### Real-World Application

At Bhara, we designed our entire infrastructure on AWS, handling:
- 10,000+ concurrent users
- 99.9% uptime
- Automated CI/CD pipelines
- Cost optimization strategies

### Conclusion

AWS provides incredible tools for building scalable systems. Start small, 
experiment often, and always monitor your costs!
    `
  },
  {
    id: "microservices-architecture",
    title: "Building Microservices: Lessons from Production",
    date: "2025-01-10",
    readTime: "7 min read",
    content: `
## Why Microservices?

Transitioning from monolith to microservices taught me valuable lessons about 
system design and scalability.

### Architecture Decisions

\`\`\`typescript
// Service structure example
interface Service {
  name: string;
  port: number;
  database: string;
  dependencies: string[];
}
\`\`\`

### Challenges We Faced

1. **Service Communication**: Implementing reliable message queues
2. **Data Consistency**: Managing distributed transactions
3. **Testing**: Writing comprehensive integration tests
4. **Deployment**: Orchestrating multi-service deployments

### Tools & Technologies

- Docker for containerization
- GitHub Actions for CI/CD
- Redis for caching and queues
- PostgreSQL for data persistence

### Results

Achieved 80% test coverage and reduced deployment time by 65%.
    `
  },
  {
    id: "django-best-practices",
    title: "Django Best Practices for Production Apps",
    date: "2025-01-05",
    readTime: "6 min read",
    content: `
## Writing Production-Ready Django Code

After building several Django applications, here are my go-to best practices.

### Project Structure

\`\`\`
project/
├── apps/
│   ├── users/
│   ├── posts/
│   └── api/
├── config/
└── requirements/
\`\`\`

### Key Practices

- **Settings Management**: Separate dev, staging, and production configs
- **Database Optimization**: Use select_related and prefetch_related
- **Caching Strategy**: Redis for session storage and query caching
- **Security**: Always use environment variables for secrets

### Performance Tips

1. Database indexing on frequently queried fields
2. Implement pagination for large querysets
3. Use Celery for background tasks
4. Enable query logging in development

### Testing

Always write tests! Aim for 80%+ coverage on critical paths.
    `
  }
];

const BlogContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div className="space-y-2">
        <span className="terminal-purple">const</span>{" "}
        <span className="terminal-cyan">blogPosts</span> ={" "}
        <span className="terminal-yellow">{"["}</span>
      </div>

      <div className="space-y-8 pl-4">
        {blogPosts.map((post, index) => (
          <div key={post.id} className="border border-border rounded-lg p-4 bg-card/30 hover:bg-card/50 transition-colors">
            <div className="space-y-3">
              <h2 className="text-base font-semibold terminal-cyan">{post.title}</h2>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="prose prose-sm prose-invert max-w-none">
                <div className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <span className="terminal-yellow">{"]"}</span>;
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <div className="terminal-green text-xs">// Add your blog posts</div>
        <p className="text-xs text-muted-foreground mt-2">
          Edit <span className="terminal-orange">src/components/sections/BlogContent.tsx</span> to add more posts
        </p>
      </div>
    </div>
  );
};

export default BlogContent;
