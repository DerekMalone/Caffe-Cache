import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardTitle } from 'reactstrap';

export const MachineComponent = ({ machine }) => {
  const navigate = useNavigate();

  const onClickNav = () => {
    navigate(`/EditMachine/${machine.id}`)
  }

  return (
    <>
    <Card body color="warning" outline>
        <CardTitle tag="h5" onClick={() => navigate(`/Machine/Detail/${machine.id}`)}>{machine.name}</CardTitle>
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
          // onClick={handleDelete}
        >
          I dont do Anything Yet
        </Button>
      </Card>
    </>
  )
}
