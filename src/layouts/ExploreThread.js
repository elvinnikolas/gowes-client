import React, { useState } from 'react'
import { Item, Transition, Grid, Segment, Dropdown, Icon, Ref, Sticky } from 'semantic-ui-react'

import { ThreadExplore, ThreadGuest } from '../components/Thread'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

import { useQuery } from '@apollo/client'
import { GET_EXPLORE_POSTS } from '../util/graphql'

const Styles = styled.div`
`

export function ExploreThread() {
    const contextRef = React.createRef()

    const [filterOption, setfilterOption] = useState('popular')

    let { loading, data, refetch } = useQuery(GET_EXPLORE_POSTS, {
        variables: { filter: filterOption }
    })

    const { getExplorePosts: explorePosts } = data ? data : []

    const filterOptions = [
        {
            key: 0,
            text: 'Most popular',
            value: 'popular',
        },
        {
            key: 1,
            text: 'Most recent',
            value: 'recent',
        }
    ]

    const onClickFilter = (e, { value }) => {
        e.persist()
        setfilterOption(value)
        refetch()
    }

    return (
        <Ref innerRef={contextRef}>
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={14}>
                        <Sticky context={contextRef} offset={70}>
                            <Segment>
                                <Grid relaxed='very' stackable>
                                    <Grid.Column>
                                        <Icon name="filter" />
                                        <b>&nbsp;Sort by:&nbsp;&nbsp;</b>
                                        <Dropdown
                                            selection
                                            options={filterOptions}
                                            defaultValue={filterOptions[0].value}
                                            onChange={onClickFilter}
                                        />
                                        <b>&nbsp;&nbsp;&nbsp;posts this month</b>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Sticky>
                        <Segment placeholder>
                            <Grid relaxed='very' stackable>
                                <Grid.Column>

                                    <Item.Group divided>
                                        {loading ? (
                                            <Spinner />
                                        ) : (
                                            <Transition.Group>
                                                {
                                                    explorePosts &&
                                                    explorePosts.map(post => (
                                                        <ThreadExplore key={post._id} post={post} refetch={refetch} />
                                                    ))
                                                }
                                            </Transition.Group>
                                        )
                                        }
                                    </Item.Group>

                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles>
        </Ref>
    )
}

export function ExploreThreadGuest() {
    const contextRef = React.createRef()

    const [filterOption, setfilterOption] = useState('popular')

    let { loading, data, refetch } = useQuery(GET_EXPLORE_POSTS, {
        variables: { filter: filterOption }
    })

    const { getExplorePosts: explorePosts } = data ? data : []

    const filterOptions = [
        {
            key: 0,
            text: 'Most popular',
            value: 'popular',
        },
        {
            key: 1,
            text: 'Most recent',
            value: 'recent',
        }
    ]

    const onClickFilter = (e, { value }) => {
        e.persist()
        setfilterOption(value)
        refetch()
    }

    return (
        <Ref innerRef={contextRef}>
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={14}>
                        <Sticky context={contextRef} offset={70}>
                            <Segment>
                                <Grid relaxed='very' stackable>
                                    <Grid.Column>
                                        <Icon name="filter" />
                                        <b>&nbsp;Sort by&nbsp;&nbsp;</b>
                                        <Dropdown
                                            selection
                                            options={filterOptions}
                                            defaultValue={filterOptions[0].value}
                                            onChange={onClickFilter}
                                        />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Sticky>
                        <Segment placeholder>
                            <Grid relaxed='very' stackable>
                                <Grid.Column>

                                    <Item.Group divided>
                                        {loading ? (
                                            <Spinner />
                                        ) : (
                                            <Transition.Group>
                                                {
                                                    explorePosts &&
                                                    explorePosts.map(post => (
                                                        <ThreadGuest key={post._id} post={post} />
                                                    ))
                                                }
                                            </Transition.Group>
                                        )
                                        }
                                    </Item.Group>

                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles>
        </Ref>
    )
}