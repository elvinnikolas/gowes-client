import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Icon, Image, Label, Button, Confirm, Card, Divider, Modal, Form, TextArea } from 'semantic-ui-react'

import {
    FETCH_QUERY_HEADER_COMMUNITY,
    REQUEST_MEMBER,
    JOIN_MEMBER,
    LEAVE_MEMBER,
    GET_FILTER_COMMUNITIES
} from '../util/graphql'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'

export function HeaderCommunity({
    details: { _id, name, bio, city, province, image, isPrivate, memberCount },
    status: { isAdmin, isJoin, isRequest },
    members,
    posts
}) {

    const { auth } = useContext(AuthContext)
    const userId = auth._id
    const communityId = _id

    const [requestMessage, setRequestMessage] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    let history = useHistory()

    const [requestJoinCommunity] = useMutation(REQUEST_MEMBER, {
        variables: { communityId: _id, message: requestMessage },
        refetchQueries: [{
            query: FETCH_QUERY_HEADER_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [joinCommunity] = useMutation(JOIN_MEMBER, {
        variables: { communityId: communityId },
        refetchQueries: [{
            query: FETCH_QUERY_HEADER_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [leaveCommunity] = useMutation(LEAVE_MEMBER, {
        variables: { communityId: _id },
        refetchQueries: [{
            query: FETCH_QUERY_HEADER_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [leaveAndRemoveCommunity] = useMutation(LEAVE_MEMBER, {
        variables: { communityId: _id },
        update() {
            history.push('/explore-community')
        },
        refetchQueries: [{
            query: GET_FILTER_COMMUNITIES,
            variables: { filter: '', location: '', sort: '' }
        }],
        awaitRefetchQueries: true
    })

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [confirmOpenLeave, setConfirmOpenLeave] = useState(false)

    function onLeaveCommunity() {
        let adminCount = 0
        members.forEach(member => {
            if (member.isAdmin) {
                adminCount++
            }
        })

        if (adminCount > 1) {
            setConfirmOpenLeave(true)
        } else {
            setConfirmOpen(true)
        }
    }

    return (
        <Container>
            <Card.Group>
                <Card fluid>
                    <Card.Content centered textAlign='center'>
                        <Image circular size='small' src={image} />
                        <br></br><br></br>
                        <Card.Header>{name}</Card.Header>
                        <br></br>
                        <Container textAlign='center'>
                            <Label size='medium'>
                                <Icon name='lock' /> {isPrivate ? "Private" : "Public"}
                            </Label>
                            <Label size='medium'>
                                <Icon name='map marker' /> {city}
                            </Label>
                            <Label size='medium'>
                                <Icon name='map pin' /> {province}
                            </Label>
                            <br></br>
                            <Label basic size='medium'>
                                <Icon name='user' /> {memberCount} {memberCount <= 1 ? "member" : "members"}
                            </Label>
                            <Label basic size='medium'>
                                <Icon name='edit' /> {posts.length} {posts.length <= 1 ? "thread" : "threads"}
                            </Label>
                        </Container>
                        <Divider />
                        <Card.Description>
                            {bio}
                        </Card.Description>
                        <Divider />
                        <Card.Description>
                            {isJoin ?
                                memberCount > 1 ?
                                    isAdmin ?
                                        (
                                            <>
                                                <Button negative onClick={() => setConfirmOpenLeave(true)}>
                                                    Leave
                                                    </Button>
                                                <Confirm
                                                    content='You must appoint at least one admin before you leave'
                                                    confirmButton="OK"
                                                    open={confirmOpen}
                                                    onCancel={() => setConfirmOpen(false)}
                                                    onConfirm={() => setConfirmOpen(false)}
                                                />
                                                <Confirm
                                                    content='Are you sure you want to leave this community?'
                                                    confirmButton="Leave"
                                                    open={confirmOpenLeave}
                                                    onCancel={() => setConfirmOpenLeave(false)}
                                                    onConfirm={leaveCommunity}
                                                />
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <Button negative onClick={() => setConfirmOpenLeave(true)}>
                                                    Leave
                                                    </Button>
                                                <Confirm
                                                    content='Are you sure you want to leave this community?'
                                                    confirmButton="Leave"
                                                    open={confirmOpenLeave}
                                                    onCancel={() => setConfirmOpenLeave(false)}
                                                    onConfirm={leaveCommunity}
                                                />
                                            </>
                                        )
                                    : (
                                        <>
                                            <Button negative onClick={() => setConfirmOpenLeave(true)}>
                                                Leave
                                                </Button>
                                            <Confirm
                                                content='Are you sure you want to leave this community?'
                                                confirmButton="Leave"
                                                open={confirmOpenLeave}
                                                onCancel={() => setConfirmOpenLeave(false)}
                                                onConfirm={leaveAndRemoveCommunity}
                                            />
                                        </>
                                    )
                                :
                                isPrivate ?
                                    isRequest ?
                                        (
                                            <Button primary disabled>
                                                Requested
                                            </Button>
                                        ) : (
                                            <>
                                                <Button primary type="button" onClick={() => setModalOpen(true)}>
                                                    Request
                                                </Button>
                                                <Modal
                                                    size='mini'
                                                    onClose={() => setModalOpen(false)}
                                                    onOpen={() => setModalOpen(true)}
                                                    open={modalOpen}
                                                >
                                                    <Modal.Header>Add some message (optional)</Modal.Header>
                                                    <Modal.Content>
                                                        <Modal.Description>
                                                            <Form>
                                                                <TextArea
                                                                    fluid
                                                                    name='message'
                                                                    value={requestMessage}
                                                                    placeholder='Write your message'
                                                                    onChange={e => setRequestMessage(e.target.value)}
                                                                />
                                                            </Form>
                                                        </Modal.Description>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                        <Button onClick={() => setModalOpen(false)}>
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            content="Submit"
                                                            onClick={requestJoinCommunity}
                                                            positive
                                                        />
                                                    </Modal.Actions>
                                                </Modal>
                                            </>
                                        )
                                    :
                                    (
                                        <Button primary onClick={joinCommunity}>
                                            Join
                                        </Button>
                                    )
                            }
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </Container>
    )
}

export function HeaderCommunityGuest({
    details: { name, bio, city, province, image, isPrivate, memberCount },
    posts
}) {

    return (
        <Container>
            <Card.Group>
                <Card fluid>
                    <Card.Content centered textAlign='center'>
                        <Image circular size='small' src={image} />
                        <br></br><br></br>
                        <Card.Header>{name}</Card.Header>
                        <br></br>
                        <Container textAlign='center'>
                            <Label size='medium'>
                                <Icon name='lock' /> {isPrivate ? "Private" : "Public"}
                            </Label>
                            <Label size='medium'>
                                <Icon name='map marker' /> {city}
                            </Label>
                            <Label size='medium'>
                                <Icon name='map pin' /> {province}
                            </Label>
                            <br></br>
                            <Label basic size='medium'>
                                <Icon name='user' /> {memberCount} {memberCount <= 1 ? "member" : "members"}
                            </Label>
                            <Label basic size='medium'>
                                <Icon name='edit' /> {posts.length} {posts.length <= 1 ? "thread" : "threads"}
                            </Label>
                        </Container>
                        <Divider />
                        <Card.Description>
                            {bio}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </Container>
    )
}