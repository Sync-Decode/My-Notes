'use client'
import Note from '@/components/Note'
import Link from 'next/link'
import { useNotes } from '@/store/store'
import { useEffect, useState } from 'react'
import FilterButton from '@/components/FilterButton'
import { supabase } from '@/supabase/supabase-client'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import { useFilter } from '@/store/store'

const Home = () => {
  const router = useRouter()
  // Check if user is authenticated
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { notes, fetchNotes } = useNotes()

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true)
      const { data } = await supabase.auth.getSession()
      const currentSession = data.session

      if (!currentSession) {
        router.replace('/signin')
        return
      }

      setIsLoading(false)
      setSession(currentSession)
      filterAll()
      console.log(data)
    }

    fetchSession()
  }, [])

  const filterAll = () => {
    fetchNotes()
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('could not sign you out', error.message)
    }
    router.replace('/signin')
  }

  //filters
  const { isTodaySelected, setIsTodaySelected, filterToday } = useFilter()

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full min-h-screen max-w-3xl flex flex-col  px-5 mx-auto gap-3 ">
      <div onClick={handleSignOut} className="cursor-pointer">
        <p className="text-right text-sm text-bold">sign out</p>
      </div>
      <h1 className="text-[#f3eeffdc] text-left text-5xl leading-[1.1] font-bold px-5 select-none">
        My <br />
        Notes
      </h1>

      <div className="w-full p-5 flex justify-start items-center gap-5 rounded-bl-3xl rounded-tr-3xl ">
        <div className="flex justify-start items-center gap-5">
          <FilterButton handleClick={filterAll} text="All" />
          <FilterButton
            handleClick={() => {
              filterToday(isTodaySelected)
            }}
            text="Today"
          />
        </div>
      </div>

      <div className="w-full  columns-2 min-md:columns-3 p-4">
        {notes.map(({ title, created_at, id, note }, index) => (
          <Note
            key={`${title}-${index}`}
            title={title}
            note={note}
            id={id}
            created_at={created_at}
          />
        ))}
      </div>

      <Link
        href="/newnote"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-16 aspect-square rounded-full bg-[#1a0e2b] "
      >
        <span className="absolute top-1/2 left-1/2 -translate-1/2 w-1/2 h-0.5 bg-[#5d24f1]" />
        <span className="absolute top-1/2 left-1/2 -translate-1/2 w-1/2 h-0.5 bg-[#5d24f1] rotate-90" />
      </Link>
    </div>
  )
}
export default Home
