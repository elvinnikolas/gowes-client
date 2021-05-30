import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button, Icon, Item, Confirm } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'
import gowesImage from '../assets/gowes.jpg'

import { useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'

import {
    LIKE_POST,
    DISLIKE_POST,
    BOOKMARK_POST,
    DELETE_POST,
    FETCH_QUERY_COMMUNITY
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
    post: { _id, user, date, title, content, images, likes, dislikes, comments, bookmarks },
    refetch
}) {
    const { auth } = useContext(AuthContext)
    let { liked, disliked, bookmarked } = false

    if (content.length > 500) {
        content = content.substring(0, 500)
        content = content + '...'
    }

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
        update() {
            refetch()
        }
    })
    const [deletePost] = useMutation(DELETE_POST, {
        variables: { postId: _id },
        update() {
            refetch()
        }
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    return (
        <Styles>
            <Item.Group divided>
                <Item>
                    {images.length > 0 ?
                        (<Item.Image size='small' src={images[0]} />) :
                        (<Item.Image size='small' src={gowesImage} />)
                    }
                    <Item.Content>
                        <Item.Header>
                            <Link
                                to={`/thread/${_id}`}
                                style={{ color: 'inherit', textDecoration: 'inherit' }}
                            >
                                {title}
                            </Link>
                        </Item.Header>
                        <Item.Meta>
                            <Link to={`/profile/${user._id}`}>
                                {user.name}
                            </Link>
                        </Item.Meta>
                        <Item.Description>
                            {content}
                        </Item.Description>
                        <Item.Extra>
                            <Button.Group floated='right'>
                                {auth && auth._id === user._id && (
                                    <>
                                        <Button negative size='tiny' icon='trash'
                                            onClick={() => setConfirmOpen(true)}
                                        />
                                        <Confirm
                                            content='Are you sure to delete this?'
                                            cancelButton='NO'
                                            confirmButton="YES"
                                            open={confirmOpen}
                                            onCancel={() => setConfirmOpen(false)}
                                            onConfirm={deletePost}
                                        />
                                        <Button basic disabled></Button>
                                    </>
                                )}

                                {!auth.loading && bookmark ?
                                    bookmarked = true : bookmarked
                                }
                                {bookmarked ?
                                    (<Button primary size='tiny' color='blue' icon='bookmark'
                                        onClick={bookmarkPost}
                                    />) :
                                    (<Button primary size='tiny' basic color='blue' icon='bookmark'
                                        onClick={bookmarkPost}
                                    />)
                                }

                                <Button basic disabled></Button>

                                <Link to={`/thread/${_id}`}>
                                    <Button primary size='tiny' floated='right'>
                                        Read more
                                <Icon name='right chevron' />
                                    </Button>
                                </Link>
                            </Button.Group>

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
    post: { _id, user, date, title, content, images, likes, dislikes, comments, bookmarks, community },
    refetch
}) {
    const { auth } = useContext(AuthContext)
    let { liked, disliked, bookmarked } = false

    if (content.length > 500) {
        content = content.substring(0, 500)
        content = content + '...'
    }

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
        update() {
            refetch()
        }
    })
    const [deletePost] = useMutation(DELETE_POST, {
        variables: { postId: _id },
        update() {
            refetch()
        }
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    return (
        <Styles>
            <Item.Group divided>
                <Item>
                    {images.length > 0 ?
                        (<Item.Image size='small' src={images[0].toString()} />) :
                        (<Item.Image size='small' src={gowesImage} />)
                    }
                    <Item.Content>
                        <Item.Header>
                            <Link
                                to={`/thread/${_id}`}
                                style={{ color: 'inherit', textDecoration: 'inherit' }}
                            >
                                {title}
                            </Link>
                        </Item.Header>
                        <Item.Meta>
                            <Link to={`/profile/${user._id}`}>
                                {user.name}
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
                            <Button.Group floated='right'>
                                {auth && auth._id === user._id && (
                                    <>
                                        <Button negative size='tiny' icon='trash'
                                            onClick={() => setConfirmOpen(true)}
                                        />
                                        <Confirm
                                            content='Are you sure to delete this?'
                                            cancelButton='NO'
                                            confirmButton="YES"
                                            open={confirmOpen}
                                            onCancel={() => setConfirmOpen(false)}
                                            onConfirm={deletePost}
                                        />
                                        <Button basic disabled></Button>
                                    </>
                                )}

                                {!auth.loading && bookmark ?
                                    bookmarked = true : bookmarked
                                }
                                {bookmarked ?
                                    (<Button primary size='tiny' color='blue' icon='bookmark'
                                        onClick={bookmarkPost}
                                    />) :
                                    (<Button primary size='tiny' basic color='blue' icon='bookmark'
                                        onClick={bookmarkPost}
                                    />)
                                }

                                <Button basic disabled></Button>

                                <Link to={`/thread/${_id}`}>
                                    <Button primary size='tiny' floated='right'>
                                        Read more
                                <Icon name='right chevron' />
                                    </Button>
                                </Link>
                            </Button.Group>

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

export function ThreadCommunity({
    post: { _id, user, date, title, content, images, likes, dislikes, comments, bookmarks, community },
    admin,
    refetch
}) {
    const { auth } = useContext(AuthContext)
    let { liked, disliked, bookmarked } = false

    if (content.length > 500) {
        content = content.substring(0, 500)
        content = content + '...'
    }

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
        update() {
            refetch()
        }
    })
    const [deletePost] = useMutation(DELETE_POST, {
        variables: { postId: _id },
        update() {
            refetch()
        },
        refetchQueries: [{
            query: FETCH_QUERY_COMMUNITY,
            variables: { userId: auth._id, communityId: community._id }
        }],
        awaitRefetchQueries: true
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    return (
        <Styles>
            <Item.Group divided>
                <Item>
                    {images.length > 0 ?
                        (<Item.Image size='small' src={images[0]} />) :
                        (<Item.Image size='small' src={gowesImage} />)
                    }
                    <Item.Content>
                        <Item.Header>
                            <Link
                                to={`/thread/${_id}`}
                                style={{ color: 'inherit', textDecoration: 'inherit' }}
                            >
                                {title}
                            </Link>
                        </Item.Header>
                        <Item.Meta>
                            <Link to={`/profile/${user._id}`}>
                                {user.name}
                            </Link>
                        </Item.Meta>
                        <Item.Description>
                            {content}
                        </Item.Description>
                        <Item.Extra>
                            <Button.Group floated='right'>
                                {auth && (auth._id === user._id || admin) && (
                                    <>
                                        <Button negative size='tiny' icon='trash'
                                            onClick={() => setConfirmOpen(true)}
                                        />
                                        <Confirm
                                            content='Are you sure to delete this?'
                                            cancelButton='NO'
                                            confirmButton="YES"
                                            open={confirmOpen}
                                            onCancel={() => setConfirmOpen(false)}
                                            onConfirm={deletePost}
                                        />
                                        <Button basic disabled></Button>
                                    </>
                                )}

                                {!auth.loading && bookmark ?
                                    bookmarked = true : bookmarked
                                }
                                {bookmarked ?
                                    (<Button primary size='tiny' color='blue' icon='bookmark'
                                        onClick={bookmarkPost}
                                    />) :
                                    (<Button primary size='tiny' basic color='blue' icon='bookmark'
                                        onClick={bookmarkPost}
                                    />)
                                }

                                <Button basic disabled></Button>

                                <Link to={`/thread/${_id}`}>
                                    <Button primary size='tiny' floated='right'>
                                        Read more
                                <Icon name='right chevron' />
                                    </Button>
                                </Link>
                            </Button.Group>

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

export function ThreadGuest({
    post: { _id, user, date, title, content, images, likes, dislikes, comments }
}) {

    if (content.length > 500) {
        content = content.substring(0, 500)
        content = content + '...'
    }

    return (
        <Styles>
            <Item.Group divided>
                <Item>
                    {images.length > 0 ?
                        (<Item.Image size='small' src={images[0]} />) :
                        (<Item.Image size='small' src={gowesImage} />)
                    }
                    <Item.Content>
                        <Item.Header>
                            <Link
                                to={`/thread-guest/${_id}`}
                                style={{ color: 'inherit', textDecoration: 'inherit' }}
                            >
                                {title}
                            </Link>
                        </Item.Header>
                        <Item.Meta>
                            {user.name}
                        </Item.Meta>
                        <Item.Description>
                            {content}
                        </Item.Description>
                        <Item.Extra>
                            <Button.Group floated='right'>
                                <Link to={`/thread-guest/${_id}`}>
                                    <Button primary size='tiny' floated='right'>
                                        Read more
                                        <Icon name='right chevron' />
                                    </Button>
                                </Link>
                            </Button.Group>

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