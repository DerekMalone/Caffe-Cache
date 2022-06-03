import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../data/auth/firebaseConfig';
import { getMachineById, addMachine, editMachine } from '../data/machineData'

const initialState = {
    name: '',
    userId: ''
}

export const MachineForm = () => {
  const [formInput, setFormInput] = useState({});
  const [uid, setUID] = useState(null);
  const { machineId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (machineId) {
      getMachineById(machineId).then((machineObj) => {
          setFormInput({
            name: machineObj.name,
            userId: machineObj.userId,
          });
      });
    }
    else{
      const currentUID = auth.currentUser?.uid;
      setUID(currentUID);
      setFormInput(initialState);
    }
  }, [])

  const resetForm = () => {
    setFormInput({...initialState});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (machineId) {
      editMachine(machineId, formInput).then(() => {
        resetForm();
        navigate('/');
      })
    } else {
      addMachine({ ...formInput, userId: uid }).then(() => {
          resetForm();
          navigate('/');
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
    <h1>Add Machine Form</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <input 
        type='text'
        name='name'
        value={formInput.name || ''}
        onChange={handleChange}
        placeholder='Machine Name'
        required
        />
      </div>
      <button type='submit' className='btn btn-success'>
        Submit
      </button>
    </form>
  </>
  )
}
