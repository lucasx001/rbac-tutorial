import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link } from "@tanstack/react-router"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { InputField } from "./form-field/input-field"
import { LoadingButton } from "./loading-button"

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

type FormType = z.infer<typeof formSchema>
interface Props {
  onSuccess?: (token: string) => void
}

export function LoginForm({ onSuccess }: Props) {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormType) => {
      const resSchema = z.object({
        username: z.string().min(1),
        access_token: z.string().min(1),
        id: z.string().min(1),
      })
      const resp = await axios.post("/auth/sign-in", {
        username: values.username,
        password: values.password,
      })

      const data = resSchema.parse(resp.data)

      return data
    },
    onSuccess: (data) => {
      onSuccess?.(data.access_token)
    },
  })

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your username and password below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit((values) => {
              mutate(values)
            })}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <InputField id="username" placeholder="lucas@EMAIL" control={form.control} name="username" />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/sign-up" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <InputField id="password" type="password" control={form.control} name="password" />
              </div>
              <LoadingButton type="submit" className="w-full" isLoading={isPending}>
                Login
              </LoadingButton>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
