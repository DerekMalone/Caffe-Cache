import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getMachineById } from '../data';

export const MachineDetailView = () => {
  const { machineId } = useParams();
  const [machine, setMachine] = useState({});

  useEffect(() => {
    getMachineById(machineId).then(setMachine)
  }, [])
  

  return (
    <>
    <div>MachineDetailView</div>
    <h3>{machine.name}</h3>
    </>
  )
}
