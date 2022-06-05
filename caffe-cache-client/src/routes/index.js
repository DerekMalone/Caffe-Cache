import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { BrewForm, CoffeeForm, MachineForm } from '../components';
import { 
  HomeView,
  MachinesView,
  MachineDetailView,
  EditMachineView,
  CoffeesView,
  EditCoffeeView,
  CoffeeDetailView,
  BrewsView,
  EditBrewView,
  BrewDetailView,
 } from '../views';

export const AppRoutes = ({ userUID }) => {
  return (
    <>
        <Routes>
            <Route path='/' element={<HomeView userUID={userUID}/>} />
            <Route path='/Machines' element={<MachinesView userUID={userUID} />} />
            <Route path='/Coffees' element={<CoffeesView userUID={userUID} />} />
            <Route path='/Brews' element={<BrewsView userUID={userUID} />} />
            <Route path='/MachineForm' element={<MachineForm />} /> 
            <Route path='/CoffeeForm' element={<CoffeeForm/>} />
            <Route path='/BrewForm' element={<BrewForm/>} />
            <Route path='/EditMachine/:machineId' element={<EditMachineView />} /> 
            <Route path='/EditCoffee/:coffeeId' element={<EditCoffeeView />} /> 
            <Route path='/EditBrew/:brewId' element={<EditBrewView />} /> 
            <Route path='/MachineDetail/:machineId' element={<MachineDetailView />} />
            <Route path='/CoffeeDetail/:coffeeId' element={<CoffeeDetailView />} />
            <Route path='/BrewDetail/:brewId' element={<BrewDetailView />} />
        </Routes>
    </>
  )
}
