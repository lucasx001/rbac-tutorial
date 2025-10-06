import { Session } from "@/lib/types"
import axios from "axios"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import z from "zod"

export interface AuthState {
  session: Session | null
  logout: () => Promise<void>
  signIn: (username: string, password: string) => Promise<{ access_token: string; id: string; username: string }>
  signUp: (username: string, password: string) => Promise<{ access_token: string; id: string; username: string }>
}

const AuthContext = createContext<AuthState>(undefined!)

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

  const signIn = async (username: string, password: string) => {
    const loginResSchema = z.object({
      username: z.string().min(1),
      access_token: z.string().min(1),
      id: z.string().min(1),
    })
    const resp = await axios.post("/auth/sign-in", {
      username,
      password,
    })

    const data = loginResSchema.parse(resp.data)

    setSession(data)
    window.localStorage.setItem("session", JSON.stringify(data))

    return data
  }

  const signUp = async (username: string, password: string) => {
    const signUpResSchema = z.object({
      username: z.string().min(1),
      access_token: z.string().min(1),
      id: z.string().min(1),
    })
    const resp = await axios.post("/auth/sign-up", {
      username,
      password,
    })

    const data = signUpResSchema.parse(resp.data)

    setSession(data)
    window.localStorage.setItem("session", JSON.stringify(data))

    return data
  }

  const logout = async () => {
    const logoutResSchema = z.object({
      code: z.literal(200),
      message: z.string(),
    })
    const res = await axios.post("/auth/logout")
    const data = logoutResSchema.parse(res.data)
    if (data.code === 200) {
      setSession(null)
      window.localStorage.removeItem("session")
      window.location.reload()
    }
  }

  //todo export logout function

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <AuthContext.Provider value={{ session, logout, signIn, signUp }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
