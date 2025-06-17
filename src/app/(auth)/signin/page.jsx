'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/supabase/supabase-client'
import { useRouter } from 'next/navigation'

const Signin = () => {
  const router = useRouter()
  // State variables for form inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  //Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      if (!email) {
        emailRef.current.classList.add('outline-red-500')
        console.error('Username is required')
      }
      if (!password) {
        passwordRef.current.classList.add('outline-red-500')
        console.error('Password is required')
      }
      console.error('All fields are required')

      return
    } else if (email && password) {
      emailRef.current.classList.remove('outline-red-500')
      passwordRef.current.classList.remove('outline-red-500')

      //If all validations pass, proceed with the signin logic
      const signin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })

        if (error) {
          console.error('Error signing in:', error.message)
          console.log('Signin data:', { email, password })
          return
        }

        router.push('/') // Redirect to home page after successful signin
        return
      }

      signin()
    }
  }
  //End of handle form submission
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full min-h-fit max-w-3xl flex flex-col  px-5 mx-auto gap-3">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 w-100 mx-auto"
      >
        <input
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 rounded-bl-2xl rounded-tr-2xl border-none outline outline-[#f1eeff] focus:outline-[#5d24f1]"
          type="email"
          placeholder="email"
        />

        <input
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-bl-2xl rounded-tr-2xl border-none outline outline-[#f1eeff] focus:outline-[#5d24f1]"
          type="password"
          placeholder="password"
        />

        <button
          className="p-4 rounded-bl-2xl rounded-tr-2xl bg-[#5d24f1]"
          type="submit"
        >
          Sign in
        </button>

        <div className="text-center flex justify-center items-center gap-2">
          <p className="text-sm">Don't have an account?</p>
          <Link href="/signup" className="text-sm font-bold text-[#5d24f1]">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signin
