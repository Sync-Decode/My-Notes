'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/supabase/supabase-client'
import { AnimatePresence, motion } from 'framer-motion'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoArrowBackOutline } from 'react-icons/io5'

const EditedNote = () => {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [unAuthorisedDelete, setUnAuthorisedDelete] = useState(false)
  const { id } = useParams()

  const router = useRouter()

  useEffect(() => {
    fetchNote(id)
    console.log(`ID: ${id}`)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() && !note.trim()) return
    updateNote(id, { title, note })
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
    }, 1000)
  }

  const updateNote = async (id, { title, note }) => {
    const { error } = await supabase
      .from('notes')
      .update({ title, note })
      .eq('id', id)
    if (error) console.error('could not update note', error.message)
  }

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .select()
    setConfirmDelete(false)
    console.log(data)
    if (error) {
      console.error('could not delete note', error.message)
    } else if (!data.length === 0) {
      router.replace('/newnote')
    } else {
      router.refresh()
      setUnAuthorisedDelete(true)
    }
  }

  const fetchNote = async (id) => {
    const { data, error } = await supabase
      .from('notes')
      .select('title, note, created_at')
      .eq('id', id)
      .single()
    if (error) console.error('Could not fetch note', error.message)
    else {
      setTitle(data.title)
      setNote(data.note)
    }
  }

  const back = () => {
    router.back()
  }

  const newnote = () => {
    setTimeout(() => {
      router.push('/newnote')
    }, 1500)
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
          Edit Note
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

          <button
            onClick={newnote}
            type="submit"
            className="px-8 py-2 bg-[#5d24f1] rounded-sm"
          >
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
          className="text-left w-full  min-h-[50dvh] outline-0 border-0 placeholder:leading-8 placeholder:tracking-wide caret-[#f3eeff]"
        ></textarea>
      </form>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-4">
        <Link
          href="/newnote"
          className="relative w-16 aspect-square rounded-full bg-[#1a0e2b] "
        >
          <span className="absolute top-1/2 left-1/2 -translate-1/2 w-1/2 h-0.5 bg-[#5d24f1]" />
          <span className="absolute top-1/2 left-1/2 -translate-1/2 w-1/2 h-0.5 bg-[#5d24f1] rotate-90" />
        </Link>

        <div
          onClick={() => setConfirmDelete(true)}
          className="relative w-16 aspect-square rounded-full bg-[#f3eeff] "
        >
          <span className="absolute top-1/2 left-1/2 -translate-1/2 w-2/3 h-6 flex justify-center items-center">
            <RiDeleteBin6Line color="#5d24f1" className="w-full h-full" />
          </span>
        </div>
      </div>

      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            variants={{
              initial: { x: '100%', opacity: 0 },
              animate: { x: 0, opacity: 1 },
              exit: { x: '-100%', opacity: 0 },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, type: 'tween', ease: 'easeIn' }}
            className="absolute top-1/2 left-1/2 -translate-1/2 w-4/5 mx-auto h-[25vh] flex flex-col justify-center items-center backdrop-blur-3xl"
          >
            <div className="flex justify-between items-center px-4 gap-30">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="px-8 py-2 bg-[#5d24f1] rounded-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleDelete(id)}
                className="px-8 py-2 bg-[#5d24f1] rounded-sm"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {unAuthorisedDelete && (
          <motion.div
            variants={{
              initial: { x: '100%', opacity: 0 },
              animate: { x: 0, opacity: 1 },
              exit: { x: '-100%', opacity: 0 },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, type: 'tween', ease: 'easeIn' }}
            className="absolute top-1/2 left-1/2 -translate-1/2 w-4/5 mx-auto h-[25vh] flex flex-col gap-4 justify-center items-center backdrop-blur-3xl"
          >
            <h3>Cannot delete other user's notes</h3>
            <div className="flex justify-between items-center px-4 gap-30">
              <button
                type="button"
                onClick={() => setUnAuthorisedDelete(false)}
                className="px-8 py-2 bg-[#5d24f1] rounded-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EditedNote
