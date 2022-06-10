import React, { useEffect, useState } from 'react'
import { CoffeeComponent } from '../components';
import { getCoffeesByUid } from '../data';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


export const CoffeesView = ({ userUID }) => {
  const [coffees, setCoffees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCoffeesByUid(userUID).then((coffeesArray) => 
    setCoffees(coffeesArray)
    );
  }, []);

  const handleNavCoffeeForm = () => {
    navigate('/CoffeeForm');
  }

  return (
    <>
      <h2>Coffees View</h2>
      <Button type='button' onClick={handleNavCoffeeForm}>Add New Coffee</Button>
      {coffees ? (
        <>
        {coffees.map((coffee) => (
          <div>
            <CoffeeComponent key={coffee.id} coffee={coffee} />
          </div>
        ))}
        </>
      ) : (
        <h2>Please Add Some Coffees</h2>
      )}
    </>
  )
}
