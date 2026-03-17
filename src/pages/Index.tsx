import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fetchIssues, getSlug, getExcerpt } from "@/lib/github";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";

const Index = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchIssues,
  });

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

          {posts && (
            <div className="space-y-10">
              {posts.filter(p => !p.title.startsWith("[")).map((post) => (
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
