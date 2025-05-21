import { cn } from "@/lib/utils"

interface VerticalDividerProps {
  className?: string
  position?: "left" | "right" | "center"
}

export default function VerticalDivider({ className, position = "center" }: VerticalDividerProps) {
  const positionClasses = {
    left: "left-1/3 -translate-x-1/2",
    center: "left-1/2 -translate-x-1/2",
    right: "left-2/3 -translate-x-1/2",
  }

  return (
    <div className={cn("absolute top-0 h-full flex items-center", positionClasses[position], className)}>
      <svg width="2" height="797" viewBox="0 0 2 797" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00003 796L1 1" stroke="url(#paint0_linear_419_5559)" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient
            id="paint0_linear_419_5559"
            x1="1.5"
            y1="1"
            x2="1.50003"
            y2="796"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#272329" stopOpacity="0" />
            <stop offset="0.5" stopColor="#272329" />
            <stop offset="1" stopColor="#272329" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
