import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Item, Transition, Divider, Header, Icon, Grid, Button, Segment, Dropdown, Ref, Sticky } from 'semantic-ui-react'
import Spinner from '../components/Spinner'
import { ThreadExplore } from '../components/Thread'
import styled from 'styled-components'

import { useQuery } from '@apollo/client'
import { GET_BOOKMARK_POSTS } from '../util/graphql'

const Styles = styled.div`
`

function BookmarkThread() {
    const contextRef = React.createRef()

    const [filterOption, setfilterOption] = useState('recent')

    const { loading, data, refetch } = useQuery(GET_BOOKMARK_POSTS, {
        variables: { filter: filterOption }
    })

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
            value: 'post',
        },
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
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='bookmark' />
                            Bookmark
                        </Header>
                        </Divider>
                        <br></br>

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
                            {loading ? (
                                <Spinner />
                            ) : posts.length > 0 ?
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
                                    <Segment placeholder>
                                        <Header icon>
                                            <Icon name='edit' />
                                            No bookmarked threads yet
                                            <br></br><br></br>
                                            <Link to={`/explore-thread`}>
                                                <Button primary>
                                                    EXPLORE
                                                </Button>
                                            </Link>
                                        </Header>
                                    </Segment>
                                )
                            }
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>

            </Styles>
        </Ref>
    )
}


export default BookmarkThread