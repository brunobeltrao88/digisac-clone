import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  status?: "online" | "busy" | "away" | "offline";
}

const sizes = { xs: "h-6 w-6 text-xs", sm: "h-8 w-8 text-sm", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };
const statusColors = { online: "bg-green-500", busy: "bg-red-500", away: "bg-yellow-500", offline: "bg-gray-400" };

function initials(name?: string) {
  if (!name) return "?";
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export function Avatar({ src, name, size = "md", className, status }: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      {src ? (
        <img
          src={src}
          alt={name ?? "avatar"}
          className={cn("rounded-full object-cover", sizes[size])}
        />
      ) : (
        <div className={cn("rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center", sizes[size])}>
          {initials(name)}
        </div>
      )}
      {status && (
        <span className={cn("absolute bottom-0 right-0 rounded-full border-2 border-white h-2.5 w-2.5", statusColors[status])} />
      )}
    </div>
  );
}
