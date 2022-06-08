import { array } from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBrew,
  editBrew,
  getBrewById,
  getCoffeesByUid,
  getMachineById,
  getMachinesByUid,
} from "../data";
import auth from "../data/auth/firebaseConfig";
import { getBrewMachineCoffee } from "../data/brewData";

const initialState = {
  name: "",
  grindSize: "",
  coffeeWeight: 0,
  waterVolume: 0,
  brewTemp: 0,
  brewDurationHour: 0,
  brewDurationMin: 0,
  brewDurationSec: 0,
  brewInstructions: "",
  userId: "",
  machineId: "",
  coffeeId: "",
};

export const BrewForm = () => {
  const [formInput, setFormInput] = useState({});
  const [machines, setMachines] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [brewsMachine, setBrewsMachine] = useState(null);
  const [brewsCoffee, setBrewsCoffee] = useState(null);
  const [editBrewMachine, setEditBrewMachine] = useState({});
  const [editBrewCoffee, setEditBrewCoffee] = useState({});
  const [uid, setUID] = useState(null);
  const { brewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (brewId) {
      getBrewMachineCoffee(brewId).then((array) => {
        const brew= array[0];
        const machine = array[1];
        const coffee = array[2];        
        setFormInput({
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
        setEditBrewMachine({
          name: machine.name,
          userId: machine.userId
        })
        setEditBrewCoffee({
          brand: coffee.brand,
          name: coffee.name,
          roastType: coffee.roastType,
          userId: coffee.userId
        })    
        setBrewsMachine(machine.id);
        setBrewsCoffee(coffee.id);    
      })  
      const currentUID = auth.currentUser?.uid;
      setUID(currentUID);
      getMachinesByUid(currentUID).then(setMachines);
      getCoffeesByUid(currentUID).then(setCoffees);    
    } else {
      const currentUID = auth.currentUser?.uid;
      setUID(currentUID);
      getMachinesByUid(currentUID).then(setMachines);
      getCoffeesByUid(currentUID).then(setCoffees);
      setFormInput(initialState);
    }
  }, []);

  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleMachineSelection = (e) => {
    const value = e.target.value;
    setBrewsMachine(value);
  };

  const handleCoffeeSelection = (e) => {
    const value = e.target.value;
    setBrewsCoffee(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brewId) {
      editBrew(brewId,
            ({
              ...formInput, 
              machineId: brewsMachine,
              coffeeId: brewsCoffee,
            })
            ).then(() => {
            resetForm();
            navigate("/");
          });
    } else {
      addBrew({
        ...formInput,
        userId: uid,
        machineId: brewsMachine,
        coffeeId: brewsCoffee,
      }).then(() => {
        resetForm();
        navigate("/");
      });
    }
  };

  return (
    <>
      <h1>Add Brew Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='name'
            value={formInput.name || ""}
            onChange={handleChange}
            placeholder='Brew Name'
            required
          />
        </div>
        <div>
          <input
            type='text'
            name='grindSize'
            value={formInput.grindSize || ""}
            onChange={handleChange}
            placeholder='Brew Grind Size'
            required
          />
        </div>
        <div>
          <input
            type='number'
            name='coffeeWeight'
            value={formInput.coffeeWeight || ""}
            onChange={handleChange}
            placeholder='Brew Coffee Weight'
            required
          />
        </div>
        <div>
          <input
            type='number'
            name='waterVolume'
            value={formInput.waterVolume || ""}
            onChange={handleChange}
            placeholder='Brew Water Volume'
            required
          />
        </div>
        <div>
          <input
            type='number'
            name='brewTemp'
            value={formInput.brewTemp || ""}
            onChange={handleChange}
            placeholder='Brew Brew Temp'
            required
          />
        </div>
        <div className='timeBox'>
          <p>Hours : Min : Sec</p>
          <input
            type='number'
            min={0}
            max={99}
            name='brewDurationHour'
            value={formInput.brewDurationHour || "0"}
            onChange={handleChange}
            required
          />
          <input
            type='number'
            min={0}
            max={99}
            name='brewDurationMin'
            value={formInput.brewDurationMin || "0"}
            onChange={handleChange}
            required
          />
          <input
            type='number'
            min={0}
            max={99}
            name='brewDurationSec'
            value={formInput.brewDurationSec || "0"}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            type='text'
            name='brewInstructions'
            value={formInput.brewInstructions || ""}
            onChange={handleChange}
            placeholder='Brew Nrew Instructions'
            required
          />
        </div>
        {brewId ? (
          // ''
          <div>
            <label>
              Choose a Machine
              <select
                placeholder='Choose Machine'
                onChange={handleMachineSelection}
              >
                <option value={editBrewMachine.id} disabled selected hidden>
                  {editBrewMachine.name} 
                </option>
                {machines.map((machine) => (
                  <option name='machineId' value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : (
          <div>
            <label>
              Choose a Machine
              <select
                placeholder='Choose Machine'
                onChange={handleMachineSelection}
              >
                <option value='' disabled selected hidden>
                  Choose a Machine
                </option>
                {machines.map((machine) => (
                  <option name='machineId' value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}


{brewId ? (
          // ''
          <div>
            <label>
              Choose a Coffee
              <select
                placeholder='Choose Coffee'
                onChange={handleCoffeeSelection}
              >
                <option value={editBrewCoffee.id} disabled selected hidden>
                  {editBrewCoffee.name} 
                </option>
                {coffees.map((coffee) => (
                  <option name='coffeeId' value={coffee.id}>
                    {coffee.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : (
          <div>
          <label>
            Choose a Coffee
            <select
              placeholder='Choose Coffee'
              onChange={handleCoffeeSelection}
            >
              <option value='' disabled selected hidden>
                Choose a Coffee
              </option>
              {coffees.map((coffee) => (
                <option name='coffeeId' value={coffee.id}>
                  {coffee.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        )}        
        <button type='submit' className='btn btn-success'>
          Submit
        </button>
      </form>
    </>
  );
};

// onSelect={handleMachineSelection}
