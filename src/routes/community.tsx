import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { communityPosts } from "@/lib/trails";
import { cn } from "@/lib/utils";
import { Heart, MapPin, MessageCircle, Star } from "lucide-react";
import { NewReportDialog } from "@/components/new-report-dialog";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Trailblaze" },
      {
        name: "description",
        content: "Read recent trip reports and share your own hiking conditions.",
      },
    ],
  }),
  component: Community,
});

function Community() {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-mono text-muted-foreground">TRIP REPORTS</span>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
              Community
            </h1>
            <p className="mt-2 text-muted-foreground">Real conditions from hikers on the ground.</p>
          </div>
          <NewReportDialog />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {communityPosts.map((post, i) => (
          <Reveal key={post.id} delay={i * 100}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary font-mono text-xs font-semibold text-secondary-foreground">
                    {post.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={cn(
                        "h-3.5 w-3.5",
                        idx < post.rating ? "fill-ember text-ember" : "text-border",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {post.trail}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.body}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="label-mono text-muted-foreground">{post.conditions}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-medium transition-colors",
                      liked.includes(post.id)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Heart
                      className={cn("h-3.5 w-3.5", liked.includes(post.id) && "fill-current")}
                    />
                    {post.likes + (liked.includes(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
                    <MessageCircle className="h-3.5 w-3.5" /> Reply
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
