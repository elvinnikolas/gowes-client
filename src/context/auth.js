import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    auth: null
}

if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(localStorage.getItem('token'))

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
    } else {
        initialState.auth = decodedToken
    }
}

const AuthContext = createContext({
    auth: null,
    login: (authData) => { },
    update: (authData) => { },
    logout: () => { }
})

function authReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                auth: payload
            }
        case 'LOGOUT':
            return {
                ...state,
                auth: null
            }
        case 'UPDATE':
            return {
                ...state,
                auth: payload
            }
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    function login(authData) {
        localStorage.setItem('token', authData.token)
        dispatch({
            type: 'LOGIN',
            payload: authData
        })
    }
    function logout() {
        localStorage.removeItem('token')
        dispatch({
            type: 'LOGOUT'
        })
    }
    function update(authData) {
        localStorage.setItem('name', authData.name)
        dispatch({
            type: 'UPDATE',
            payload: authData
        })
    }

    return (
        <AuthContext.Provider
            value={{ auth: state.auth, login, logout, update }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }