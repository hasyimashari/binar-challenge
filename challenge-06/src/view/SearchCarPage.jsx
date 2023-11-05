import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { CarContext } from '../context/CarContext';

import Button from '../components/Button';
import CardCars from '../components/CardCars';
import car from '../images/img_car.png'

export default function SearchCarPage() {

  const {cars, setCars} = useContext(CarContext);
  const [filteredCars, setFilteredCars] = useState([]);
  const [afterSearch, setAfterSearch] = useState(false);
  const [capacity, setCapaity] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');

  useEffect(() => {
    setCars();
  }, []);

  const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
  }; 

  const filterData = (ev) => {

    ev.preventDefault();

    if (filteredCars) {
      setFilteredCars([]);
    };

    const dateTime = new Date(`${tanggal} ${waktu}`);
    const filter = (i) => i.available && i.capacity >= capacity && i.availableAt >= dateTime;

    const dataFilter = cars.filter(filter);
    const shuffledDataFilter = shuffle(dataFilter);

    setFilteredCars(shuffledDataFilter);
    setAfterSearch(true);
  };

  return (
    <>
      <div className='bg-[#F1F3FF]'>
        <div className='pt-16 ml-20 flex items-center gap-24'>
            <div className='relative bottom-12 flex flex-col gap-6'>
                <h1 className='text-4xl font-bold'>Sewa & Rental Mobil Terbaik di kawasan Kediri</h1>
                <p>
                    Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
                </p>
            </div>

            <img className='w-[54%]' src={car} alt="img_car" />
        </div>
      </div>

      <div className='relative -top-12 w-full flex items-center justify-center'>

        <form onSubmit={filterData} className='bg-white p-6 flex items-center justify-between gap-6 border-[1px] border-[#D0D0D0] rounded-lg shadow-[2px_2px_2px_2px_rgba(0,0,0,0.2)]'>

          <div className='w-[14rem] flex flex-col gap-1 text-sm'>
            <label htmlFor="tipe-driver" className='font-bold'>Tipe Driver</label>
            <select 
              name="tipe-driver" id="tipe-driver" 
              className='p-0.5 border-2 rounded' 
              required>
              <option value="" disabled selected>Pilih Tipe Driver</option>
              <option value="dengan-supir">Dengan Supir</option>
              <option value="tanpa-supir">Tanpa Supir ( Lepas Supir ) </option>
            </select>
          </div>

          <div className='w-[14rem] flex flex-col gap-1 text-sm'>
            <label htmlFor="tanggal" className="font-bold">Tanggal</label>
            <input type="text" 
              name="tanggal" id="tanggal" 
              placeholder="pilih tanggal" 
              className='p-0.5 border-2 rounded' 
              onFocus={(e) => e.target.type='date'} 
              onChange={(e) => setTanggal(e.target.value)}
              required />
          </div>

          <div className='w-[14rem] flex flex-col gap-1 text-sm'>
            <label htmlFor="waktu-jemput" className="font-bold">Waktu Jemput/Ambil</label>
            <select 
              name="waktu-jemput" 
              id="waktu-jemput" 
              className='p-0.5 border-2 rounded'
              onChange={(e) => setWaktu(e.target.value)}
              required>
                <option value="" disabled selected>Pilih Waktu</option>
                <option value="08:00">08.00</option>
                <option value="09:00">09.00</option>
                <option value="10:00">10.00</option>
                <option value="11:00">11.00</option>
                <option value="12:00">12.00</option>
            </select>
          </div>

          <div className='w-[14rem] flex flex-col gap-1 text-sm'>
            <label htmlFor="jumlah-penumpang" className="font-bold">Jumlah Penumpang ( Optional )</label>
            <input 
              name="jumlah-penumpang" 
              id="jumlah-penumpang" 
              type="number" 
              placeholder="Jumlah Penumpang" 
              onChange={(e) => setCapaity(e.target.value)}
              className='p-0.5 border-2 rounded' />
          </div>

          <div>
            <Button text={'Cari'} type={'submit'}/>
          </div>

        </form>

      </div>

      {filteredCars.length != 0?
        <div className='mx-20 mb-20 flex flex-wrap gap-4 items-center justify-center'>
          {filteredCars.map((cars, index) => 
                <CardCars key={index} cars={cars}/>
            )
          }
        </div>
        :
        <div className='mx-20 mb-20 flex items-center justify-center'>
          {afterSearch &&
            <h1 className='font-bold text-xl'>
              Mohon maaf, hasil pencarian mobil anda kosong
            </h1>
          }
        </div>
      }
    </>
  )
}
