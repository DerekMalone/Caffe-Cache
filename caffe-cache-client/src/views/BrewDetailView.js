import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBrewById } from '../data';

export const BrewDetailView = () => {
  const {brewId} = useParams();
  const [brew, setBrew] = useState({});

  useEffect(() => {
    getBrewById(brewId).then(setBrew)
  }, [])

  return (
    <>
      <h3>Brew Detail View</h3>
      <h5>{brew.name}</h5>
      <p>{brew.brewInstructions}</p>
    </>
  )
}
