import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export const HomeView = ({ userUID }) => {
  const navigate = useNavigate();
  
  const handleNavMachineForm = () => {
    navigate('/MachineForm');
  }

  const handleNavCoffeeForm = () => {
    navigate('/CoffeeForm');
  }

  const handleNavBrewForm = () => {
    navigate('/BrewForm');
  }

  return (
    <>
      <h1>HomeView</h1>
    <ul>
      <li className='no-bullets'>        
      <Button type='button' onClick={handleNavMachineForm}>Add New Machine</Button>
      </li>
      <li className='no-bullets'>        
      <Button type='button' onClick={handleNavCoffeeForm}>Add New Coffee</Button>
      </li>
      <li className='no-bullets'>        
      <Button type='button' onClick={handleNavBrewForm}>Add New Brew</Button>
      </li>
    </ul>
    </>
  )
}
