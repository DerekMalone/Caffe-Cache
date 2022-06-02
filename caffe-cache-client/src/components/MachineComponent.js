import React from 'react';
import { Button, Card, CardTitle } from 'reactstrap';

export const MachineComponent = ({ machine }) => {

  return (
    <>
    <Card body color="warning" outline>
        <CardTitle tag="h5">{machine.Name}</CardTitle>
        {/* <Link
          to={`/editteam/${team.firebaseKey}`}
          type="button"
          className="btn btn-info"
        >
          Edit Team
        </Link> */}
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
