import React from 'react'

import icon_rate from '../icon/Rate.png'
import img_photo from '../images/img_photo.png'

export default function TestimonialCard() {
  return (
    <>
      <div className='w-3/5 flex items-center gap-4'>
        <img src={img_photo} alt="img_photo" className='w-20 h-20' />
        <div class="flex flex-col gap-4 items-baseline">
            <img src={icon_rate} alt="Rate" />
            <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”</p>
            <p>John Dee 32, Bromo</p>
        </div>
      </div>
    </>
  )
}
