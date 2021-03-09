import React, { useContext, useState, useEffect } from 'react'
import { Item, Transition, Grid, Segment, Dropdown, Icon, Divider } from 'semantic-ui-react'

import { ThreadExplore } from '../components/Thread'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'
import { FETCH_QUERY_HOME } from '../util/graphql'

const Styles = styled.div`
`

function Home() {
    const { auth } = useContext(AuthContext)
    const id = auth._id
    const [communityId, setCommunityId] = useState('000000000000000000000000')
    const [filterCommunity, setFilterCommunity] = useState(false)

    let { loading, data, refetch } = useQuery(FETCH_QUERY_HOME, {
        variables: { id: id, communityId: communityId }
    })

    const { getUserCommunities: communities, getUserCommunitiesPosts: allPosts, getUserCommunityPosts: filterPosts } = data ? data : []

    let communityOptions = [
        {
            key: 0,
            text: 'All communities',
            value: 'all',
        }
    ]

    if (communities) {
        communities.forEach(com => {
            communityOptions.push({
                key: com._id,
                text: com.community.name,
                value: com.community._id,
            })
        })
    }

    const filterOptions = [
        {
            key: 0,
            text: 'Most recent',
            value: 'recent',
        },
        {
            key: 1,
            text: 'Most popular',
            value: 'popular',
        },
        {
            key: 2,
            text: 'Most comments',
            value: 'comment',
        }
    ]

    const onClickFilter = (e, { value }) => {
        e.persist()
        if (value !== 'all') {
            setFilterCommunity(true)
            setCommunityId(value)
        } else {
            setFilterCommunity(false)
            setCommunityId('000000000000000000000000')
        }
        refetch()
    }

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={14}>
                    <Segment>
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column>
                                <Icon name="eye" />
                                <b>&nbsp;Show all threads from&nbsp;&nbsp;</b>
                                <Dropdown
                                    search
                                    selection
                                    options={communityOptions}
                                    defaultValue={communityOptions[0].value}
                                    onChange={onClickFilter}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="filter" />
                                <b>&nbsp;Sort by&nbsp;&nbsp;</b>
                                <Dropdown
                                    selection
                                    options={filterOptions}
                                    defaultValue={filterOptions[0].value}
                                />
                            </Grid.Column>
                        </Grid>
                        <Divider vertical />
                    </Segment>
                    <Segment placeholder>
                        <Grid relaxed='very' stackable>
                            <Grid.Column>

                                <Item.Group divided>
                                    {loading ? (
                                        <Spinner />
                                    ) : (
                                        filterCommunity ?
                                            <Transition.Group>
                                                {
                                                    filterPosts &&
                                                    filterPosts.map(post => (
                                                        <ThreadExplore key={post._id} post={post} />
                                                    ))
                                                }
                                            </Transition.Group>
                                            :
                                            <Transition.Group>
                                                {
                                                    allPosts &&
                                                    allPosts.map(post => (
                                                        <ThreadExplore key={post._id} post={post} />
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
    )
}
export default Home