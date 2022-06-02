import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MachineForm } from '../components';
import { HomeView, MachinesView } from '../views';

export const AppRoutes = ({ userUID }) => {
  return (
    <>
        <Routes>
            <Route path='/' element={<HomeView userUID={userUID}/>} />
            <Route path='/Machines' element={<MachinesView userUID={userUID} />} />
            <Route path='/MachineForm' element={<MachineForm />} /> {/* userUID={userUID} */}
        </Routes>
    </>
  )
}
