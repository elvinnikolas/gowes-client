import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function AdminRoute({ component: Component, ...rest }) {
    const { auth } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={(props) =>
                auth && auth.isAdmin ?
                    <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
}

export default AdminRoute