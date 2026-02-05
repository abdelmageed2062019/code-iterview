"use client"

import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Input } from "./ui/input";

type MeetingModalProps = {
     isOpen: boolean
     onClose: () => void
     title: string;
     isJoinMeeting: boolean
}

const MeetingModal = ({ isOpen, onClose, title, isJoinMeeting }: MeetingModalProps) => {
     const [meetingUrl, setMeetingUrl] = useState("");

     const createMeeting = async () => { }
     const joinMeeting = async () => { }

     const handleStart = () => { }

     return (
          <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
               <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                         <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 pt-4">
                         {
                              isJoinMeeting && (
                                   <Input placeholder="Paste meeting link..." value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} />
                              )
                         }
                    </div>

                    <div className="flex justify-end gap-3">
                         <Button variant={'outline'} onClick={onClose}>
                              Cancel
                         </Button>

                         <Button onClick={handleStart} disabled={isJoinMeeting && !meetingUrl.trim()}>{isJoinMeeting ? 'Join Meeting' : 'Start Meeting'}</Button>
                    </div>

               </DialogContent>
          </Dialog>
     )
}

export default MeetingModal
