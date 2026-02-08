import { CallRecording } from "@stream-io/video-react-sdk"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { differenceInSeconds, format, isValid } from "date-fns"
import { Clock, CopyIcon } from "lucide-react"

const formatDateTime = (value?: string | Date | null) => {
     if (!value) return "Unknown"
     const date = typeof value === "string" ? new Date(value) : value
     if (!isValid(date)) return "Unknown"
     return format(date, "MMM d, yyyy, hh:mm a")
}

const formatDuration = (start?: string | Date | null, end?: string | Date | null) => {
     if (!start || !end) return "Unknown"
     const startDate = typeof start === "string" ? new Date(start) : start
     const endDate = typeof end === "string" ? new Date(end) : end
     if (!isValid(startDate) || !isValid(endDate)) return "Unknown"
     const totalSeconds = differenceInSeconds(endDate, startDate)
     if (totalSeconds < 0) return "Unknown"
     const minutes = Math.floor(totalSeconds / 60)
     const seconds = totalSeconds % 60
     if (minutes > 0) return `${minutes}m ${seconds}s`
     return `${seconds}s`
}

const RecordingCard = ({ recording }: { recording: CallRecording }) => {
     const handleCopyLink = async () => {
          try {
               await navigator.clipboard.writeText(recording.url)
               toast.success("Link copied to clipboard")
          } catch (error) {
               toast.error("Failed to copy link")
          }
     }

     const formattedStartTime = formatDateTime(recording.start_time)
     const duration = formatDuration(recording.start_time, recording.end_time)
     return (
          <Card className="h-full">
               <CardHeader>
                    <CardTitle className="text-base">Recording</CardTitle>
               </CardHeader>
               <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                         <span className="text-muted-foreground">Start</span>
                         <span>{formattedStartTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                         <span className="text-muted-foreground">Duration</span>
                         <span><Clock className="inline-block mr-1 w-4 h-4 text-muted-foreground pb-1" />{duration}</span>
                    </div>
               </CardContent>
               <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleCopyLink}>
                         <CopyIcon /> Copy Link
                    </Button>
                    <Button className="flex-1" asChild>
                         <a href={recording.url} target="_blank" rel="noreferrer">
                              Open
                         </a>
                    </Button>
               </CardFooter>
          </Card>
     )
}

export default RecordingCard
