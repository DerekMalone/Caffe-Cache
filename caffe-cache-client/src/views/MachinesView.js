import React, { useEffect, useState } from "react";
import { MachineComponent } from "../components";
import { getMachinesByUid } from "../data/index";
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";


export const MachinesView = ({ userUID }) => {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMachinesByUid(userUID).then((machineArray) =>
      setMachines(machineArray)
    );
  }, []);

  const handleNavMachineForm = () => {
    navigate('/MachineForm');
  }

  return (
    <>
      <h2>MachinesView</h2>
      <Button type='button' onClick={handleNavMachineForm} >Add a New Machine</Button>
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
