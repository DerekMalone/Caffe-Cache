import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MachineForm } from '../components';
import { EditMachineView, HomeView, MachineDetailView, MachinesView } from '../views';

export const AppRoutes = ({ userUID }) => {
  return (
    <>
        <Routes>
            <Route path='/' element={<HomeView userUID={userUID}/>} />
            <Route path='/Machines' element={<MachinesView userUID={userUID} />} />
            <Route path='/MachineForm' element={<MachineForm />} /> {/* userUID={userUID} */}
            <Route path='/EditMachine/:machineId' element={<EditMachineView />} /> {/* userUID={userUID} */}
            <Route path='/Machine/Detail/:machineId' element={<MachineDetailView />} />
        </Routes>
    </>
  )
}
