import { useState } from "react"
import type { Id } from "../../convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { toast } from "sonner"
import { StarIcon } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const CommentDialog = ({ interviewId }: { interviewId: Id<"interviews"> }) => {
     const { user } = useUser()
     const [isOpen, setIsOpen] = useState(false)
     const [comment, setComment] = useState("")
     const [rating, setRating] = useState("3")

     const addComment = useMutation(api.comments.addComment)

     const handleSubmit = async () => {
          if (!comment.trim()) return toast.error("Comment is required")
          if (!user?.id) return toast.error("You must be signed in to comment")

          try {
               await addComment({
                    interviewId,
                    content: comment.trim(),
                    rating: parseInt(rating),
                    interviewerId: user.id,
               })
               toast.success("Comment added successfully")
               setComment("")
               setRating("3")
               setIsOpen(false)
          } catch (error) {
               toast.error("Failed to add comment")
          }
     }

     const renderStars = (value: number) => {
          return (
               <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                         <button
                              key={starValue}
                              type="button"
                              onClick={() => setRating(String(starValue))}
                              className="text-yellow-500"
                         >
                              <StarIcon
                                   className={
                                        starValue <= value
                                             ? "h-4 w-4 fill-yellow-500"
                                             : "h-4 w-4 text-muted-foreground"
                                   }
                              />
                         </button>
                    ))}
               </div>
          )
     }

     return (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                    <Button variant="outline">Add Comment</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                         <DialogTitle>Interview Feedback</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                         <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Rating</span>
                              {renderStars(parseInt(rating))}
                         </div>
                         <Textarea
                              value={comment}
                              onChange={(event) => setComment(event.target.value)}
                              placeholder="Write your feedback..."
                              rows={4}
                         />
                    </div>
                    <DialogFooter>
                         <Button variant="outline" onClick={() => setIsOpen(false)}>
                              Cancel
                         </Button>
                         <Button onClick={handleSubmit}>Submit</Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}

export default CommentDialog
