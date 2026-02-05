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
