import React, { useContext } from 'react'
import { Transition, Divider, Header, Icon, Grid, Segment } from 'semantic-ui-react'
import Spinner from '../components/Spinner'
import { NotificationFeed } from '../components/Feed'
import styled from 'styled-components'

import { useQuery } from '@apollo/client'
import { AuthContext } from '../context/auth'
import { GET_NOTIFICATIONS } from '../util/graphql'

const Styles = styled.div`
`

function Notification() {
    const { auth } = useContext(AuthContext)

    const { loading, data } = useQuery(GET_NOTIFICATIONS, {
        variables: { id: auth._id }
    })

    const { getNotifications: notifications } = data ? data : []

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={14}>
                    <Divider horizontal>
                        <Header as='h3'>
                            <Icon name='bell' />
                            Notification
                        </Header>
                    </Divider>
                    <br></br>

                    <Segment placeholder>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <Transition.Group>
                                {
                                    notifications && notifications.length > 0 ?
                                        notifications.map(notification => (
                                            <>
                                                <NotificationFeed key={notification._id} notification={notification} />
                                                <Divider />
                                            </>
                                        )) : (
                                            <Header icon>
                                                <Icon name='bell slash' />
                                                No notifications yet
                                            </Header>)
                                }
                            </Transition.Group>
                        )}
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
            </Grid>
        </Styles >
    )
}


export default Notification