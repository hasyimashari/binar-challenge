import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import WhyUsCard from '../components/whyUsCard'

import car from '../images/img_car.png'
import img_service from '../images/img_service.png'
import img_point from '../icon/img_point.png'
import icon_complete from '../icon/icon_complete.png'
import icon_price from '../icon/icon_price.png'
import icon_24hrs from '../icon/icon_24hrs.png'
import icon_professional from '../icon/icon_professional.png'
import TestimonialCard from '../components/testimonialCard'

export default function LandingPage() {

  const navigate = useNavigate();

  return (
    <>
      {/* section 1 */}
      <section className='bg-[#F1F3FF]'>
        <div className='pt-16 ml-20 flex items-center gap-24'>
            <div className='relative bottom-12 flex flex-col gap-6'>
                <h1 className='text-4xl font-bold'>Sewa & Rental Mobil Terbaik di kawasan Kediri</h1>
                <p>
                    Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
                </p>
                <div>
                  <Button text={'Mulai sewa mobil'} onClick={() => navigate('/cars')}/>
                </div>
            </div>

            <img className='w-[54%]' src={car} alt="img_car" />
        </div>
      </section>

      {/* section 2 */}
      <section id='our-services' className='mx-20 my-24 flex items-center justify-center gap-16'>
        <div className='relative left-8 w-1/2'>
          <img src={img_service} alt="img_service" />
        </div>

        <div className='w-1/2 flex flex-col gap-8'>

          <h2 className='font-bold text-4xl'>
            Best Car Rental for any kind of trip in Kediri!
          </h2>

          <p>
            Sewa mobil di Kediri bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll.
          </p>

          <ul className='flex flex-col gap-4'>
            <li className='flex gap-4'>
                <img src={img_point} alt="img_point" />
                <p>Sewa Mobil Dengan Supir di Bali 12 Jam</p>
            </li>
            <li className='flex gap-4'>
                <img src={img_point} alt="img_point" />
                <p>Sewa Mobil Lepas Kunci di Bali 24 Jam</p>
            </li>
            <li className='flex gap-4'>
                <img src={img_point} alt="img_point" />
                <p>Sewa Mobil Jangka Panjang Bulanan</p> 
            </li>
            <li className='flex gap-4'>
                <img src={img_point} alt="img_point" />
                <p>Gratis Antar - Jemput Mobil di Bandara</p> 
            </li>
            <li className='flex gap-4'>
                <img src={img_point} alt="img_point" />
                <p>Layanan Airport Transfer/Drop In Out</p>
            </li>
          </ul>

        </div>
      </section>

      {/* section 3 */}
      <section id='why-us' className='mx-20 my-24 flex flex-col gap-4'>

        <h2 className='font-bold text-4xl'>Why Us?</h2>
        <p>Mengapa harus pilih Binar Car Rental?</p>
      
        <div className='mt-8 flex flex-wrap justify-around gap-8'>

          <WhyUsCard 
            image={icon_complete}
            alt={'icon_complete'}
            title={'Mobil Lengkap'}
            desc={'Tersedia banyak pilihan mobil, Kondisi masih baru, bersih dan terawat'}
          />

          <WhyUsCard 
            image={icon_price}
            alt={'icon_price'}
            title={'Harga Murah'}
            desc={'Harga Murah dan bersain, bisa bandingkan harga kami dengan rental mobil lain'}
          />

          <WhyUsCard 
            image={icon_24hrs}
            alt={'icon_24hrs'}
            title={'Layanan 24 Jam'}
            desc={'Siap melayani kebutuhan anda selama 24 jam nonstop. Kami juga tersedia di akhir Minggu'}
          />

          <WhyUsCard 
            image={icon_professional}
            alt={'icon_professional'}
            title={'Sopir Professional'}
            desc={'Sopir yang berpengalaman, jujur, ramah, dan selalu tepat waktu'}
          />

        </div>
      </section>

      {/* section 4 */}
      <section id='testimonial' className='mx-20 my-24 flex flex-col items-center gap-8'>
        <div className="text-center">
            <h1 className="font-bold text-[2.75rem]">Testimonial</h1>
            <p>Berbagai review positif dari para pelanggan kami</p>
        </div>

        <div className='bg-[#F1F3FF] w-4/5 py-24 border-[1px] border-[#D0D0D0] rounded-lg'>

          <div className='relative flex justify-center'>
            <TestimonialCard />
          </div>

        </div>
      </section>

      {/* section 5 */}
      <section className="bg-[#0D28A6] h-[75vh] mx-20 my-24 flex items-center justify-center text-white rounded-2xl">
        <div className="w-3/5 px-[6.5rem] py-16 flex flex-col items-center gap-16 text-center">
            <h1 className="font-bold text-[2.75rem]">Sewa mobil di Kediri Sekarang</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div>
              <Button text={'Mulai sewa mobil'}/>
            </div>
        </div>
      </section>

      {/* section 6 */}
      <section id='faq' className='mx-20 my-24 flex gap-8'>
        <div className="w-2/5 flex flex-col gap-4">
            <h2 class="font-bold text-4xl">Frequently Asked Question</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>

        <div className='w-3/5 flex flex-col gap-4'>
          
          <div className='w-full px-6 py-4 border-2 border-[#D0D0D0] rounded-md'>
            <h2>
              apa saja yang dibutuhkan
            </h2>
          </div>

          <div className='w-full px-6 py-4 border-2 border-[#D0D0D0] rounded-md'>
            <h2>
              berapa hari minimal sewa mobil lepas kunci?
            </h2>
          </div>

          <div className='w-full px-6 py-4 border-2 border-[#D0D0D0] rounded-md'>
            <h2>
              berapa hari sebelumnya sebaiknya booking sewa mobil?
            </h2>
          </div>

          <div className='w-full px-6 py-4 border-2 border-[#D0D0D0] rounded-md'>
            <h2>
              apakah ada biaaya antar jemput?
            </h2>
          </div>

          <div className='w-full px-6 py-4 border-2 border-[#D0D0D0] rounded-md'>
            <h2>
              bagaimana jika terjadi kecelakaan?
            </h2>
          </div>

        </div>

      </section>
    </>
  )
}
