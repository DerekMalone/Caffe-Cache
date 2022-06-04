import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCoffeeById } from '../data';

export const CoffeeDetailView = () => {
  const { coffeeId } = useParams();
  const [coffee, setCoffee] = useState({});

  useEffect(() => {
    getCoffeeById(coffeeId).then(setCoffee)

  }, [])
  

  return (
    <>
    <h2>{coffee.name}</h2>
    <h5>{coffee.id}</h5>
    </>
  )
}
