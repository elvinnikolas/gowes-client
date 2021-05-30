import React, { useState } from 'react'
import { Comment, Button, Form, Confirm, TextArea } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'
import Spinner from '../components/Spinner'

import { DELETE_COMMENT, ADD_COMMENT } from '../util/graphql'
import { useMutation } from '@apollo/client'

const Styles = styled.div`
    .paragraph {
        font-size: 15px;
        white-space: pre-line;
    }
`

export const CommentThread = ({ postId, userId, comment, refetch }) => {

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        variables: { postId, commentId: comment._id },
        update() {
            refetch()
        }
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    return comment === null ? (
        <Spinner />
    ) : (
        userId == 'guest' ?
            <Comment>
                <Comment.Avatar src={comment.user.image} />
                <Comment.Content>
                    <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                    <Comment.Metadata>
                        <span>{moment(comment.date).fromNow()}</span>
                    </Comment.Metadata>
                    <Comment.Text><p className="paragraph">{comment.comment}</p></Comment.Text>
                </Comment.Content>
            </Comment>
            :
            <Comment>
                <Comment.Avatar src={comment.user.image} />
                <Comment.Content>
                    <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                    <Comment.Metadata>
                        <span>{moment(comment.date).fromNow()}</span>
                    </Comment.Metadata>
                    <Comment.Text><p className="paragraph">{comment.comment}</p></Comment.Text>
                    <Comment.Actions>
                        {comment.user._id === userId && (
                            <Comment.Action>
                                <Button
                                    size='mini'
                                    icon='trash'
                                    negative
                                    onClick={() => setConfirmOpen(true)}
                                />
                                <Confirm
                                    content='Are you sure to delete this comment?'
                                    cancelButton='NO'
                                    confirmButton="YES"
                                    open={confirmOpen}
                                    onCancel={() => setConfirmOpen(false)}
                                    onConfirm={deleteComment}
                                />
                            </Comment.Action>
                        )}
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
    )
}

export const CreateComment = ({ postId, refetch }) => {
    const [comment, setComment] = useState('')

    const [addComment] = useMutation(ADD_COMMENT, {
        variables: { postId, comment },
        update() {
            refetch()
            setComment('')
        }
    })

    return (
        <Styles>
            <Form onSubmit={addComment}>
                <TextArea
                    rows={4}
                    name='comment'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Button
                    content='Submit'
                    disabled={comment.trim() == ''}
                    labelPosition='left'
                    icon='pencil'
                    primary
                />
            </Form>
        </Styles>
    )
}