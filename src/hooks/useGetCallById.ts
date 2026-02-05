"use client"

import { useEffect, useState } from "react"
import { StreamVideoClient, useStreamVideoClient } from "@stream-io/video-react-sdk"

type StreamCall = ReturnType<StreamVideoClient["call"]>

const useGetCallById = (id?: string) => {
     const client = useStreamVideoClient()
     const [call, setCall] = useState<StreamCall | null>(null)
     const [isLoading, setIsLoading] = useState(true)

     useEffect(() => {
          if (!client || !id) return
          const getCall = async () => {
               try {
                    const { calls } = await client.queryCalls({
                         filter_conditions: {
                              id
                         }
                    })
                    setCall(calls[0])
               } catch (error) {
                    console.log(error)
                    setCall(null)
               } finally {
                    setIsLoading(false)
               }
          }
          getCall()
     }, [client, id])

     return { call, isLoading }
}

export default useGetCallById
