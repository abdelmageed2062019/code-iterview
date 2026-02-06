"use client"

import LoadingUi from '@/components/LoadingUi'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import useGetCallById from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const MeetingPage = () => {
  const { id } = useParams() as { id: string }
  const { isLoaded } = useUser()
  const [isSetupCompleted, setIsSetupCompleted] = useState(false)
  const { call, isLoading: isCallLoading } = useGetCallById(id)
  if (!isLoaded || isCallLoading || !call) return <LoadingUi />
   if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }
  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupCompleted ? (
          <MeetingSetup onSetupCompleted={() => setIsSetupCompleted(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  )
}

export default MeetingPage
