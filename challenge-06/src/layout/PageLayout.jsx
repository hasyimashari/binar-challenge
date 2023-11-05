import React from 'react'
import { Outlet } from 'react-router-dom'

import icon_fb from '../icon/icon_facebook.png'
import icon_ig from '../icon/icon_instagram.png'
import icon_tw from '../icon/icon_twitter.png'
import icon_mail from '../icon/icon_mail.png'
import icon_twc from '../icon/icon_twitch.png'
import logo from '../icon/logo.png'
import Button from '../components/Button'

export default function PageLayout() {

  return (
    <>
      <div className='bg-[#F1F3FF]'>
        <header className='mx-20 py-4 flex justify-between'>
          <a href={'/'}>
            <img src={logo} alt="" />
          </a>

          <ul className='flex items-center gap-8'>
              <li>
                  <a href="#our-services">Our Services</a>
              </li>
              <li>
                  <a href="#why-us">Why Us</a>
              </li>
              <li>
                  <a href="#testimonial">Testimonial</a>
              </li>
              <li>
                  <a href="#faq">FAQ</a>
              </li>
              <li>
                <Button text={'Register'}/>
              </li>
          </ul>
        </header>
      </div>

      <Outlet/>

      <footer className='mx-20 my-10 flex justify-between gap-4'>
        <section className='flex flex-col gap-4'>
          <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
          <p>binarcarrental@gmail.com</p>
          <p>081-233-334-808</p>
        </section>

        <section className='flex flex-col gap-4'>
        <a href="#our-services">Our Services</a>
            <a href="#why-us">Why Us</a>
            <a href="#testimonial">Testimonial</a>
            <a href="#faq">FAQ</a>
        </section>

        <section className='flex flex-col gap-4'>
          <p>Contact with us</p>
          <div className='flex gap-2'>
            <img src={icon_fb} alt="icon_facebook" />
            <img src={icon_ig} alt="icon_instagram" />
            <img src={icon_tw} alt="icon_twitter" />
            <img src={icon_mail} alt="icon_mail" />
            <img src={icon_twc} alt="icon_twitch" />
          </div>
        </section>

        <section className='flex flex-col gap-4'>
          <p>Copyright Binar 2002</p>
          <img src={logo} alt="logo" className='w-24'/>
        </section>
      </footer>
    </>
  )
}
