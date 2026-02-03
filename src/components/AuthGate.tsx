"use client"

import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs"

const AuthGate = ({ children }: { children: React.ReactNode }) => {
     return (
          <>
               <SignedIn>{children}</SignedIn>
               <SignedOut>
                    <RedirectToSignIn />
               </SignedOut>
          </>
     )
}

export default AuthGate
