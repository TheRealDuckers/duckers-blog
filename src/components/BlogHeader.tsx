import { Link } from "react-router-dom";

const BlogHeader = () => (
  <header className="border-b border-border">
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link to="/" className="block group">
        <h1 className="font-display text-4xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors">
          Duckers Blog
        </h1>
        <p className="mt-1 text-muted-foreground font-body text-sm tracking-wide uppercase">
          Thoughts & musings
        </p>
      </Link>
    </div>
  </header>
);

export default BlogHeader;
