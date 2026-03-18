import { Link } from "react-router-dom";

const BlogHeader = () => (
  <header className="border-b border-border">
    <div className="max-w-2xl mx-auto px-6 py-8 flex items-center justify-between">
      <Link to="/" className="block group">
        <h1 className="font-display text-4xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors">
          Duckers Blog
        </h1>
        <p className="mt-1 text-muted-foreground font-body text-sm tracking-wide uppercase">
          Thoughts & musings
        </p>
      </Link>
      <a
        href="https://duckers.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-body text-muted-foreground hover:text-accent transition-colors"
      >
        duckers.dev →
      </a>
    </div>
  </header>
);

export default BlogHeader;
