import React from 'react'
import { Route, Redirect } from 'react-router-dom'

interface ProtectedRoute {
    component: any;
    user: any;
    path: string;
    coords: any;
    exact: boolean
}
export const ProtectedRoute = ({ coords, path, exact, component: Component, user }: ProtectedRoute) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            user ? (
                <Component user={user} {...props} coords={coords} lat={coords.latitude} lng={coords.longitude} />
            ) : (
                    <Redirect
                        to="/signin"
                    />
                )
        }
    />
)

interface GuestRoute {
    component: any;
    user: any;
    path: string;
    exact: boolean
}
export const GuestRoute = ({ path, exact, component: Component, user }: GuestRoute) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            !user ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to="/"
                    />
                )
        }
    />
)
