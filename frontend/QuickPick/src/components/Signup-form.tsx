import type React from "react"
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../components/ui/field"
import { Input } from "../components/ui/input"
import {registerUser} from '../../api'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from "../Context/SearchContext"
export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState()
  const [password, setPassord] = useState("")
  const navigate = useNavigate()
  const {Login,token} = useSearch()

  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
    const response = await registerUser({fullname,email,phoneNo,password})
    const result = response.data.token
    Login(result)

    if (response.data?.success) {
      navigate("/")
      
    }

    
      
    } catch (error) {
      
      
    } 
    
    
      
      
      


  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Fill in the form below to create your account</p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" value={fullname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)} required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m..example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input id="phone" type="number" placeholder="+1 (555) 000-0000" value={phoneNo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNo(e.target.value)} required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassord(e.target.value)} required />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>
       
        <Field>
          <Button onClick={handleSubmit} type="submit">Create Account</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
