import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Feed, Icon, Button, Comment, Header, Divider, Confirm, Grid, Segment } from 'semantic-ui-react'
import { CommentThread, CreateComment } from '../components/Comment'
import Moment from 'react-moment'
import styled from 'styled-components'
import Spinner from '../components/Spinner'
import { Slide } from 'react-slideshow-image'

import { useMutation, useQuery } from '@apollo/client'
import { AuthContext } from '../context/auth'
import {
    GET_POST,
    LIKE_POST,
    DISLIKE_POST,
    BOOKMARK_POST,
    DELETE_POST
} from '../util/graphql'

const Styles = styled.div`
    .paragraph {
        font-size: 17px;
        white-space: pre-line;
        text-align: justify;
    }

    .each-slide {
        display: flex;
        width: 100%;
        height: 500px;
      }
      
      .each-slide > div {
        width: 100%;
      }
      
      .each-slide > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      
    .each-slide span {
        padding: 20px;
        font-size: 20px;
        background: #efefef;
        text-align: center;
    }
`

export function ThreadDetail(props) {
    const history = useHistory()
    const postId = props.match.params.id

    const { loading, data, refetch } = useQuery(GET_POST, {
        variables: { postId }
    })
    const { getPost } = data ? data : []

    const { auth } = useContext(AuthContext)
    let { liked, disliked, bookmarked } = false

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: postId }
    })
    const [dislikePost] = useMutation(DISLIKE_POST, {
        variables: { postId: postId }
    })
    const [bookmarkPost] = useMutation(BOOKMARK_POST, {
        variables: { postId: postId }
    })

    const [deletePost] = useMutation(DELETE_POST, {
        variables: { postId: postId }
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    function deletePostCallback() {
        deletePost()
        history.go(-1)
    }

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        const { _id, user, date, title, content, images, likes, dislikes, comments, bookmarks } = getPost
        const sliderProperties = {
            autoplay: true,
            indicators: true,
            pauseOnHover: true
        }

        return (
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <h1>{title}</h1>

                        <Segment>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={user.image} />
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Link to={`/profile/${user._id}`}>
                                                <Feed.User><h3>{user.name}</h3></Feed.User>
                                            </Link>
                                        </Feed.Summary>
                                        <br></br>
                                        <Feed.Date><h3>Posted on: <Moment format='DD MMMM YYYY, hh:mm'>{date}</Moment></h3></Feed.Date>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>

                            {!auth.loading && bookmarks.map(bookmark =>
                                bookmark.user === auth._id ?
                                    bookmarked = true : bookmarked
                            )}
                            {bookmarked ?
                                (<Button primary size='tiny' color='blue' icon='bookmark' floated='right'
                                    onClick={bookmarkPost}
                                />) :
                                (<Button primary size='tiny' basic color='blue' icon='bookmark' floated='right'
                                    onClick={bookmarkPost}
                                />)
                            }

                            {auth && auth._id === user._id && (
                                <>
                                    <Button negative size='tiny' floated='right' icon='trash'
                                        onClick={() => setConfirmOpen(true)}
                                    />
                                    <Confirm
                                        open={confirmOpen}
                                        onCancel={() => setConfirmOpen(false)}
                                        onConfirm={deletePostCallback}
                                    />
                                </>
                            )}

                            <Button.Group basic>
                                {!auth.loading && likes.map(like =>
                                    like.user === auth._id ?
                                        liked = true : liked
                                )}
                                {liked ?
                                    (<Button size='tiny' basic color='white' onClick={likePost}>
                                        <Icon color='blue' name='thumbs up' /> {likes.length}
                                    </Button>) :
                                    (<Button size='tiny' basic color='white' onClick={likePost}>
                                        <Icon name='thumbs up' /> {likes.length}
                                    </Button>)
                                }
                                {!auth.loading && dislikes.map(dislike =>
                                    dislike.user === auth._id ?
                                        disliked = true : disliked
                                )}
                                {disliked ?
                                    (<Button size='tiny' basic color='white' onClick={dislikePost}>
                                        <Icon color='red' name='thumbs down' /> {dislikes.length}
                                    </Button>) :
                                    (<Button size='tiny' basic color='white' onClick={dislikePost}>
                                        <Icon name='thumbs down' /> {dislikes.length}
                                    </Button>)
                                }
                                <Button size='tiny' basic color='white'>
                                    <Icon name='comment' /> {comments.length}
                                </Button>
                            </Button.Group>
                        </Segment>

                        <br></br>
                        {images.length > 0 ?
                            images.length > 1 ?
                                <Slide {...sliderProperties} easing="ease">
                                    {images.map(image =>
                                        <div className="each-slide">
                                            <img src={image} />
                                        </div>
                                    )}
                                </Slide> :
                                images.map(image =>
                                    <div className="each-slide">
                                        <img src={image} />
                                    </div>
                                )
                            : []
                        }

                        <br></br>
                        <p className="paragraph">{content}</p>

                        <br></br>
                        <Divider horizontal>
                            <Header as='h2' textAlign='center'>
                                <Icon name='comment alternate outline' />
                                Comment
                            </Header>
                        </Divider>
                        <Comment.Group>
                            <Header as='h3' dividing>
                                Add Comment
                            </Header>
                            <CreateComment
                                postId={_id}
                                refetch={refetch}
                            />
                        </Comment.Group>
                        <Comment.Group size='large'>
                            <Header as='h3' dividing>
                                Comments
                            </Header>
                            {comments.length > 0 ?
                                comments.map(comment => (
                                    <CommentThread
                                        key={comment._id}
                                        comment={comment}
                                        userId={auth._id}
                                        postId={_id}
                                        refetch={refetch}
                                    />
                                )) : (
                                    <Segment placeholder>
                                        <Header icon>
                                            <Icon name='comment alternate outline' />
                                                No comments yet
                                            </Header>
                                    </Segment>
                                )
                            }
                        </Comment.Group>

                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles >
        )
    }
}

export function ThreadDetailGuest(props) {
    const postId = props.match.params.id

    const { loading, data, refetch } = useQuery(GET_POST, {
        variables: { postId }
    })
    const { getPost } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        const { _id, user, date, title, content, images, likes, dislikes, comments } = getPost
        const sliderProperties = {
            autoplay: true,
            indicators: true,
            pauseOnHover: true
        }

        return (
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <h1>{title}</h1>

                        <Segment>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={user.image} />
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User><h3>{user.name}</h3></Feed.User>
                                        </Feed.Summary>
                                        <br></br>
                                        <Feed.Date><h3>Posted on: <Moment format='DD MMMM YYYY, hh:mm'>{date}</Moment></h3></Feed.Date>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>

                            <Button.Group basic>
                                <Button size='tiny' basic color='white'>
                                    <Icon name='thumbs up' /> {likes.length}
                                </Button>
                                <Button size='tiny' basic color='white'>
                                    <Icon name='thumbs down' /> {dislikes.length}
                                </Button>
                                <Button size='tiny' basic color='white'>
                                    <Icon name='comment' /> {comments.length}
                                </Button>
                            </Button.Group>
                        </Segment>

                        <br></br>
                        {images.length > 0 ?
                            images.length > 1 ?
                                <Slide {...sliderProperties} easing="ease">
                                    {images.map(image =>
                                        <div className="each-slide">
                                            <img src={image} />
                                        </div>
                                    )}
                                </Slide> :
                                images.map(image =>
                                    <div className="each-slide">
                                        <img src={image} />
                                    </div>
                                )
                            : []
                        }

                        <br></br>
                        <p className="paragraph">{content}</p>

                        <br></br>
                        <Divider horizontal>
                            <Header as='h2' textAlign='center'>
                                <Icon name='comment alternate outline' />
                                Comment
                            </Header>
                        </Divider>
                        <Comment.Group size='large'>
                            <Header as='h3' dividing>
                                Comments
                            </Header>
                            {comments.length > 0 ?
                                comments.map(comment => (
                                    <CommentThread
                                        key={comment._id}
                                        comment={comment}
                                        userId='guest'
                                        postId={_id}
                                        refetch={refetch}
                                    />
                                )) : (
                                    <Segment placeholder>
                                        <Header icon>
                                            <Icon name='comment alternate outline' />
                                                No comments yet
                                            </Header>
                                    </Segment>
                                )
                            }
                        </Comment.Group>

                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles >
        )
    }
}