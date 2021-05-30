import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Ref, Grid, Divider } from 'semantic-ui-react'

import { HeaderCommunity, HeaderCommunityGuest } from '../components/Header'
import { MenuCommunity, MenuCommunityGuest } from '../components/Menu'
import Spinner from '../components/Spinner'
import { Fab, Action } from 'react-tiny-fab'

import { faPlus, faStream } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { FETCH_QUERY_COMMUNITY, FETCH_QUERY_COMMUNITY_GUEST } from '../util/graphql'
import { useQuery } from '@apollo/client'
import { AuthContext } from '../context/auth'

export function Community(props) {
    const contextRef = React.createRef()

    let history = useHistory()

    const { auth } = useContext(AuthContext)
    const userId = auth._id
    const communityId = props.match.params.id

    const { loading, data, refetch } = useQuery(FETCH_QUERY_COMMUNITY, {
        variables: { userId, communityId }
    })
    const {
        getCommunity: details,
        getMemberStatus: status,
        getCommunityPosts: posts,
        getCommunityMembers: members,
        getCommunityMemberRequests: requests
    } = data ? data : []

    function onClickFab() {
        history.push(`/create-thread/${communityId}`)
    }

    if (loading) {
        return (
            <Spinner />
        )
    } else {

        return (
            <Ref innerRef={contextRef}>
                <Container>
                    <Grid columns='equal'>
                        <Grid.Column>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <HeaderCommunity
                                details={details}
                                status={status}
                                members={members}
                                posts={posts}
                            />
                        </Grid.Column>

                        <Grid.Column>
                        </Grid.Column>
                    </Grid>

                    <Divider hidden />
                    <Divider hidden />
                    <Divider hidden />

                    <Grid columns='equal'>
                        <Grid.Column>
                        </Grid.Column>

                        <Grid.Column width={14}>
                            <MenuCommunity
                                details={details}
                                status={status}
                                posts={posts}
                                members={members}
                                requests={requests}
                                refetch={refetch}
                                contextRef={contextRef}
                            />
                        </Grid.Column>

                        <Grid.Column>
                        </Grid.Column>

                    </Grid>

                    {status.isJoin &&
                        (<Fab
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            mainButtonStyles={fab_styles}
                        >
                            <Action
                                onClick={onClickFab}
                                text="Create Thread"
                                style={fab_styles}
                            >
                                <FontAwesomeIcon icon={faStream} />
                            </Action>
                        </Fab>)
                    }
                </Container>
            </Ref>
        )
    }
}

export function CommunityGuest(props) {
    const contextRef = React.createRef()

    const communityId = props.match.params.id

    const { loading, data } = useQuery(FETCH_QUERY_COMMUNITY_GUEST, {
        variables: { communityId }
    })
    const {
        getCommunity: details,
        getCommunityPosts: posts
    } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {

        return (
            <Ref innerRef={contextRef}>
                <Container>
                    <Grid columns='equal'>
                        <Grid.Column>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <HeaderCommunityGuest
                                details={details}
                                posts={posts}
                            />
                        </Grid.Column>

                        <Grid.Column>
                        </Grid.Column>
                    </Grid>

                    <Divider hidden />
                    <Divider hidden />
                    <Divider hidden />

                    <Grid columns='equal'>
                        <Grid.Column>
                        </Grid.Column>

                        <Grid.Column width={14}>
                            <MenuCommunityGuest
                                details={details}
                                posts={posts}
                                contextref={contextRef}
                            />
                        </Grid.Column>

                        <Grid.Column>
                        </Grid.Column>

                    </Grid>
                </Container>
            </Ref>
        )
    }
}

const fab_styles = {
    background: "#007bff"
}