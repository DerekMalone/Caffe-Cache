import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BrewForm } from '../components';
import { getBrewById } from '../data';

export const EditBrewView = () => {
  const {brewId} = useParams();
  const [brew, setBrew] = useState({});

  useEffect(() => {
    getBrewById(brewId).then(setBrew);
  },[])

  return ( 
    <>
    <h2>Edit Brew View</h2>
    <div>
      <BrewForm brew={brew} />
    </div>
    </>
  )
}
