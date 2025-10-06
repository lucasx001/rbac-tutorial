"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "./ui/field"
import { InputField } from "./form-field/input-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { LoadingButton } from "./loading-button"
import { useAuth } from "@/providers/auth"

const formSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type FormType = z.infer<typeof formSchema>
interface Props {
  onSuccess?: (token: string) => void
}

export function SignUpForm({ onSuccess }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const auth = useAuth()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormType) => {
      return auth.signUp(values.username, values.password)
    },
    onSuccess: (data) => {
      onSuccess?.(data.access_token)
    },
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit((values) => {
            mutate(values)
          })}
        >
          <FieldSet>
            <FieldGroup>
              {/* 用户名字段 */}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <InputField
                    control={form.control}
                    name="username"
                    id="username"
                    type="text"
                    className={`pl-10 pr-10`}
                    placeholder="Enter username"
                  />
                </div>
                <FieldError errors={[form.formState.errors.username]} />
              </Field>
              {/* 密码字段 */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <InputField
                    control={form.control}
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className={`pl-10 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError errors={[form.formState.errors.password]} />
              </Field>
              {/* 确认密码字段 */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <InputField
                    control={form.control}
                    name="confirmPassword"
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className={`pl-10 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError errors={[form.formState.errors.confirmPassword]} />
              </Field>
              <Field>
                <LoadingButton type="submit" className="w-full" isLoading={isPending}>
                  Sign up
                </LoadingButton>
              </Field>
            </FieldGroup>
            <FieldGroup className="text-center">
              <p className="text-sm text-muted-foreground">
                Already has account？{" "}
                <Link to="/sign-in" className="text-primary hover:underline">
                  sign in
                </Link>
              </p>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  )
}
