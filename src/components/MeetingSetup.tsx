"use client"

import { Button } from "@/components/ui/button"

type MeetingSetupProps = {
  onSetupCompleted: () => void
}

const MeetingSetup = ({ onSetupCompleted }: MeetingSetupProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <h2 className="text-2xl font-semibold">Ready to join?</h2>
      <p className="text-sm text-muted-foreground">
        Check your audio and video before entering the meeting.
      </p>
      <Button onClick={onSetupCompleted}>Enter Meeting</Button>
    </div>
  )
}

export default MeetingSetup
