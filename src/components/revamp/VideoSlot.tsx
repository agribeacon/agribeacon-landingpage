import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoSlotProps {
  /** URL video mp4. Để trống khi chưa có video – slot hiển thị poster. */
  src?: string;
  poster: string;
  /** Mô tả video cần quay. Chỉ hiện ở môi trường dev để nhắc team bổ sung. */
  brief: string;
  className?: string;
  /** Video nền (autoplay, muted, loop) hay video có điều khiển */
  ambient?: boolean;
  overlay?: boolean;
  /** Lớp CSS cho ảnh/video, ví dụ "object-bottom" */
  mediaClassName?: string;
}

/**
 * Chỗ dành sẵn cho video. Khi chưa có `src`, hiển thị ảnh poster để trang vẫn hoàn chỉnh.
 * Thay video: truyền `src` (ví dụ từ /api/hero-video hoặc CDN).
 */
const VideoSlot = ({ src, poster, brief, className, ambient = true, overlay = false, mediaClassName }: VideoSlotProps) => {
  return (
    <div className={cn("relative overflow-hidden bg-brand-navy", className)} data-video-slot={brief}>
      {src ? (
        <video
          key={src}
          className={cn("absolute inset-0 h-full w-full object-cover", mediaClassName)}
          poster={poster}
          autoPlay={ambient}
          muted={ambient}
          loop={ambient}
          playsInline
          controls={!ambient}
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt="" className={cn("absolute inset-0 h-full w-full object-cover", mediaClassName)} loading="lazy" />
      )}
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-brand-navy/10" />}
      {!src && import.meta.env.DEV && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white">
          <Play className="h-3 w-3" /> Slot video: {brief}
        </div>
      )}
    </div>
  );
};

export default VideoSlot;
