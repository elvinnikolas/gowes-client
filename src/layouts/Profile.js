import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Segment, Image, Item, Divider, Card, Icon, Header, Transition, Button, Container } from 'semantic-ui-react'

import styled from 'styled-components'
import { ThreadExplore } from '../components/Thread'
import Spinner from '../components/Spinner'

import gowes from '../assets/gowes.jpg'

import { AuthContext } from '../context/auth'
import { useQuery, useMutation } from '@apollo/client'
import { FETCH_QUERY_PROFILE, GET_CHATS, NEW_CHAT } from '../util/graphql'

const Styles = styled.div`
`

export function UserProfile() {

    const { auth } = useContext(AuthContext)
    let id = auth._id

    const { loading, data, refetch } = useQuery(FETCH_QUERY_PROFILE, {
        variables: { id }
    })
    const { getUser: user, getUserPosts: posts, getUserCommunities: communities } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        const { name, bio, image } = user

        return (
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='user' />
                                    Profile
                                </Header>
                        </Divider>
                        <br></br>

                        <Card.Group>
                            <Image circular size='small' src={image} />
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        {name}
                                    </Card.Header>
                                    <Card.Description>
                                        {bio}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Link to='/edit-profile'>
                                        <Button primary>Edit Profile</Button>
                                    </Link>
                                </Card.Content>
                            </Card>
                        </Card.Group>

                        <br></br><br></br><br></br>
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='group' />
                                Communities
                            </Header>
                        </Divider>
                        <br></br>

                        {communities && communities.length > 0 ?
                            (<Card.Group itemsPerRow={6} centered textAlign='center'>
                                {communities.map(community => (
                                    <Card raised
                                        as={Link}
                                        to={`/community/${community.community._id}`}
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                    >
                                        <Image src={gowes}></Image>
                                        <Card.Content textAlign='center'>
                                            <Card.Description>
                                                {community.community.name}
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </Card.Group>) : (
                                <Segment placeholder>
                                    <Header icon>
                                        <Icon name='user cancel' />
                                        No community yet
                                    </Header>
                                </Segment>
                            )
                        }

                        <br></br><br></br><br></br>
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='edit' />
                                Threads
                            </Header>
                        </Divider>
                        <br></br>

                        <Segment placeholder>
                            {posts && posts.length > 0 ?
                                (<Item.Group divided>
                                    <Transition.Group>
                                        {
                                            posts &&
                                            posts.map(post => (
                                                <ThreadExplore key={post._id} post={post} refetch={refetch} />
                                            ))
                                        }
                                    </Transition.Group>
                                </Item.Group>) : (
                                    <Header icon>
                                        <Icon name='edit' />
                                        No threads yet
                                    </Header>
                                )
                            }
                        </Segment>

                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles >
        )
    }
}

export function Profile(props) {

    const { auth } = useContext(AuthContext)
    let userId = auth._id

    let id = props.match.params.id

    let history = useHistory()

    const { loading, data, refetch } = useQuery(FETCH_QUERY_PROFILE, {
        variables: { id }
    })
    const { getUser: user, getUserPosts: posts, getUserCommunities: communities } = data ? data : []

    const [newChat] = useMutation(NEW_CHAT, {
        variables: { to: id },
        update() {
            history.push('/chat')
        },
        refetchQueries: [{
            query: GET_CHATS
        }],
        awaitRefetchQueries: true
    })

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        const { name, bio, image } = user

        return (
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={12}>

                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='user' />
                                Profile
                            </Header>
                        </Divider>
                        <br></br>

                        <Grid columns='equal'>
                            <Grid.Column>
                            </Grid.Column>

                            <Grid.Column width={8}>
                                <Card.Group>
                                    <Card fluid>
                                        <Card.Content centered textAlign='center'>
                                            <Image circular size='small' src={image} />
                                            <br></br><br></br>
                                            <Card.Header>{name}</Card.Header>
                                            <Divider />
                                            <Card.Description>
                                                {bio}
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                    <br></br>
                                    {userId !== id ?
                                        <Container textAlign='center'>
                                            <Button primary onClick={() => newChat()}>
                                                <Icon name='chat' />
                                            Send message
                                        </Button>
                                        </Container> : []
                                    }
                                </Card.Group>
                            </Grid.Column>

                            <Grid.Column>
                            </Grid.Column>
                        </Grid>

                        <br></br><br></br><br></br>
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='group' />
                                Communities
                            </Header>
                        </Divider>
                        <br></br>

                        {communities && communities.length > 0 ?
                            (<Card.Group itemsPerRow={6} centered textAlign='center'>
                                {communities.map(community => (
                                    <Card raised
                                        as={Link}
                                        to={`/community/${community.community._id}`}
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                    >
                                        <Image src={gowes}></Image>
                                        <Card.Content textAlign='center'>
                                            <Card.Description>
                                                {community.community.name}
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </Card.Group>) : (
                                <Segment placeholder>
                                    <Header icon>
                                        <Icon name='user cancel' />
                                        No community yet
                                    </Header>
                                </Segment>
                            )
                        }

                        <br></br><br></br><br></br>
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='edit' />
                                Threads
                            </Header>
                        </Divider>
                        <br></br>

                        <Segment placeholder>
                            <Item.Group divided>
                                {posts && posts.length > 0 ?
                                    (<Transition.Group>
                                        {
                                            posts &&
                                            posts.map(post => (
                                                <ThreadExplore key={post._id} post={post} refetch={refetch} />
                                            ))
                                        }
                                    </Transition.Group>) : (
                                        <Header icon>
                                            <Icon name='edit' />
                                            No threads yet
                                        </Header>
                                    )
                                }
                            </Item.Group>
                        </Segment>

                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles>
        )
    }
}