import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MachineForm } from '../components';
import { getMachineById } from '../data';

export const EditMachineView = () => {
  const [ machine, setMachine ] = useState();
  const { machineId } = useParams();

  useEffect(() => {
    getMachineById(machineId).then(setMachine);
  }, []);

  return (
    <>
    <h2>EditMachineView</h2>
    <div>
      <MachineForm machine={machine} />
    </div>
    </>
  )
}
