import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button className='bg-[#5CB85F] text-white px-4 py-1 rounded-md border-green-600 border-[1px] hover:brightness-90' onClick={props.onClick}>{props.text}</button>
    </div>
  )
}
