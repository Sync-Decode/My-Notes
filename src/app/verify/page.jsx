'use client'
import { useAuthStore } from '@/store/store'
import Link from 'next/link'

const page = () => {
  const { signUpEmail } = useAuthStore()
  console.log(`sign up email: ${signUpEmail}`)
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full min-h-fit max-w-3xl flex flex-col justify-center items-center px-5 mx-auto gap-3 ">
      <div className="text-sm font-medium">
        Check your{' '}
        <Link
          href={`mailto:${signUpEmail}`}
          className="text-[#5d24f1] underline"
        >
          inbox
        </Link>{' '}
        and confirm your email address
      </div>
    </div>
  )
}

export default page
