import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../data/auth/firebaseConfig';
import { addCoffee, editCoffee, getCoffeeById } from '../data';

const initialState= {
  brand: '',
  name: '',
  roastType: '',
  userId: ''
};

export const CoffeeForm = () => {
  const [formInput, setFormInput] = useState({});
  const [uid, setUID] = useState(null);
  const { coffeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (coffeeId) {
      getCoffeeById(coffeeId).then((coffeeObj) => {
        setFormInput({
          brand: coffeeObj.brand,
          name: coffeeObj.name,
          roastType: coffeeObj.roastType,
          userId: coffeeObj.userId,
        })
      })
    } else {
      const currentUID = auth.currentUser?.uid;
      setUID(currentUID);
      setFormInput(initialState);
    }
  }, [])

  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((preState) => ({
      ...preState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coffeeId) {
      editCoffee(coffeeId, formInput).then(() => {
        resetForm();
        navigate('/');
      })
    } else {
      addCoffee({ ...formInput, userId: uid }).then(() => {
        resetForm();
        navigate('/');
      })
    }
  }

  return (
    <>
    <h1>Add Coffee Form</h1>
    <form onSubmit={handleSubmit}>
    <div>
      <div>
        <input 
        type='text'
        name='brand'
        value={formInput.brand || ''}
        onChange={handleChange}
        placeholder='Coffee Brand'
        required
        />
      </div>
        <input 
        type='text'
        name='name'
        value={formInput.name || ''}
        onChange={handleChange}
        placeholder='Coffee Name'
        required
        />
      </div>
      <div>
        <input 
        type='text'
        name='roastType'
        value={formInput.roastType || ''}
        onChange={handleChange}
        placeholder='Coffee Roast Type'
        required
        />
      </div>
      <button type='submit' className='btn btn-success'>
        Submit
      </button>
    </form>
  </>
  )
}
