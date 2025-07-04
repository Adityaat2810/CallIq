"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { OctagonAlertIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent } from "@/components/ui/card"
import  {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Alert, AlertTitle, AlertDescription  } from "@/components/ui/alert"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"}
  ),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, {
    message: "Password is required"
  }),
  confirmPassword: z.string().min(1, {
    message: "Confirm Password is required"
  })

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match"
})


export const SignUpView = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data)
    setPending(true)
    setError(null)
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password
      },
      {
        onSuccess: () => {
          setPending(false)
          router.push("/")
        },
        onError: ({error}) => {
          setPending(false)
          setError(error.message)
        }
      }
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-semibold">
                    Let&apos;s get you started
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    Create your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Field for server error  */}
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button
                  className="w-full"
                  type="submit"
                  disabled={pending}
                >
                  Sign Up
                </Button>

                <div className="after:border-border relative text-center
                 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0
                 after:flex after:items-center after:border-t"
                >
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                 </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full" type="button"
                  >
                    Google
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full" type="button"
                  >
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Already have an account?{"  "}
                  <Link href="/sign-in" className="underline underline-offset-4">
                    Sign In
                  </Link>
                </div>

              </div>
            </form>
          </Form>

          <div
            className="relative hidden md:flex flex-col gap-y-4 items-center justify-center
            bg-[radial-gradient(ellipse_at_center,_#16a34a_0%,_#065f46_100%)]"
          >
            <img
              src="/logo.svg"
              alt="Image"
              className="h-[92px] w-[92px]"
            />
            <p className="text-2xl font-semibold text-white">
              Call Iq
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary
       text-center text-sm text-balance *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a> and <a href='#' className="underline">Privacy Policy</a>

      </div>
    </div>
  )
}
