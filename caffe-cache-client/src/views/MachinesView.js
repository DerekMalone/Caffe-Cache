import React, { useEffect, useState } from 'react';
import { getMachinesByUid } from '../data/MachineData';
import getCurrentUserUid from '../data/userHelper';

export const MachinesView = () => {
  const [machines, setMachines] = useState([]);
  const [uid, setUID] = useState(null);

  useEffect(() => {
    const uid = getCurrentUserUid().then();
    getMachinesByUid(uid).then((machineArray) => setMachines(machineArray))
  }, [])

  return (
    <>
    <div>MachinesView</div>
    {machines.map((machine) => (
      <h3>
        {machine.name}

      </h3>
    ))}
    </>
  )
}