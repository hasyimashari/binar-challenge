import React from 'react'

import Button from './Button'
import user from '../icon/users_icon.png'
import setting from '../icon/settings_icon.png'
import calendar from '../icon/calendar_icon.png'

export default function CardCars(props) {
  return (
      <div className='w-[20rem] h-[32.5rem] p-6 flex flex-col gap-4 border-[1px] border-[#D0D0D0] rounded-2xl'>
      <div className='flex h-2/5'>
        <img src={`http://localhost:5173/src/${props.cars.image}`} alt={props.cars.image} className='h-40 m-auto rounded-lg' />
      </div>
      
      <div className='max-h-3/5 h-min flex flex-col gap-2 text-[.95rem]'>
        <p>
          {props.cars.manufacture} {props.cars.model} / {props.cars.type}
        </p>

        <p className='font-bold text-lg'>
          RP {props.cars.rentPerDay} / Hari
        </p>

        <p>
          {props.cars.description}
        </p>

        <div className='flex gap-2'>
          <img src={user} alt="users_icon" className='h-full'/>
          <p>
            {props.cars.capacity} orang
          </p>
        </div>

        <div className='flex gap-2'>
          <img src={setting} alt="settings_icon" className='h-full'/>
          <p>
            {props.cars.transmission}
          </p>
        </div>

        <div className='flex gap-2'>
          <img src={calendar} alt="calendar_icon" className='h-full'/>
          <p>
            Tahun {props.cars.year}
          </p>
        </div>

        <Button text={'pilih mobil'}/>

      </div>
    </div>
  )
}
