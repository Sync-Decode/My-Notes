import { useNotes } from '@/store/store'
import { useEffect, useState } from 'react'
const FilterButton = ({ text, handleClick }) => {
  const { isTodaySelected, setIsTodaySelected, fetchNotes } = useNotes()
  const [isSelected, setIsSelected] = useState(false)
  const bgColor = isSelected ? '#5d24f1' : 'rgba(0,0,0,0)'
  return (
    <div
      onClick={() => {
        if (text.toLowerCase() === 'today') {
          const nextState = !isTodaySelected
          setIsTodaySelected(nextState)
          if (nextState) {
            fetchNotes()
          }
        }
        setIsSelected(!isSelected)
        handleClick()
      }}
      className="w-min rounded-3xl px-4 py-1 border border-[#f1eeff] cursor-pointer select-none"
      style={{ backgroundColor: bgColor }}
    >
      <span className="text-2xl">{text}</span>
      <span>{}</span>
    </div>
  )
}

export default FilterButton
