import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { deleteCoffee } from '../data';

export const CoffeeComponent = ({ coffee }) => {
  const navigate = useNavigate();

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
    <Card body color='warning' outline>
      <CardTitle tag="h3" onClick={() => navigate(`/CoffeeDetail/${coffee.id}`)}>{coffee.brand}</CardTitle>
      <CardBody tag="h5" onClick={() => navigate(`/CoffeeDetail/${coffee.id}`)}>{coffee.name}</CardBody>
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
    </Card>
    </>
  )
}
