import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostByNumber, getExcerpt, getSlug } from "@/lib/github";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import ShareButtons from "@/components/ShareButtons";
import GiscusComments from "@/components/GiscusComments";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const issueNumber = parseInt(slug?.split("-")[0] || "0", 10);
  const post = getPostByNumber(issueNumber);
  const readNext = getAllPosts()
    .filter((p) => p.number !== issueNumber)
    .slice(0, 3);

  const pageUrl = window.location.href;

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.title} — Duckers Blog</title>
          <meta name="description" content={getExcerpt(post.body)} />
          <link rel="canonical" href={pageUrl} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={getExcerpt(post.body)} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={pageUrl} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={getExcerpt(post.body)} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.created_at,
              dateModified: post.updated_at,
              author: { "@type": "Person", name: post.user.login },
              description: getExcerpt(post.body),
              url: pageUrl,
            })}
          </script>
        </Helmet>
      )}

      <div className="min-h-screen flex flex-col">
        <BlogHeader />

        <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
          <Link
            to="/"
            className="inline-block mb-8 text-sm font-body text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to all posts
          </Link>

          {!post && (
            <p className="text-destructive font-body">Post not found.</p>
          )}

          {post && (
            <article>
              <header className="mb-8">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={post.user.avatar_url}
                    alt={post.user.login}
                    className="w-8 h-8 rounded-full"
                    loading="lazy"
                  />
                  <div className="text-sm font-body">
                    <span className="text-foreground font-medium">{post.user.login}</span>
                    <span className="text-muted-foreground ml-2">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {post.labels.length > 0 && (
                  <div className="flex gap-2 mt-3">
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
              </header>

              <div className="prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.body}
                </ReactMarkdown>
              </div>

              <div className="mt-10 pt-6 border-t border-border">
                <ShareButtons url={pageUrl} title={post.title} />
              </div>

              {readNext.length > 0 && (
                <div className="mt-10 pt-6 border-t border-border">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">Read Next</h3>
                  <div className="space-y-4">
                    {readNext.map((p) => (
                      <Link
                        key={p.number}
                        to={`/post/${getSlug(p)}`}
                        className="block group"
                      >
                        <h4 className="font-body text-base text-foreground group-hover:text-accent transition-colors font-medium">
                          {p.title}
                        </h4>
                        <p className="text-sm text-muted-foreground font-body mt-0.5 line-clamp-2">
                          {getExcerpt(p.body, 100)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <GiscusComments issueNumber={post.number} />
            </article>
          )}
        </main>

        <BlogFooter />
      </div>
    </>
  );
};

export default BlogPost;
