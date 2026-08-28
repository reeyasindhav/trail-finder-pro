import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { trails } from "@/lib/trails";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, Plus } from "lucide-react";

export function NewReportDialog() {
  const [open, setOpen] = useState(false);
  const [trailSlug, setTrailSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [conditions, setConditions] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Report submitted! (This is a demo — no backend is connected.)");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03]">
          <Plus className="h-4 w-4" /> New report
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>New trip report</DialogTitle>
          <DialogDescription>
            Share your hiking conditions and trip report with the community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex max-h-[70vh] flex-col">
          <div className="space-y-5 overflow-y-auto">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-mono text-muted-foreground">Trail</label>
                <select
                  value={trailSlug}
                  onChange={(e) => setTrailSlug(e.target.value)}
                  required
                  className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option value="">Select a trail</option>
                  {trails.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name} — {t.region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-mono text-muted-foreground">Your name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  placeholder="Your name"
                  className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="label-mono text-muted-foreground">Rating</label>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                    aria-label={`${star} star`}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        star <= rating ? "fill-ember text-ember" : "text-border",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-mono text-muted-foreground">Conditions</label>
                <input
                  type="text"
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  required
                  placeholder="e.g. Dry, 68°F, light wind"
                  className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label className="label-mono text-muted-foreground">Trip report</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={4}
                  placeholder="Share your experience, route conditions, and tips..."
                  className="mt-2 h-full min-h-[120px] w-full rounded-lg border border-border bg-background px-3.5 py-3 text-sm outline-none transition-colors focus:border-primary sm:min-h-[150px]"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4 flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full shrink-0 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:brightness-110 sm:w-auto"
            >
              Submit report
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
