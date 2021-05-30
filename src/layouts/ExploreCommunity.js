import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Card, Ref, Sticky } from 'semantic-ui-react'
import Spinner from '../components/Spinner'
import { Fab, Action } from 'react-tiny-fab';
import styled from 'styled-components'

import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CommunityCard } from '../components/CardList'
import { SidebarExplore } from '../components/Sidebar'

import { useQuery } from '@apollo/client'
import { GET_FILTER_COMMUNITIES } from '../util/graphql'

const Styles = styled.div`
`

export function ExploreCommunity() {

    const contextRef = React.createRef()

    let history = useHistory()

    const fab_styles = {
        background: "#007bff"
    }

    const [values, setValues] = useState({
        filterField: '',
        locationField: '',
        sortField: ''
    })

    const { loading, data, refetch } = useQuery(GET_FILTER_COMMUNITIES, {
        variables: { filter: values.filterField, location: values.locationField, sort: values.sortField }
    })

    const { getFilterCommunities: communities } = data ? data : []

    function onClickFab() {
        history.push(`/create-community`)
    }

    return (
        <Ref innerRef={contextRef}>
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column width={4}>
                        <Sticky context={contextRef} offset={100}>
                            <SidebarExplore values={values} setValues={setValues} refetch={refetch} />
                        </Sticky>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <Card.Group itemsPerRow={4}>
                                {
                                    communities &&
                                    communities.map(community => (
                                        <CommunityCard key={community._id} community={community} />
                                    ))
                                }
                            </Card.Group>
                        )}
                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>

                <Fab
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    mainButtonStyles={fab_styles}
                >
                    <Action
                        onClick={onClickFab}
                        text="Create Community"
                        style={fab_styles}
                    >
                        <FontAwesomeIcon icon={faUsers} />
                    </Action>
                </Fab>
            </Styles>
        </Ref>
    )
}

export function ExploreCommunityGuest() {

    const contextRef = React.createRef()

    const [values, setValues] = useState({
        filterField: '',
        locationField: '',
        sortField: ''
    })

    const { loading, data, refetch } = useQuery(GET_FILTER_COMMUNITIES, {
        variables: { filter: values.filterField, location: values.locationField, sort: values.sortField }
    })

    const { getFilterCommunities: communities } = data ? data : []

    return (
        <Ref innerRef={contextRef}>
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column width={4}>
                        <Sticky context={contextRef} offset={100}>
                            <SidebarExplore values={values} setValues={setValues} refetch={refetch} />
                        </Sticky>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <Card.Group itemsPerRow={4}>
                                {
                                    communities &&
                                    communities.map(community => (
                                        <CommunityCard key={community._id} community={community} guest='true' />
                                    ))
                                }
                            </Card.Group>
                        )}
                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>

            </Styles>
        </Ref>
    )
}