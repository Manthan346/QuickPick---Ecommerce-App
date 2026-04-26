import { GalleryVerticalEnd } from "lucide-react"
import { assets } from "../assets/assets"


import { SignupForm } from '../components/Signup-form'

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
     <div className="bg-muted relative hidden lg:block rounded-2xl overflow-hidden">
  {/* Background Image */}
  <img
    src={assets.female}
    alt="Inspirational background"
    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
  />

  {/* Overlay (dark transparent layer for readability) */}
  <div className="absolute inset-0 bg-foreground/20"></div>

  {/* Quote Text */}
  <div className="relative top-130 font-manthan  flex flex-col items-center justify-center text-center text-background px-8">
    <p className="text-2xl font-semibold leading-snug">
      “Luxury is not a label — it’s a lifestyle.”
    </p>
   
  </div>
</div>

    </div>
  )
}
