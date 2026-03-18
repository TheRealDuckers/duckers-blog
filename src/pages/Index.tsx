import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fetchIssues, getSlug, getExcerpt } from "@/lib/github";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchIssues,
  });

  const visiblePosts = useMemo(() => {
    if (!posts) return [];
    return posts
      .filter((p) => !p.title.startsWith("[") && p.user.login === "TheRealDuckers")
      .filter((p) => {
        const matchesSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.body.toLowerCase().includes(search.toLowerCase());
        const matchesLabel =
          !activeLabel || p.labels.some((l) => l.name === activeLabel);
        return matchesSearch && matchesLabel;
      });
  }, [posts, search, activeLabel]);

  const allLabels = useMemo(() => {
    if (!posts) return [];
    const set = new Set<string>();
    posts.filter((p) => !p.title.startsWith("[") && p.user.login === "TheRealDuckers").forEach((p) => p.labels.forEach((l) => set.add(l.name)));
    return Array.from(set).sort();
  }, [posts]);

  return (
    <>
      <Helmet>
        <title>Duckers Blog</title>
        <meta name="description" content="Thoughts and musings from Duckers — powered by GitHub Issues." />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <BlogHeader />

        <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
          {posts && posts.length > 0 && (
            <div className="mb-10 space-y-4">
              <input
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
              />
              {allLabels.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveLabel(null)}
                    className={`text-xs px-3 py-1 rounded-full font-body transition-colors ${
                      !activeLabel
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                    }`}
                  >
                    All
                  </button>
                  {allLabels.map((label) => (
                    <button
                      key={label}
                      onClick={() => setActiveLabel(activeLabel === label ? null : label)}
                      className={`text-xs px-3 py-1 rounded-full font-body transition-colors ${
                        activeLabel === label
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {isLoading && (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-24 mb-3" />
                  <div className="h-7 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-destructive font-body">Failed to load posts. Please try again later.</p>
          )}

          {posts && visiblePosts.length === 0 && (
            <p className="text-muted-foreground font-body text-center py-12">
              No posts found{search || activeLabel ? " matching your search." : "."}
            </p>
          )}

          {visiblePosts.length > 0 && (
            <div className="space-y-10">
              {visiblePosts.map((post) => (
                <article key={post.number} className="group">
                  <time className="text-xs text-muted-foreground font-body uppercase tracking-wider">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {post.labels.length > 0 && (
                    <div className="flex gap-2 mt-1.5">
                      {post.labels.map((label) => (
                        <span
                          key={label.name}
                          className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-body"
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link to={`/post/${getSlug(post)}`} className="block mt-2">
                    <h2 className="font-display text-2xl font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground font-body leading-relaxed">
                      {getExcerpt(post.body)}
                    </p>
                  </Link>

                  <Link
                    to={`/post/${getSlug(post)}`}
                    className="inline-block mt-3 text-sm font-body text-accent hover:underline"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </main>

        <BlogFooter />
      </div>
    </>
  );
};

export default Index;
