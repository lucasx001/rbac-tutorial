import { forwardRef } from "react"
import { LoadingWrapper } from "./loading-wrapper"
import { Button, type ButtonProps } from "./ui/button"

interface ComponentProps extends ButtonProps {
  isLoading?: boolean
}

export const LoadingButton = forwardRef<HTMLButtonElement, ComponentProps>(
  ({ className, children, disabled, isLoading = false, ...props }, ref) => {
    return (
      <LoadingWrapper isLoading={isLoading}>
        <Button ref={ref} className={className} disabled={isLoading || disabled} {...props}>
          {children}
        </Button>
      </LoadingWrapper>
    )
  }
)
LoadingButton.displayName = "LoadingButton"
