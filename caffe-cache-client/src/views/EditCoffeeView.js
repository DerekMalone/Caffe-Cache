import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CoffeeForm } from '../components';
import { getCoffeeById } from '../data';

export const EditCoffeeView = () => {
  const [coffee, setCoffee] = useState({});
  const { coffeeId } = useParams();

  useEffect(() => {
    getCoffeeById(coffeeId).then(setCoffee);
  }, [])

  return (
    <>
    <h2>EditMachineView</h2>
    <div>
      <CoffeeForm coffee={coffee} />
    </div>
    </>
  )
}
