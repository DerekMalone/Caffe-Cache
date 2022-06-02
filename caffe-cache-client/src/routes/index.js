import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { HomeView, MachinesView } from '../views';

export const AppRoutes = ({ user }) => {
  return (
    <>
        <Routes>
            <Route path='/' element={<HomeView />} />
            <Route path='/Machines' element={<MachinesView user={user} />} />
        </Routes>
    </>
  )
}
