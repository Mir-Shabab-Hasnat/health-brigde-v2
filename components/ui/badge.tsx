import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      color: {
        gray: "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300 hover:text-gray-900",
        red: "bg-red-200 text-red-800 border-red-300 hover:bg-red-300 hover:text-red-900",
        green: "bg-green-200 text-green-800 border-green-300 hover:bg-green-300 hover:text-green-900",
        blue: "bg-blue-200 text-blue-800 border-blue-300 hover:bg-blue-300 hover:text-blue-900",
        yellow: "bg-yellow-200 text-yellow-800 border-yellow-300 hover:bg-yellow-300 hover:text-yellow-900",
        orange: "bg-orange-200 text-orange-800 border-orange-300 hover:bg-orange-300 hover:text-orange-900",
        violet: "bg-violet-200 text-violet-800 border-violet-300 hover:bg-violet-300 hover:text-violet-900",
        // Add more colors as needed
      },
    },
    defaultVariants: {
      variant: "default",
      color: "gray",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: "gray" | "red" | "green" | "blue" | "yellow" | "orange" | "violet" // Add more colors as needed
}

function Badge({ className, variant, color = "gray", ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, color }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

