import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { SparkleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

const EndCallButton = () => {
     const call = useCall()
     const router = useRouter()
     const { useLocalParticipant } = useCallStateHooks()

     const localParticipant = useLocalParticipant()

     const updateInterviewStatus = useMutation(api.interviews.updateInterviewStatus)
     const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
          streamCallId: call?.id ?? "",
     })

     if (!call || !interview) return null
     const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id
     if (!isMeetingOwner) return null

     const endCall = async () => {
          try {
               await call.endCall()

               await updateInterviewStatus({
                    id: interview?._id,
                    status: "ended",
               })
               router.push("/")
               toast.success("Meeting ended successfully")
          } catch (error) {
               console.log(error);
               toast.error("Error ending meeting")
          }
     }

     return (
          <Button variant={"destructive"} onClick={endCall}>     
               End Call
          </Button>
     )
}

export default EndCallButton