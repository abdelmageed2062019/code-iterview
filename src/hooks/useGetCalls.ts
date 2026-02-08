import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useState, useEffect } from "react"
import { toast } from "sonner"


const useGetCalls = () => {
     const client = useStreamVideoClient()
     const { user, isLoaded } = useUser()
     const [calls, setCalls] = useState<Call[]>([])
     const [isLoading, setIsLoading] = useState(false)

     useEffect(() => {
          const loadCalls = async () => {
               if (!client || !isLoaded || !user?.id) return
               setIsLoading(true)
               try {
                    const { calls } = await client.queryCalls({
                         sort: [{ field: "starts_at", direction: -1 }],
                         filter_conditions: {
                              starts_at: { $exists: true },
                              $or: [{ created_by_user_id: user.id }, { members: { $in: [user.id] } }]
                         }
                    })
                    setCalls(calls)
               } catch (error) {
                    toast.error("Failed to get calls")
               } finally {
                    setIsLoading(false)
               }
          }
          loadCalls()
     }, [client, isLoaded, user?.id])

     const now = new Date()

     const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => startsAt && endedAt && new Date(endedAt) < now || !!endedAt)
     
     const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => startsAt && new Date(startsAt) > now)

     const liveCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => startsAt && !endedAt && new Date(startsAt) < now && !endedAt)

     return { calls, isLoading, endedCalls, upcomingCalls, liveCalls }
}

export default useGetCalls
