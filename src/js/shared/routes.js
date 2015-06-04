import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import AppHandler from './components/AppHandler';
import UserHandler from './components/UserHandler';

export default (
    <Route handler={AppHandler}>
        <Route name="users" path="/users/:page" handler={UserHandler}/>
    </Route>
);
