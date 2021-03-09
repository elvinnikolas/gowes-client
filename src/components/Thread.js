import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button, Icon, Item, Menu, Confirm } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'
import profileImage from '../assets/profile.jpg'

import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'

import {
    GET_POSTS,
    GET_BOOKMARK_POSTS,
    LIKE_POST,
    DISLIKE_POST,
    BOOKMARK_POST,
    DELETE_POST
} from '../util/graphql'

const Styles = styled.div`
    .thread-title {
        font-size:medium
    }
    .thread-text {
        font-size:small
    }
    .thread-footer-text {
        font-size:small
        text-align:right
        color:grey
    }
    .thread-name {
        text-align:center
        font-size:small
    }
    .pagination {
        display: inline-block
    }
    .float-right {
        float: right
    }
    .tooltips {
        position: relative
        display: inline-block
        border-bottom: 1px dotted black
      }
      
      .tooltips .tooltiptext {
        visibility: hidden
        width: 50px
        background-color: black
        color: #bbb
        font-size: 12px
        text-align: center
        border-radius: 5px
        padding: 10px 0
        
        /* Position the tooltips */
        position: absolute
        z-index: 1
        top: 100%
        left: 50%
        margin-left: -30px
      }
`

export function Thread({
    post: { _id, user, name, date, title, content, likes, dislikes, comments, bookmarks }
}) {
    const { auth } = useContext(AuthContext)
    let { liked, disliked, bookmarked } = false

    const [bookmark, setBookmark] = useState(false)

    useEffect(() => {
        if (user && bookmarks.find(bookmark => bookmark.user === auth._id)) {
            setBookmark(true)
        } else {
            setBookmark(false)
        }
    }, [user, bookmarks])

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: _id }
    })
    const [dislikePost] = useMutation(DISLIKE_POST, {
        variables: { postId: _id }
    })
    const [bookmarkPost] = useMutation(BOOKMARK_POST, {
        variables: { postId: _id },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_BOOKMARK_POSTS
            })

            if (!bookmark) {
                proxy.writeQuery({
                    query: GET_BOOKMARK_POSTS,
                    data: {
                        getBookmarkPosts: [result.data.bookmarkPost, ...data.getBookmarkPosts]
                    }
                })
            } else {
                proxy.writeQuery({
                    query: GET_BOOKMARK_POSTS,
                    data: {
                        getBookmarkPosts: data.getBookmarkPosts.filter(p => p._id !== _id)
                    }
                })
            }

        }
    })
    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy) {
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: GET_POSTS
            })
            proxy.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: data.getPosts.filter(p => p._id !== _id)
                }
            })
        },
        variables: { postId: _id }
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    return (
        <Styles>
            <Item.Group divided>
                <Item>
                    <Item.Image size='tiny' src={profileImage} />
                    <Item.Content>
                        <Item.Header as='a'>{title}</Item.Header>
                        <Item.Meta>
                            <Link to={`/profile/${user}`}>
                                {name}
                            </Link>
                        </Item.Meta>
                        <Item.Description>
                            {content}
                        </Item.Description>
                        <Item.Extra>
                            <Link to={`/thread/${_id}`}>
                                <Button primary size='tiny' floated='right'>
                                    Read more
                                <Icon name='right chevron' />
                                </Button>
                            </Link>

                            {!auth.loading && bookmark ?
                                bookmarked = true : bookmarked
                            }
                            {bookmarked ?
                                (<Button size='tiny' basic color='white' floated='right' onClick={bookmarkPost}>
                                    <Icon color='blue' name='bookmark' style={{ margin: 0 }} />
                                </Button>) :
                                (<Button size='tiny' basic color='white' floated='right' onClick={bookmarkPost}>
                                    <Icon name='bookmark' style={{ margin: 0 }} />
                                </Button>)
                            }

                            {auth && auth._id === user && (
                                <>
                                    <Button negative size='tiny' floated='right' onClick={() => setConfirmOpen(true)}>
                                        <Icon name='trash' style={{ margin: 0 }} />
                                    </Button>
                                    <Confirm
                                        content='Are you sure to delete this?'
                                        cancelButton='NO'
                                        confirmButton="YES"
                                        open={confirmOpen}
                                        onCancel={() => setConfirmOpen(false)}
                                        onConfirm={deletePost}
                                    />
                                </>
                            )}
                            <Menu compact>
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
                            </Menu>
                            <br></br>
                            <span className="float-right">{moment(date).fromNow()}</span>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                <Item></Item>
            </Item.Group>
        </Styles>
    )
}

export function ThreadExplore({
    post: { _id, user, name, date, title, content, likes, dislikes, comments, bookmarks, community }
}) {
    const { auth } = useContext(AuthContext)
    let { liked, disliked, bookmarked } = false

    const [bookmark, setBookmark] = useState(false)

    useEffect(() => {
        if (user && bookmarks.find(bookmark => bookmark.user === auth._id)) {
            setBookmark(true)
        } else {
            setBookmark(false)
        }
    }, [user, bookmarks])

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: _id }
    })
    const [dislikePost] = useMutation(DISLIKE_POST, {
        variables: { postId: _id }
    })
    const [bookmarkPost] = useMutation(BOOKMARK_POST, {
        variables: { postId: _id },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_BOOKMARK_POSTS
            })

            if (!bookmark) {
                proxy.writeQuery({
                    query: GET_BOOKMARK_POSTS,
                    data: {
                        getBookmarkPosts: [result.data.bookmarkPost, ...data.getBookmarkPosts]
                    }
                })
            } else {
                proxy.writeQuery({
                    query: GET_BOOKMARK_POSTS,
                    data: {
                        getBookmarkPosts: data.getBookmarkPosts.filter(p => p._id !== _id)
                    }
                })
            }

        }
    })
    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy) {
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: GET_POSTS
            })
            proxy.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: data.getPosts.filter(p => p._id !== _id)
                }
            })
        },
        variables: { postId: _id }
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    return (
        <Styles>
            <Item.Group divided>
                <Item>
                    <Item.Image size='tiny' src={profileImage} />
                    <Item.Content>
                        <Item.Header as='a'>{title}</Item.Header>
                        <Item.Meta>
                            <Link to={`/profile/${user}`}>
                                {name}
                            </Link>
                            <Icon name='angle right' />
                            <Link to={`/community/${community._id}`}>
                                {community.name}
                            </Link>
                        </Item.Meta>
                        <Item.Description>
                            {content}
                        </Item.Description>
                        <Item.Extra>
                            <Link to={`/thread/${_id}`}>
                                <Button primary size='tiny' floated='right'>
                                    Read more
                                <Icon name='right chevron' />
                                </Button>
                            </Link>

                            {!auth.loading && bookmark ?
                                bookmarked = true : bookmarked
                            }
                            {bookmarked ?
                                (<Button size='tiny' basic color='white' floated='right' onClick={bookmarkPost}>
                                    <Icon color='blue' name='bookmark' style={{ margin: 0 }} />
                                </Button>) :
                                (<Button size='tiny' basic color='white' floated='right' onClick={bookmarkPost}>
                                    <Icon name='bookmark' style={{ margin: 0 }} />
                                </Button>)
                            }

                            {auth && auth._id === user && (
                                <>
                                    <Button negative size='tiny' floated='right' onClick={() => setConfirmOpen(true)}>
                                        <Icon name='trash' style={{ margin: 0 }} />
                                    </Button>
                                    <Confirm
                                        content='Are you sure to delete this?'
                                        cancelButton='NAH PASS'
                                        confirmButton="HELL YEAH"
                                        open={confirmOpen}
                                        onCancel={() => setConfirmOpen(false)}
                                        onConfirm={deletePost}
                                    />
                                </>
                            )}
                            <Menu compact>
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
                            </Menu>
                            <br></br>
                            <span className="float-right">{moment(date).fromNow()}</span>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                <Item></Item>
            </Item.Group>
        </Styles>
    )
}