import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Segment, Label, Image, Item, Divider, Card, Icon, Header, Transition, Button } from 'semantic-ui-react'

import styled from 'styled-components'
import { ThreadExplore } from '../components/Thread'
import Spinner from '../components/Spinner'

import profileImage from '../assets/profile.jpg'
import bike from '../assets/bike.jpg'

import { AuthContext } from '../context/auth'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_QUERY_PROFILE } from '../util/graphql'

const Styles = styled.div`

`;

export function UserProfile() {

    const { auth } = useContext(AuthContext)
    let id = auth._id

    const { loading, data } = useQuery(FETCH_QUERY_PROFILE, {
        variables: { id }
    })
    const { getUser: user, getUserPosts: posts, getUserCommunities: communities } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        const { name, bio } = user

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
                            <Image circular size='small' src='https://react.semantic-ui.com/images/wireframe/square-image.png' wrapped />
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

                        <Card.Group itemsPerRow={6}>
                            {
                                communities &&
                                communities.map(community => (
                                    <Card raised>
                                        <Image src={bike}></Image>
                                        <Card.Content textAlign='center'>
                                            <Link
                                                to={`/community/${community.community._id}`}
                                                style={{ color: 'inherit', textDecoration: 'none' }}
                                            >
                                                <Card.Description>
                                                    {community.community.name}
                                                </Card.Description>
                                            </Link>
                                        </Card.Content>
                                    </Card>
                                ))
                            }
                        </Card.Group>

                        <br></br><br></br><br></br>
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='pencil' />
                                Posts
                            </Header>
                        </Divider>
                        <br></br>

                        <Segment placeholder>
                            <Item.Group divided>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <Transition.Group>
                                        {
                                            posts &&
                                            posts.map(post => (
                                                <ThreadExplore key={post._id} post={post} />
                                            ))
                                        }
                                    </Transition.Group>
                                )}
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

export function Profile(props) {

    let id = props.match.params.id
    console.log(id)

    const { loading, data } = useQuery(FETCH_QUERY_PROFILE, {
        variables: { id }
    })
    const { getUser: user, getUserPosts: posts, getUserCommunities: communities } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        const { name, bio } = user

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
                                            <Image
                                                circular
                                                size='small'
                                                src={profileImage}
                                                wrapped
                                            />
                                            <br></br><br></br>
                                            <Card.Header>{name}</Card.Header>
                                            <Divider />
                                            <Card.Description>
                                                {bio}
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
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

                        <Card.Group itemsPerRow={6}>
                            {
                                communities &&
                                communities.map(community => (
                                    <Card raised>
                                        <Image src={bike}></Image>
                                        <Card.Content textAlign='center'>
                                            <Link
                                                to={`/community/${community.community._id}`}
                                                style={{ color: 'inherit', textDecoration: 'none' }}
                                            >
                                                <Card.Description>
                                                    {community.community.name}
                                                </Card.Description>
                                            </Link>
                                        </Card.Content>
                                    </Card>
                                ))
                            }
                        </Card.Group>

                        <br></br><br></br><br></br>
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='pencil' />
                                Posts
                            </Header>
                        </Divider>
                        <br></br>

                        <Segment placeholder>
                            <Item.Group divided>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <Transition.Group>
                                        {
                                            posts &&
                                            posts.map(post => (
                                                <ThreadExplore key={post._id} post={post} />
                                            ))
                                        }
                                    </Transition.Group>
                                )}
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