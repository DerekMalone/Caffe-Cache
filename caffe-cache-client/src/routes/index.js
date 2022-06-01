import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { HomeView } from '../views';

export const AppRoutes = () => {
  return (
    <>
        <Routes>
            <Route exact path='/' component={() => <HomeView />} />
        </Routes>
    </>
  )
}
