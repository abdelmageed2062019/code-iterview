import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserRole = () => {
  const { user, isLoaded } = useUser();
  const clerkId = user?.id;

  const userRecord = useQuery(api.users.getUserByClerkId, clerkId ? { clerkId } : "skip");

  const isInterviewer = userRecord?.role === "interviewer";
  const isCandidate = userRecord?.role === "candidate";
  const isLoading = !isLoaded || userRecord === undefined;

  return { isInterviewer, isCandidate, role: userRecord?.role, isLoading };
}