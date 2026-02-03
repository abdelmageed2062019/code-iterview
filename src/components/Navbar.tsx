"use client"

import Link from "next/link"
import { ModeToggle } from "./ModeToggle"
import { CodeIcon } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import DashboardBtn from "./DashboardBtn"

const Navbar = () => {
     return (
          <div className="border-b">
               <div className="flex h-16 items-center container px-4 mx-auto">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80">
                         <CodeIcon className="size-8 text-emerald-500" />
                         <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">CodeSync</span>
                    </Link>

                    <SignedIn>
                         <div className="flex items-center space-x-4 ml-auto">
                              <DashboardBtn />
                              <ModeToggle />
                              <UserButton />
                         </div>
                    </SignedIn>

                    <SignedOut>
                         <div className="flex items-center space-x-4 ml-auto">
                              <SignInButton />
                              <SignUpButton />
                              <ModeToggle />
                         </div>
                    </SignedOut>
               </div>
          </div>
     )
}

export default Navbar
