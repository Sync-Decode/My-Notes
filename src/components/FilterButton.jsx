'use client'
import { useFilter, useNotes } from '@/store/store'
import { useState } from 'react'

const FilterButton = ({ text, handleClick }) => {
  const { isTodaySelected, fetchNotes } = useNotes()
  const { setIsTodaySelected } = useFilter()
  const [isSelected, setIsSelected] = useState(false)
  const bgColor = isSelected ? '#5d24f1' : 'rgba(0,0,0,0)'
  return (
    <div
      onClick={() => {
        if (text.toLowerCase() === 'today') {
          setIsTodaySelected((prev) => !prev)
          const nextState = isTodaySelected
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
