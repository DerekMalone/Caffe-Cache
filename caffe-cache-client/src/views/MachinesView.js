import React, { useEffect, useState } from "react";
import { MachineComponent } from "../components";
import { getMachinesByUid } from "../data/index";

export const MachinesView = ({ userUID }) => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    getMachinesByUid(userUID).then((machineArray) =>
      setMachines(machineArray)
    );
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
