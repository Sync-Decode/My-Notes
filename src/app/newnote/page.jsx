'use client'
import { useNotes } from '@/store/store'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'
import { supabase } from '@/supabase/supabase-client'

const NewNote = () => {
  const { addNote } = useNotes()
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const { email, fetchEmail } = useNotes()

  useEffect(() => {
    fetchEmail()
  }, [])

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !note.trim()) return
    addNote({ title, note, email })

    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
    }, 1000)

    setTitle('')
    setNote('')
  }

  const back = () => {
    router.back()
  }

  return (
    <div className="w-full min-h-screen max-w-3xl flex flex-col  p-5 mx-auto selection:bg-[#5e24f193]  ">
      <motion.div
        variants={{ initial: { y: '-100%' }, animate: { y: 32 } }}
        initial="initial"
        animate={isSaved ? 'animate' : 'initial'}
        transition={{ duration: 1, type: 'tween', ease: 'anticipate' }}
        className="fixed top-0 left-1/2 -translate-x-1/2 px-8 py-2 bg-[#f3eeff] text-[#5d24f1] rounded-sm"
      >
        Saved!
      </motion.div>

      <div className="flex justify-between">
        <div
          onClick={back}
          className="flex justify-start items-center px-5 gap-2 cursor-pointer select-none"
        >
          <IoArrowBackOutline />
          <p className="text-sm font-bold text-[#f3eeff7c]">back</p>
        </div>
        <h1 className="text-[#f3eeff7c] text-right text-xl leading-12 font-bold p-5">
          New Note
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="text-[#f3eeff]  flex flex-col gap-8 p-4"
      >
        <div className="flex justify-between w-full">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            type="text"
            placeholder="Title..."
            className="text-left text-2xl font-bold w-full outline-0 border-0 placeholder-[#f3eeff] placeholder:font-bold placeholder:text-2xl placeholder:tracking-wide caret-[#f3eeff]"
          />

          <button type="submit" className="px-8 py-2 bg-[#5d24f1] rounded-sm">
            Save
          </button>
        </div>

        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          type="text"
          placeholder="Add new note..."
          className="text-left w-full min-h-[50dvh] outline-0 border-0 placeholder:leading-8 placeholder:tracking-wide caret-[#f3eeff]"
        ></textarea>
      </form>
    </div>
  )
}

export default NewNote
