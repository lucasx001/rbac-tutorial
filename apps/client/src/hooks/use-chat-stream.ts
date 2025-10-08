import { useCallback, useState } from "react"

export function useChatStream(): { refetch: (prompt: string) => Promise<string>; output: string; isFetching: boolean } {
  const [output, setOutput] = useState("")
  const [isFetching, setIsFetching] = useState(false)

  const refetch = useCallback(async (prompt: string) => {
    const res = await fetch(`${process.env.VITE_API_URL}/chat/prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      credentials: "include",
    })

    const reader = res.body?.getReader()
    if (!reader) throw new Error("No readable stream found")

    setIsFetching(true)

    const decoder = new TextDecoder()
    let text = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        setIsFetching(false)
        break
      }

      const chunk = decoder.decode(value, { stream: true })
      text += chunk
      setOutput((prev) => prev + chunk)
    }

    return text
  }, [])

  return { refetch, output, isFetching }
}
