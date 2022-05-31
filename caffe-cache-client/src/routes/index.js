import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { HomeView } from '../views';

export const Routes = () => {
  return (
    <>
        <Switch>
            <Route exact path='/' component={() => <HomeView />} />
        </Switch>
    </>
  )
}
