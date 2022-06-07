import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBrew, editBrew, getBrewById, getCoffeesByUid, getMachinesByUid } from "../data";
import auth from "../data/auth/firebaseConfig";

const initialState = {
  name: '',
  grindSize: '',
  coffeeWeight: 0,
  waterVolume: 0,
  brewTemp: 0,
  brewDurationHour: 0,
  brewDurationMin: 0,
  brewDurationSec: 0,
  brewInstructions: '',
  userId: '',
  machineId: '',
  coffeeId: '',
};

export const BrewForm = () => {
  const [formInput, setFormInput] = useState({});
  const [machines, setMachines] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [brewsMachine, setBrewsMachine] = useState({});
  const [brewsCoffee, setBrewsCoffee] = useState({});
  const [uid, setUID] = useState(null);
  const { brewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (brewId) {
      getBrewById(brewId).then((brewObj) => {        
        setFormInput({
          name: brewObj.name,
          grindSize: brewObj.grindSize,
          coffeeWeight: brewObj.coffeeWeight,
          waterVolume: brewObj.waterVolume,
          brewTemp: brewObj.brewTemp,
          brewDurationHour: brewObj.brewDurationHour,
          brewDurationMin: brewObj.brewDurationMin,
          brewDurationSec: brewObj.brewDurationSec,
          brewInstructions: brewObj.brewInstructions,
          userId: brewObj.userId,
          machineId: brewObj.machineId,
          coffeeId: brewObj.coffeeId
        });
      });
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
    setBrewsMachine(e.target)
    // const {name, value } = e.target;
    // setBrewsMachine((preState) => ({
    //   ...preState,
    //   [name]: value,
    // }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brewId) {
      editBrew(brewId, formInput).then(() => {
        resetForm();
        navigate("/");
      });
    } else {
      addBrew({ ...formInput, userId: uid, machineId: brewsMachine }).then(() => {
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
            value={formInput.brewDurationHour || '0'}
            onChange={handleChange}
            required
          />
          <input
            type='number'
            min={0}
            max={99}
            name='brewDurationMin'
            value={formInput.brewDurationMin || '0'}
            onChange={handleChange}
            required
          />
          <input
            type='number'
            min={0}
            max={99}
            name='brewDurationSec'
            value={formInput.brewDurationSec || '0'}
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
        <div>
          <label >
            Choose a Machine
            <select>
              {machines.map((machine) => <option name='machineId' value={machine.id} onChange={handleMachineSelection} >{machine.name}</option>)}
            </select>
          </label>
        </div>
        <button type='submit' className='btn btn-success'>
          Submit
        </button>
      </form>
    </>
  );
};
