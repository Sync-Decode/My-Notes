'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { supabase } from '@/supabase/supabase-client'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/store'

const Signup = () => {
  const router = useRouter()

  const { setSignUpEmail } = useAuthStore()

  // State variables for form inputs
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !username || !password) {
      if (!email) {
        emailRef.current.classList.add('outline-red-500')
        console.error('Email is required')
      }
      if (!username) {
        usernameRef.current.classList.add('outline-red-500')
        console.error('Username is required')
      }
      if (!password) {
        passwordRef.current.classList.add('outline-red-500')
        console.error('Password is required')
      }
      console.error('All fields are required')
      return
    } else if (email && username && password) {
      emailRef.current.classList.remove('outline-red-500')
      usernameRef.current.classList.remove('outline-red-500')
      passwordRef.current.classList.remove('outline-red-500')

      // If all validations pass, proceed with the signup logic
      const signup = async () => {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
            },
          },
        })

        if (error) {
          console.error('Error signing up:', error.message)
          console.log('Signup data:', { email, username, password })
          return
        }

        setSignUpEmail(email)

        router.push('/verify') // Redirect to signin page after successful signup
      }

      const saveUser = async () => {
        await supabase
          .from('users')
          .insert({ username: username, email: email })
      }

      signup()
      saveUser()
    }
  }
  // End of handle form submission
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full min-h-fit max-w-3xl flex flex-col  px-5 mx-auto gap-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-100 mx-auto"
      >
        <input
          ref={usernameRef}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-4 rounded-bl-2xl rounded-tr-2xl border-none outline outline-[#f1eeff] focus:outline-[#5d24f1]"
          type="text"
          placeholder="username"
        />
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
          Sign up
        </button>

        <div className="text-center flex justify-center items-center gap-2">
          <p className="text-sm">Already have an account?</p>
          <Link href="/signin" className="text-sm font-bold text-[#5d24f1]">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
