import { Button } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMachine, getMachineById } from '../data';

export const MachineDetailView = () => {
  const { machineId } = useParams();
  const [machine, setMachine] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getMachineById(machineId).then(setMachine)
  }, [])

  const onClickNav = () => {
    navigate(`/EditMachine/${machine.id}`)
  }
  
  const handleDelete = () => {
    deleteMachine(machine.id, machine.userId).then(() => {
      navigate('/')
    })
  }

  return (
    <>
    <div>MachineDetailView</div>
    <h3>{machine.name}</h3>
    <Button
          type="button"
          className="btn btn-info"
          onClick={onClickNav}
        >
          Edit Machine
        </Button>
    <Button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDelete}
        >
          Delete Machine
        </Button>
    </>
  )
}
