'use client'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'


const DashboardPage = () => {
  const users = useQuery(api.users.getUsers)
const interviews = useQuery(api.interviews.getAllInterviews)
const updateStatus = useMutation(api.interviews.updateInterviewStatus)

const handleStatusUpdate = async (interviewId: Id<"interviews">, status:string) => {
  trycatch
}
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage