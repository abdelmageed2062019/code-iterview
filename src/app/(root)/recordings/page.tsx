"use client"

import LoadingUi from "@/components/LoadingUi"
import useGetCalls from "@/hooks/useGetCalls"
import type { Call } from "@stream-io/video-react-sdk"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import RecordingCard from "@/components/RecordingCard"

type Recording = Awaited<ReturnType<Call["queryRecordings"]>>["recordings"][number]

const RecordingsPage = () => {
  const { calls, isLoading } = useGetCalls()
  const [recordings, setRecordings] = useState<Recording[]>([])

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!calls?.length) {
        setRecordings([])
        return
      }
      try {
        const callData = await Promise.all(calls.map((call) => call.queryRecordings()))
        const allRecordings = callData.flatMap((call) => call.recordings)
        setRecordings(allRecordings)
      } catch (error) {
        console.error("Error fetching recordings:", error)
      }
    }

    fetchRecordings()
  }, [calls])

  if (isLoading) return <LoadingUi />

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <h1 className="text-exl font-bold">Recordings</h1>
      <p className="text-muted-foreground my-1">
        {recordings.length} {recordings.length === 1 ? "recording" : "recordings"} availble
      </p>

      <ScrollArea className="h-[calc(100vh-12rem)] mt-3">
        {
          recordings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
              {recordings.map((recording) => (
                <RecordingCard key={recording.end_time} recording={recording} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] gap-4">
              <p className="text-muted-foreground text-xl font-medium">No recordings available</p>
            </div>
          )
        }
      </ScrollArea>
    </div>
  )
}

export default RecordingsPage
