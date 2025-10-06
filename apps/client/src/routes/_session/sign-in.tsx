import { LoginForm } from "@/components/login-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_session/sign-in")({
  component: SignIn,
})

function SignIn() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          onSuccess={(token) => {
            console.log("success sign in", token)
            window.location.reload()
          }}
        />
      </div>
    </div>
  )
}
