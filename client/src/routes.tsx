import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Events from './modules/Events';
import Event from './modules/Event';
import SignIn from './modules/SignIn';
import MainPage from './modules/MainPage';
import MapPage from './modules/Map';

export const useRoutes = (isAuthenticated: boolean, userId: string | null): JSX.Element => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/events/map'>
                    <MapPage />
                </Route>
                <Route path="/events/:id">
                    <Event />
                </Route>
                <Route path="/events">
                    <Events />
                </Route>
                <Route path='/main/:userId'>
                    <MainPage />
                </Route>
                <Redirect to={`/main/${userId}`}/>
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <SignIn />
            </Route>
            {/* <Route path="/signup">
                <SignUp />
            </Route> */}
            <Redirect to="/" />
        </Switch>
    );
}
