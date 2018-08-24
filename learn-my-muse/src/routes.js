import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Map from './components/Map/Map';
import Results from './components/Results/Results';
import Teacher from './components/Teacher/Teacher';
import MapDirections from './components/Map/MapDirections';
import User from './components/User/User'

export default (
    <Switch>
        <Route component={Home} exact path='/'/>
        <Route component={Map} exact path='/map'/>
        <Route component={Results} path='/results' />
        <Route component={Teacher} path='/teacher/:id' />
        <Route component={MapDirections} path='/map/:id' />
        <Route component={User} path='/user'/>
    </Switch>
)
