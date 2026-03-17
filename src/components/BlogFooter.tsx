const BlogFooter = () => (
  <footer className="border-t border-border mt-16">
    <div className="max-w-2xl mx-auto px-6 py-8 text-center text-muted-foreground font-body text-sm">
      <p>© {new Date().getFullYear()} Duckers Blog. All rights reserved.</p>
      <p className="mt-1 text-xs">
        Powered by GitHub Issues
      </p>
    </div>
  </footer>
);

export default BlogFooter;
