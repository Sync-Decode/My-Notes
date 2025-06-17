import dayjs from 'dayjs'
import Link from 'next/link'
const Note = ({ title, note, created_at, id }) => {
  const formatted = dayjs(created_at).format('h:mm A')
  return (
    <Link
      href={`/edit/${id}`}
      className="bg-[#f3eeff] text-[#1a0e2b] w-full h-fit max-h-[100vh] rounded-sm rounded-bl-3xl rounded-tr-3xl overflow-hidden flex flex-col justify-start items-start gap-8 break-inside-avoid p-4 mb-4 "
    >
      <div className="w-full flex justify-between items-start">
        <h1 className='max-w-[12ch]  text-[#5d24f1] text-xl font-medium leading-[1.1]'>{title}</h1>
        <h3 className='text-sm font-light'>{formatted}</h3>
      </div>
      <p>{note}</p>
    </Link>
  )
}

export default Note
