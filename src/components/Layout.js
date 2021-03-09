import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

export const Layout = (props) => (
    // <Grid columns='equal'>
    //     <Grid.Column>
    //     </Grid.Column>
    //     <Grid.Column width={14}>
    //         <br></br>
    //         <br></br>
    //         <br></br>
    //         {props.children}
    //     </Grid.Column>
    //     <Grid.Column>
    //     </Grid.Column>
    // </Grid>

    <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {props.children}
    </Container>
)