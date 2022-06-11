import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBrewById } from '../data';
import { deleteBrew } from '../data';
import { Button } from 'reactstrap';
import { getBrewMachineCoffee } from '../data/brewData';

export const BrewDetailView = () => {
  const {brewId} = useParams();
  const [brew, setBrew] = useState({});
  const [brewMachine, setBrewMachine] = useState({});
  const [brewCoffee, setBrewCoffee] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // getBrewById(brewId).then(setBrew)
    getBrewMachineCoffee(brewId).then((array) => {
      const brew= array[0];
      const machine = array[1];
      const coffee = array[2];        
      setBrew({
            name: brew.name,
            grindSize: brew.grindSize,
            coffeeWeight: brew.coffeeWeight,
            waterVolume: brew.waterVolume,
            brewTemp: brew.brewTemp,
            brewDurationHour: brew.brewDurationHour,
            brewDurationMin: brew.brewDurationMin,
            brewDurationSec: brew.brewDurationSec,
            brewInstructions: brew.brewInstructions,
            userId: brew.userId,
            machineId: brew.machineId,
            coffeeId: brew.coffeeId,
          })
          setBrewMachine({
        name: machine.name,
        userId: machine.userId
      })
      setBrewCoffee({
        brand: coffee.brand,
        name: coffee.name,
        roastType: coffee.roastType,
        userId: coffee.userId
      })
    })
  }, [])
  
const onClickNavEditBrew = () => {
  navigate(`/EditBrew/${brew.id}`)
};

const handleDelete = () => {
  deleteBrew(brew.id, brew.userId).then(() => {
    navigate('/');
  })
};

  return (
    <>
      <h3>Brew Detail View</h3>
      <h5>{brew.name}</h5>
      <p>{brew.brewInstructions}</p>
      <Button
          type="button"
          className="btn btn-info"
          onClick={onClickNavEditBrew}
        >
          Edit Brew
        </Button>
        <Button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDelete}
        >
          Delete Brew
        </Button>
      <hr/>
      <div>
        <section>          
          <h5>Coffee</h5>
          <p>{brewCoffee.name}</p>
        </section>
        
        <section>          
          <h5>Machine</h5>
          <p>{brewMachine.name}</p>
        </section>
      </div>
    </>
  )
}
