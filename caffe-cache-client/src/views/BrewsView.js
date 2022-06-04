import React, { useEffect, useState } from 'react'
import { BrewComponent } from '../components';
import { getBrewsByUid } from '../data/index'

export const BrewsView = ({ userUID }) => {
  const [brews, setBrews] = useState([]);

  useEffect(() => {
    getBrewsByUid(userUID).then((brewsArray) => 
    setBrews(brewsArray)
    );
  }, [])
  

  return (
    <>
    <h1>Brews View</h1>
    {brews ? (
      <>
      {brews.map((brew) => (
        <div>
          <BrewComponent key={brew.id} brew={brew} />
        </div>
      ))}
      </>
    ) : (
      <h3>No Brews Created Just Yet</h3>
    )}
    </>
  )
}
