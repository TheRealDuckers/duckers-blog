import { useEffect, useRef } from "react";
import { REPO_OWNER, REPO_NAME } from "@/lib/github";

interface GiscusCommentsProps {
  issueNumber: number;
}

const GiscusComments = ({ issueNumber }: GiscusCommentsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", `${REPO_OWNER}/${REPO_NAME}`);
    script.setAttribute("data-repo-id", "");
    script.setAttribute("data-mapping", "number");
    script.setAttribute("data-term", String(issueNumber));
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;
    ref.current.appendChild(script);
  }, [issueNumber]);

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-display text-xl font-semibold mb-6">Comments</h3>
      <div ref={ref} />
    </div>
  );
};

export default GiscusComments;
