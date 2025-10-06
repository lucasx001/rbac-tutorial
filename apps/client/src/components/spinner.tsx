import { cn } from "@/lib/utils"
import { LoaderCircleIcon, type LucideProps } from "lucide-react"
import type { JSX } from "react"

export function Spinner({ size = 16, className, ...props }: LucideProps & { className?: string }): JSX.Element {
  return <LoaderCircleIcon size={size} {...props} className={cn("animate-spin", className)} />
}
