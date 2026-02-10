"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CallControls, CallingState, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { LayoutListIcon, LoaderIcon, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import EndCallButton from "./EndCallButton"
import CodeEditor from "./CodeEditor"

const MeetingRoom = () => {
  const router = useRouter()
  const [layout, setLayout] = useState<"grid" | "speaker">("grid")
  const [showParticipants, setShowParticipants] = useState(false)
  const { useCallCallingState } = useCallStateHooks()

  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animated-spin" />
      </div>
    )
  }

  return (
    <ResizablePanelGroup className="min-h-[calc(100vh-8rem)] w-full pt-4" orientation="horizontal">
      <ResizablePanel defaultSize={25} minSize={25} className="relative h-full min-h-0 bg-card/40 ">
        <div className="absolute inset-0 pt-2">
          {
            layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />
          }

          {
            showParticipants && (
              <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
                <CallParticipantsList onClose={() => setShowParticipants(false)} />
              </div>
            )
          }
        </div>

        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 flex-wrap justify-center px-4">
              <CallControls onLeave={() => router.push("/")} />

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-10">
                      <LayoutListIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => setLayout("grid")}>
                      Grid View
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setLayout("speaker")}>
                      Speaker View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <EndCallButton />

                <Button
                  variant="outline"
                  size="icon"
                  className="size-10"
                  onClick={() => setShowParticipants(!showParticipants)}
                >
                  <UserIcon className="size-4" />
                </Button>

              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50} minSize={25} className="h-full min-h-0 bg-card/40">
        <CodeEditor />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default MeetingRoom
