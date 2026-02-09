"use server"

import { StreamClient } from "@stream-io/node-sdk";

export const streamTokenProvider = async (userId: string) => {
     if (!userId) {
          throw new Error("Missing user id");
     }

     const streamClient = new StreamClient(
          process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          process.env.STREAM_SECRET_KEY!
     )

     const token = streamClient.generateUserToken({
          user_id: userId
     })

     return token;
}

export const createStreamCall = async ({
     callId,
     createdById,
     startsAt,
     description,
     additionalDetails,
}: {
     callId: string
     createdById: string
     startsAt: string
     description?: string
     additionalDetails?: string
}) => {
     const streamClient = new StreamClient(
          process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          process.env.STREAM_SECRET_KEY!
     )

     const call = streamClient.video.call("default", callId)
     await call.getOrCreate({
          data: {
               created_by_id: createdById,
               starts_at: new Date(startsAt),
               custom: {
                    description: description ?? "",
                    additionalDetails: additionalDetails ?? "",
               },
          },
     })
}
