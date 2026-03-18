const BlogFooter = () => (
  <footer className="border-t border-border mt-16">
    <div className="max-w-2xl mx-auto px-6 py-8 text-center text-muted-foreground font-body text-sm">
      <p>© {new Date().getFullYear()} Duckers Blog. All rights reserved.</p>
      <div className="mt-2 flex items-center justify-center gap-4 text-xs">
        <a
          href="https://duckers.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          duckers.dev
        </a>
        <span>·</span>
        <span>Powered by GitHub Issues</span>
      </div>
    </div>
  </footer>
);

export default BlogFooter;
