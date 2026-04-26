import type React from "react"
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { loginUser } from "../../api"
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { useSearch } from "../Context/SearchContext"
export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("")
  const [password, setPassord] = useState("")
  const {Login,token } = useSearch()

 const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
   
    const response = await loginUser({email,password})
    const result = response.data?.token
    Login(result)
    
    console.log(result)
    if (response.data?.success) {
      navigate("/")

      
    }


  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" value={password} onChange={(e)=> setPassord(e.target.value)} required />
        </Field>
        <Field>
          <Button type="submit" onClick={handleSubmit}>Login</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
