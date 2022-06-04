import React, { useEffect, useState } from 'react'
import { CoffeeComponent } from '../components';
import { getCoffeesByUid } from '../data';

export const CoffeesView = ({ userUID }) => {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    getCoffeesByUid(userUID).then((coffeesArray) => 
    setCoffees(coffeesArray)
    );
  }, []);

  return (
    <>
      <div>Coffees View</div>
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
