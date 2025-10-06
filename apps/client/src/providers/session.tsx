import { Session } from "@/lib/types"
import { createContext, type JSX, type ReactNode, useContext } from "react"

interface ContextProps {
  session: Session
}

const SessionContext = createContext<ContextProps>(undefined!)

interface SessionProviderProps extends ContextProps {
  children: ReactNode
}

export function SessionProvider({ session, children }: SessionProviderProps): JSX.Element {
  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>
}

export function useSession(): Session {
  return useContext(SessionContext).session
}
