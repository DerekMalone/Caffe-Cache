import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button,Card, CardTitle } from 'reactstrap';
import { deleteBrew } from '../data';

export const BrewComponent = ({ brew }) => {
  const navigate = useNavigate();

const onClickNavEditBrew = () => {
  navigate(`/EditBrew/${brew.id}`)
};

  return (
    <>
    <Card body color="warning" outline>
        <CardTitle tag="h5" onClick={() => navigate(`/BrewDetail/${brew.id}`)}>{brew.name}</CardTitle>
        <Button
          type="button"
          className="btn btn-info"
          onClick={onClickNavEditBrew}
        >
          Edit Brew
        </Button>
      </Card>
    </>
  )
}
