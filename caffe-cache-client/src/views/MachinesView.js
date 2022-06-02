import React, { useEffect, useState } from "react";
import { MachineComponent } from "../components";
import { getMachinesByUid } from "../data/index";
// import getCurrentUserUid from '../data/userHelper';

export const MachinesView = ({ userUID }) => {
  const [machines, setMachines] = useState([]);
  // const [uid, setUID] = useState(null);

  useEffect(() => {
    // getCurrentUserUid().then(setUID);
    getMachinesByUid(userUID).then((machineArray) =>
      setMachines(machineArray)
    );
    console.log(userUID);
  }, []);

  return (
    <>
      <div>MachinesView</div>
      {machines ? (
        <>
          {machines.map((machine) => (
            <div>
              <MachineComponent key={machine.id} machine={machine} />              
            </div>
          ))}
        </>
      ) : (
        <h2>No Machines just yet.</h2>
      )}
    </>
  );
};
