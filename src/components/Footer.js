import React from 'react'
import {
    Container,
    List,
    Segment,
} from 'semantic-ui-react'
import { IoMdBicycle } from 'react-icons/io'

export const Footer = () => (
    <div>
        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '4em 0em' }} attached='bottom'>
            <Container textAlign='center'>
                <div className="logo">
                    <IoMdBicycle color='rgb(206, 206, 206)' style={{ fontSize: 24, marginRight: 5 }}></IoMdBicycle>
                    Gowes
                </div>
                <br></br>
                <span>Made with <span class="heart">♥</span> by EN</span>
                <br></br>
                <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='#'>
                        Site Map
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Contact Us
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Terms and Conditions
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Privacy Policy
                    </List.Item>
                </List>
            </Container>
        </Segment>
    </div>
)