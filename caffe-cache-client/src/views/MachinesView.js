import React, { useEffect, useState } from "react";
import { MachineComponent } from "../components";
import { getMachinesByUid } from "../data/index";
// import getCurrentUserUid from '../data/userHelper';

export const MachinesView = (user) => {
  const [machines, setMachines] = useState([]);
  // const [uid, setUID] = useState(null);

  useEffect(() => {
    // getCurrentUserUid().then(setUID);
    getMachinesByUid(user?.uid).then((machineArray) =>
      setMachines(machineArray)
    );
    console.log(machines);
  }, []);

  return (
    <>
      <div>MachinesView</div>
      {machines ? (
        <>
          {machines.map((machine) => (
            <div>
              <MachineComponent key={machine.id} machine={machine} />
              <h3 key={machine.id}>{machine.name}</h3>
            </div>
          ))}
        </>
      ) : (
        <h2>No Machines just yet.</h2>
      )}
    </>
  );
};
