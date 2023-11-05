import React from 'react'

export default function WhyUsCard(props) {

  return (
    <>
      <div className='w-[280px] p-6 flex flex-col gap-4 border-[1px] border-[#D0D0D0] rounded-lg'>
        <img src={props.image} alt={props.alt} className='w-8'/>
        <h6 className='font-bold text-lg'>{props.title}</h6>
        <p>{props.desc}</p>
      </div>
    </>
  )
}
