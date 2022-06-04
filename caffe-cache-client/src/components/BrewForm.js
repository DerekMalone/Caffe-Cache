import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBrew, editBrew, getBrewById } from "../data";
import auth from "../data/auth/firebaseConfig";

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
};

export const BrewForm = () => {
  const [formInput, setFormInput] = useState({});
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
        });
      });
    } else {
      const currentUID = auth.currentUser?.uid;
      setUID(currentUID);
      setFormInput(initialState);
    }
  }, []);

  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brewId) {
      editBrew(brewId, formInput).then(() => {
        resetForm();
        navigate("/");
      });
    } else {
      addBrew({ ...formInput, userId: uid }).then(() => {
        resetForm();
        navigate("/");
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((preState) => ({
      ...preState,
      [name]: value,
    }));
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
        <div className="timeBox">
          <p>Hours    :    Min   :   Sec</p>
          <input
            type='number'
            min={0}
            max={99}
            name='brewDurationHour'
            value={parseInt(formInput.brewDurationHour) || 0}
            onChange={handleChange}
            required
          />        
          <input
            type='number'
            min={0}
            max={99}
            name='brewDurationMin'
            value={parseInt(formInput.brewDurationMin) || 0}
            onChange={handleChange}
            required
          />
          <input
            type='number'
            min={0}
            max={99}
            name='brewDurationSec'
            value={parseInt(formInput.brewDurationSec) || 0}
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
        <button type='submit' className='btn btn-success'>
          Submit
        </button>
      </form>
    </>
  );
};
