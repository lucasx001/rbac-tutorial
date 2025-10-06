import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import "./style.css"
import "./api"
import { AuthProvider, useAuth } from "./providers/auth"

const defaultSignInUpResult = {
  access_token: "",
  id: "",
  username: "",
}
// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: {
      session: null,
      signIn: () => Promise.resolve(defaultSignInUpResult),
      signUp: () => Promise.resolve(defaultSignInUpResult),
      logout: () => Promise.resolve(),
    },
  },
})
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function rootRender() {
  const client = new QueryClient()
  return (
    <StrictMode>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(rootRender())
}
