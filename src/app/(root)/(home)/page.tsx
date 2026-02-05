'use client'
import ActionCard from '@/components/ActionCard';
import { QUICK_ACTIONS } from '@/contants';
import { useUserRole } from '@/hooks/useUserRole';
import { useQuery } from 'convex/react';
import { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import MeetingModal from '@/components/MeetingModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const interviews = useQuery(api.interviews.getMyInterviews, {});
  const [modalType, setModalType] = useState<'start' | 'join'>();
  const { isInterviewer, isCandidate, isLoading } = useUserRole();

  const router = useRouter()

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start")
        setShowModal(true)
        break
      case "Join Interview":
        setModalType("join")
        setShowModal(true)
        break
      default:
        router.push(`/${title.toLowerCase()}`)
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-19">
        <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Welcome Back!</h1>
        <p className="text-muted-foreground mt-2">
          {
            isInterviewer ? "Manage your meetings and review candidates effectively." : "Access your upcoming meetings and recordings."
          }
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {QUICK_ACTIONS.map((action) => (
              <ActionCard key={action.title} action={action} onClick={() => handleQuickAction(action.title)} />
            ))}
          </div>

          <MeetingModal isOpen={showModal} onClose={() => setShowModal(false)} title={modalType === "start" ? "Start Interview" : "Join Interview"} isJoinMeeting={modalType === "join"} />
        </>
      ) : ''}
    </div>
  );
}
