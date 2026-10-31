import { tech, type TechId } from "@/lib/tech";

export function TechIcon({
  id,
  className,
}: {
  id: TechId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={tech[id].icon.path} fill="currentColor" />
    </svg>
  );
}
