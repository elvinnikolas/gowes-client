import React from 'react'
import { Container } from 'semantic-ui-react'

export const Layout = (props) => (
    <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {props.children}
    </Container>
)