interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    { name: "Twitter / X", href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`, icon: "𝕏" },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, icon: "in" },
    { name: "Reddit", href: `https://reddit.com/submit?url=${encoded}&title=${encodedTitle}`, icon: "⬆" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, icon: "f" },
  ];

  return (
    <div className="flex items-center gap-3 py-4">
      <span className="text-muted-foreground text-sm font-body">Share:</span>
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${p.name}`}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-sm font-semibold text-muted-foreground hover:text-accent hover:border-accent transition-colors"
        >
          {p.icon}
        </a>
      ))}
    </div>
  );
};

export default ShareButtons;
