import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VIDEOS, driveEmbedUrl, type VideoKey } from "@/content/videos";
import { cn } from "@/lib/utils";
import VideoPoster from "./VideoPoster";

/** Cửa sổ phát video (Google Drive embed, hoặc mp4 nếu có). */
export const VideoDialog = ({ video, open, onOpenChange }: { video: VideoKey; open: boolean; onOpenChange: (o: boolean) => void }) => {
  const v = VIDEOS[video];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl gap-3 border-0 bg-brand-navy p-3 text-white sm:p-4">
        <DialogTitle className="pr-8 text-base font-semibold text-white">{v.title}</DialogTitle>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
          {open &&
            ("mp4" in v && v.mp4 ? (
              <video src={v.mp4 as string} controls autoPlay playsInline className="h-full w-full" />
            ) : (
              <iframe src={driveEmbedUrl(v)} title={v.title} allow="autoplay; fullscreen" allowFullScreen className="absolute inset-0 h-full w-full" />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

/** Nút "Xem video" dạng chữ/nút nhỏ. */
export const VideoButton = ({ video, label, className, light }: { video: VideoKey; label?: string; className?: string; light?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition",
          light ? "border border-white/40 text-white hover:bg-white/10" : "border border-brand-navy/30 text-brand-navy hover:bg-white",
          className,
        )}
      >
        <Play className="h-4 w-4 fill-current" /> {label ?? "Xem video"}
      </button>
      <VideoDialog video={video} open={open} onOpenChange={setOpen} />
    </>
  );
};

/** Lưới video (dùng ở trang thiết bị). */
export const VideoGallery = ({ videos }: { videos: VideoKey[] }) => {
  const [active, setActive] = useState<VideoKey | null>(null);
  return (
    <>
      <div className={cn("grid gap-4", videos.length > 1 ? "md:grid-cols-2" : "")}>
        {videos.map((k) => (
          <button key={k} type="button" onClick={() => setActive(k)} aria-label={`Xem video: ${VIDEOS[k].title}`} className="group relative aspect-video overflow-hidden rounded-3xl bg-brand-navy text-left">
            <VideoPoster video={k} />
          </button>
        ))}
      </div>
      {active && <VideoDialog video={active} open={!!active} onOpenChange={(o) => !o && setActive(null)} />}
    </>
  );
};
