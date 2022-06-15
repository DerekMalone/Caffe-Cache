import React, { useEffect, useState } from 'react'
import { BrewComponent } from '../components';
import { getBrewsByUid } from '../data/index'
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


export const BrewsView = ({ userUID }) => {
  const [brews, setBrews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBrewsByUid(userUID).then((brewsArray) => 
    setBrews(brewsArray)
    );
  }, [])
  
  const handleNavBrewForm = () => {
    navigate('/BrewForm');
  }

  return (
    <>
    <div className="view-div-style">      
    <h2 className="view-header-style">Your Brews Live Here</h2>
    <Button className="view-button-style" type='button' onClick={handleNavBrewForm}>Add New Brew</Button>
    </div>
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
