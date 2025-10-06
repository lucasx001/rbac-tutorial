import { Session } from "@/lib/types"
import axios from "axios"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import z from "zod"

export interface AuthState {
  session: Session | null
}

const AuthContext = createContext<AuthState | undefined>(undefined)

const verifyResSchema = z.discriminatedUnion("code", [
  z.object({
    code: z.literal(200),
    data: z.object({
      id: z.string(),
      username: z.string(),
    }),
  }),
  z.object({
    code: z.literal(401),
    message: z.string(),
  }),
])

const localSession = z.object({
  id: z.string(),
  username: z.string(),
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const sessionStr = JSON.parse(window.localStorage.getItem("session") || "{}")
      const res = localSession.safeParse(sessionStr)

      if (res.success) {
        setSession(res.data)

        return
      }
    } catch (error) {
      console.error(error)
    } finally {
      window.localStorage.removeItem("session")
    }

    setLoading(true)
    axios.get("/auth/verify").then((res) => {
      setLoading(false)
      const data = verifyResSchema.parse(res.data)
      if (data.code === 200) {
        setSession(data.data)
        window.localStorage.setItem("session", JSON.stringify(data.data))
      } else {
        setSession(null)
        window.localStorage.removeItem("session")
      }
    })
  }, [])

  //todo export logout function

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
