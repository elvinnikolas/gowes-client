import React from 'react'
import { Item, Transition, Divider, Header, Icon, Grid, Segment, Dropdown } from 'semantic-ui-react'
import Spinner from '../components/Spinner'
import { ThreadExplore } from '../components/Thread'
import styled from 'styled-components'

import { useQuery } from '@apollo/react-hooks'
import { GET_BOOKMARK_POSTS } from '../util/graphql'

const Styles = styled.div`
`

function BookmarkThread() {

    const { loading, data } = useQuery(GET_BOOKMARK_POSTS)

    const { getBookmarkPosts: posts } = data ? data : []

    const filterOptions = [
        {
            key: 0,
            text: 'Most recent bookmark',
            value: 'recent',
        },
        {
            key: 1,
            text: 'Most recent post',
            value: 'popular',
        },
    ]

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={14}>
                    <Divider horizontal>
                        <Header as='h3'>
                            <Icon name='bookmark' />
                            Bookmark
                        </Header>
                    </Divider>
                    <br></br>

                    <Segment>
                        <Grid relaxed='very' stackable>
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
                    </Segment>
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


export default BookmarkThread