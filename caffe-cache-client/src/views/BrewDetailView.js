import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBrewById } from '../data';
import { deleteBrew } from '../data';
import { Button } from 'reactstrap';

export const BrewDetailView = () => {
  const {brewId} = useParams();
  const [brew, setBrew] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getBrewById(brewId).then(setBrew)
    // try to make one async call to the backend via data
    // if that doesn't work, set up async call here
  }, [])
  
const onClickNavEditBrew = () => {
  navigate(`/EditBrew/${brew.id}`)
};

const handleDelete = () => {
  deleteBrew(brew.id, brew.userId).then(() => {
    navigate('/');
  })
};

  return (
    <>
      <h3>Brew Detail View</h3>
      <h5>{brew.name}</h5>
      <p>{brew.brewInstructions}</p>
      <Button
          type="button"
          className="btn btn-info"
          onClick={onClickNavEditBrew}
        >
          Edit Brew
        </Button>
        <Button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDelete}
        >
          Delete Brew
        </Button>
    </>
  )
}
