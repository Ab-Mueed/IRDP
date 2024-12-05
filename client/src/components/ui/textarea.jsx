import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-zinc-700 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-zinc-300 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-[#363b3d] dark:placeholder:text-zinc-400 dark:text-[#e8e6e3] dark:focus-visible:ring-zinc-300",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
