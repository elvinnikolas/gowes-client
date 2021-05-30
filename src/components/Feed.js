import React from 'react'
import { Link } from 'react-router-dom'
import { Feed } from 'semantic-ui-react'
import styled from 'styled-components'
// import Moment from 'react-moment'
import moment from 'moment'

const Styles = styled.div`
`

export function NotificationFeed({
    notification: { community, content, date }
}) {
    return (
        <Styles>
            {community !== null ?
                (<Feed
                    as={Link}
                    to={`/community/${community._id}`}
                >
                    <Feed.Event>
                        <Feed.Label image={community.image} />
                        <Feed.Content>
                            {/* <Feed.Date><Moment format='DD MMMM YYYY, hh:mm'>{date}</Moment></Feed.Date> */}
                            <Feed.Date>{moment(date).fromNow()}</Feed.Date>
                            <Feed.Summary content={community.name} />
                            <Feed.Extra text content={content} />
                        </Feed.Content>
                    </Feed.Event>
                </Feed>)
                :
                (<Feed>
                    <Feed.Event>
                        <Feed.Label image="https://firebasestorage.googleapis.com/v0/b/gowes-community.appspot.com/o/community%2Fgowes.jpg?alt=media&token=2cb149c2-3eae-4a19-a147-dde7cf0978d3" />
                        <Feed.Content>
                            {/* <Feed.Date><Moment format='DD MMMM YYYY, hh:mm'>{date}</Moment></Feed.Date> */}
                            <Feed.Date>{moment(date).fromNow()}</Feed.Date>
                            <Feed.Summary content="(This community has been deleted)" />
                            <Feed.Extra text content={content} />
                        </Feed.Content>
                    </Feed.Event>
                </Feed>)
            }
        </Styles>
    )
}