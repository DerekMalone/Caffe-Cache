import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../data/auth/firebaseConfig';

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
      // getMachineById().then((machineObj) => {
          // setFormInput({
            // name: machineObj.name,
            // userId: machineObj.userId,
          // });
      // });
    }
    else{
      const currentUID = auth.currentUser?.uid;
      setUID(currentUID);
      setFormInput(initialState);
    }
  }, [])

  const handleSubmit = () => {

  }

  return (
  <>
    <h1>Add Machine Form</h1>
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        
      />
    </form>
  </>
  )
}
