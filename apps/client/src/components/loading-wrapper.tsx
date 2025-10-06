import type { JSX, ReactNode } from "react"
import { Spinner } from "./spinner"

interface Props {
  children: ReactNode
  isLoading?: boolean
}

export function LoadingWrapper({ children, isLoading }: Props): JSX.Element {
  return (
    <div className="relative">
      {children}
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : null}
    </div>
  )
}
