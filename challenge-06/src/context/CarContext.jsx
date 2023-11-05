import { createContext, useState } from "react";

export const CarContext = createContext();

const CarContextProvider = (props) => {

  const [cars, _setCars] = useState([])

  // default funtion from challenge 2
  const  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // default funtion from challenge 2
  const populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator))

      return {
        ...car,
        availableAt,
      };
    });
  };

  const getCars = async() => {
    try {
      const data = await fetch("https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.json");
      return data.json();

    } catch (error) {
      console.log(error.message);
    };
  };

  const setCars = async() => {
    try {
      const carsData = await getCars();
      const populatedCarsData = populateCars(carsData);

      _setCars(populatedCarsData);

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <CarContext.Provider value={{
      cars,
      setCars,
    }}>
      {props.children}
    </CarContext.Provider>
  )
};

export default CarContextProvider;