import React, { useEffect } from 'react'
import { useContext } from 'react';
import { CarContext } from '../context/CarContext';
import Button from '../components/Button';

export default function SearchCarPage() {

  const {cars, setCars} = useContext(CarContext);

  useEffect(() => {
    setCars();
  }, [])

  const filterData = () => {
    const filter = (i) => i.available
    const dataFilter = cars.filter(filter)
    console.log(dataFilter)
  }

  return (
    <>
      {/* <Button text={'Search'} onClick={filterData}/> */}
    </>
  )
}
