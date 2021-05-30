import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Image, Divider, Header, Icon, Grid, Segment } from 'semantic-ui-react'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

import { useQuery, useMutation } from '@apollo/client'
import { GET_APPROVE_COMMUNITIES, APPROVE_COMMUNITY, DISAPPROVE_COMMUNITY } from '../util/graphql'

const Styles = styled.div`
`

export function CommunityAdmin() {

    const { loading, data, refetch } = useQuery(GET_APPROVE_COMMUNITIES)

    const { getApproveCommunities: communities } = data ? data : []

    const [approveCommunity] = useMutation(APPROVE_COMMUNITY, {
        update() {
            refetch()
        }
    })

    const [disapproveCommunity] = useMutation(DISAPPROVE_COMMUNITY, {
        update() {
            refetch()
        }
    })

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={14}>
                    <Divider horizontal>
                        <Header as='h3'>
                            <Icon name='group' />
                            Community Requests
                        </Header>
                    </Divider>
                    <br></br>

                    {loading ? (
                        <Spinner />
                    ) : (
                        communities && communities.length > 0 ? (

                            <Card.Group divided link>
                                {
                                    communities.map(community => (
                                        <Card fluid>
                                            <Card.Content>
                                                <Image
                                                    floated='left'
                                                    size='mini'
                                                    src={community.image}
                                                />
                                                <Card.Header>
                                                    <Link
                                                        to={`/community/${community._id}`}
                                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                                    >
                                                        <b>{community.name}</b>
                                                    </Link>
                                                </Card.Header>
                                                <Card.Description>
                                                    <p className="paragraph">{community.bio}</p>
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div>
                                                    <Button color='green' onClick={() => {
                                                        approveCommunity({
                                                            variables: {
                                                                communityId: community._id
                                                            }
                                                        })
                                                    }
                                                    }>
                                                        Approve
                                                    </Button>
                                                    <Button color='red' onClick={() =>
                                                        disapproveCommunity({
                                                            variables: {
                                                                communityId: community._id
                                                            }
                                                        })
                                                    }>
                                                        Dissaprove
                                                    </Button>
                                                </div>
                                            </Card.Content>
                                        </Card>
                                    ))
                                }
                            </Card.Group>
                        ) : (
                            <Segment placeholder>
                                <Header icon>
                                    <Icon name='user cancel' />
                                    No new request
                                </Header>
                            </Segment>
                        )
                    )}
                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
            </Grid>
        </Styles >
    )
}