"use client"

import { Button } from "@/components/ui/button"
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react"
import { Switch } from "./ui/switch"

type MeetingSetupProps = {
  onSetupCompleted: () => void
}

const MeetingSetup = ({ onSetupCompleted }: MeetingSetupProps) => {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true)
  const [isMicDisabled, setIsMicDisabled] = useState(true)

  const call = useCall()

  if (!call) return null

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable()
    else call.camera.enable()
  }, [isCameraDisabled, call.camera])

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable()
    else call.microphone.enable()
  }, [isMicDisabled, call.microphone])

  const handleJoin = async () => {
    await call.join()
    onSetupCompleted()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background/95">
      <div className="w-full max-w-300 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          <Card className="md:col-span-1 p-6 flex flex-col h-full">
            <div>
              <h1 className="text-xl font-semibold mb-1">Camera Preview</h1>
              <p className="text-sm text-muted-foreground">Make sure you look good!</p>
            </div>

            <div className="mb-4 flex-1 min-h-100 rounded-xl overflow-hidden bg-muted/50 border relative">
              <VideoPreview className="absolute inset-0" />
            </div>
          </Card>

          <Card className="md:col-span-1 p-6 h-full">
            <div className="flex flex-col h-full">
              <div>
                <h2 className="text-xl font-semibold mb-1">Meeting Details</h2>
                <p className="text-sm text-muted-foreground break-all">{call.id}</p>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6 mt-8">
                  <div className="grid grid-cols-[40px_1fr_auto] items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CameraIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-medium">Camera</p>
                      <p className="text-sm text-muted-foreground">
                        {isCameraDisabled ? "Off" : "On"}
                      </p>
                    </div>
                    <Switch
                      checked={!isCameraDisabled}
                      onCheckedChange={(checked) => setIsCameraDisabled(!checked)}
                    />
                  </div>

                  <div className="grid grid-cols-[40px_1fr_auto] items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MicIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-medium">Microphone</p>
                      <p className="text-sm text-muted-foreground">
                        {isMicDisabled ? "Off" : "On"}
                      </p>
                    </div>
                    <Switch
                      checked={!isMicDisabled}
                      onCheckedChange={(checked) => setIsMicDisabled(!checked)}
                    />
                  </div>

                  <div className="grid grid-cols-[40px_1fr_auto] items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <SettingsIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-medium">Settings</p>
                      <p className="text-sm text-muted-foreground">
                        Configure device
                      </p>
                    </div>
                    <DeviceSettings />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-8">
                <Button size={'lg'} onClick={handleJoin} className="w-full">
                  Join Meeting
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Do not worry, our team is super friendly! We want you to success.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MeetingSetup
