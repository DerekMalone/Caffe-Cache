import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCoffee, getCoffeeById } from '../data';
import { Button } from 'reactstrap';

export const CoffeeDetailView = () => {
  const { coffeeId } = useParams();
  const [coffee, setCoffee] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getCoffeeById(coffeeId).then(setCoffee)

  }, [])
  
  const editMachine = () => {
    navigate(`/EditCoffee/${coffee.id}`)
  }

  const handleDelete = () => {
    deleteCoffee(coffee.id, coffee.userId).then(() => {
      navigate('/');
    })
  };

  return (
    <>
    <h2>{coffee.name}</h2>
    <h5>{coffee.id}</h5>
    <Button
        type='button'
        className='btn btn-info'
        onClick={editMachine}
      >
        Edit Coffee
      </Button>
      <Button
        type='button'
        className='btn btn-warning'
        onClick={handleDelete}
      >
        Delete Coffee
      </Button>
    </>
  )
}
