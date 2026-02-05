"use client"

import { ReactNode, useEffect, useState } from "react"
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
import { useUser } from "@clerk/nextjs"
import LoadingUi from "@/components/LoadingUi"
import { streamTokenProvider } from "@/actions/stream.actions"

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
     const { user, isLoaded } = useUser()
     const [streamClient, setStreamClient] = useState<StreamVideoClient>()

     useEffect(() => {
          if (!isLoaded || !user?.id) return;
          const client = new StreamVideoClient({
               apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
               user: {
                    id: user.id,
                    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
                    image: user?.imageUrl || "",
               },
               tokenProvider: () => streamTokenProvider(user.id),
          })
          setStreamClient(client)
     }, [user, isLoaded])

     if (!streamClient) return <LoadingUi />;
     return (
          <StreamVideo client={streamClient}>{children}</StreamVideo>
     )
}
export default StreamClientProvider
