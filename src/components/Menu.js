import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Tab,
    Menu,
    Segment,
    Sticky,
    Item,
    Header,
    Icon,
    Button,
    Transition,
    Label,
    Card,
    Image,
    Dropdown,
    Confirm,
    Modal,
    Form,
    TextArea
} from 'semantic-ui-react'
import styled from 'styled-components'

import { ThreadCommunity, ThreadGuest } from './Thread'

import {
    FETCH_QUERY_MENU_COMMUNITY,
    REQUEST_MEMBER,
    JOIN_MEMBER,
    ACCEPT_MEMBER,
    REJECT_MEMBER,
    APPOINT_ADMIN,
    REMOVE_MEMBER
} from '../util/graphql'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'

const Styles = styled.div`
    .paragraph {
        white-space: pre-line;
    }
`

export function MenuCommunity({
    details: { _id, isPrivate },
    status: { isJoin, isAdmin, isRequest },
    posts,
    members,
    requests,
    refetch,
    contextRef
}) {
    const { auth } = useContext(AuthContext)
    const userId = auth._id
    const communityId = _id

    const [activeTab, setActiveTab] = useState(0)
    const [activeMenu, setActiveMenu] = useState('thread')

    function onClickThread() {
        setActiveTab(0)
        setActiveMenu('thread')
    }
    function onClickMember() {
        setActiveTab(1)
        setActiveMenu('member')
    }
    function onClickRequest() {
        setActiveTab(2)
        setActiveMenu('request')
    }

    const [confirmAdminOpen, setConfirmAdminOpen] = useState(false)
    const [confirmKickOpen, setConfirmKickOpen] = useState(false)
    const [requestMessage, setRequestMessage] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const [requestJoinCommunity] = useMutation(REQUEST_MEMBER, {
        variables: { communityId: _id, message: requestMessage },
        refetchQueries: [{
            query: FETCH_QUERY_MENU_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [joinCommunity] = useMutation(JOIN_MEMBER, {
        variables: { communityId: communityId },
        refetchQueries: [{
            query: FETCH_QUERY_MENU_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [acceptMember] = useMutation(ACCEPT_MEMBER, {
        update() {
            refetch()
        }
    })

    const [rejectMember] = useMutation(REJECT_MEMBER, {
        update() {
            refetch()
        }
    })

    const [appointAdmin] = useMutation(APPOINT_ADMIN, {
        update() {
            refetch()
        }
    })

    const [removeMember] = useMutation(REMOVE_MEMBER, {
        update() {
            refetch()
        }
    })

    return (
        <Styles>
            <Sticky context={contextRef} offset={70}>
                <Segment>
                    <Menu pointing secondary>
                        <Menu.Item
                            name='thread'
                            active={activeMenu === 'thread'}
                            onClick={onClickThread}
                        >
                            Thread
                        </Menu.Item>
                        <Menu.Item></Menu.Item>
                        <Menu.Item
                            name='member'
                            active={activeMenu === 'member'}
                            onClick={onClickMember}
                        >
                            Member
                        </Menu.Item>
                        <Menu.Item></Menu.Item>
                        {isAdmin && isPrivate ?
                            (
                                <Menu.Item
                                    name='request'
                                    active={activeMenu === 'request'}
                                    onClick={onClickRequest}
                                >
                                    Member Request
                                    {requests.length > 0 ? (
                                        <Label color='blue' floating>
                                            {requests.length}
                                        </Label>
                                    ) : []
                                    }
                                </Menu.Item>
                            ) : []
                        }
                    </Menu>
                </Segment>
            </Sticky>

            <Tab
                panes={[
                    {
                        render: () =>
                            isJoin ?
                                posts.length > 0 ?
                                    (
                                        <Segment attached='bottom'>
                                            <Item.Group divided>
                                                <Transition.Group>
                                                    {
                                                        posts &&
                                                        posts.map(post => (
                                                            <ThreadCommunity key={post._id} post={post} admin={isAdmin} refetch={refetch} />
                                                        ))
                                                    }
                                                </Transition.Group>
                                            </Item.Group>
                                        </Segment>
                                    ) : (
                                        <Segment placeholder>
                                            <Header icon>
                                                <Icon name='edit' />
                                                No threads posted here yet
                                                <br></br><br></br>
                                                <Link to={`/create-thread/${communityId}`}>
                                                    <Button primary>
                                                        Create Thread
                                                    </Button>
                                                </Link>
                                            </Header>
                                        </Segment>
                                    )
                                : (
                                    <Segment placeholder>
                                        <Header icon>
                                            <Icon name='lock' />
                                            Join the group to see and post threads in this group
                                        </Header>
                                        {
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
                                    </Segment>
                                )
                    },

                    {
                        render: () =>
                            <Segment attached='bottom'>
                                <Item.Group divided link>
                                    {
                                        members &&
                                        members.map(member => (
                                            <Item>
                                                <Item.Image size='tiny' src={member.user.image} />

                                                <Item.Content>
                                                    <Link
                                                        to={`/profile/${member.user._id}`}
                                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                                    >
                                                        <Item.Header><b>{member.user.name}</b></Item.Header>
                                                    </Link>
                                                    <Item.Description>{member.user.bio}</Item.Description>
                                                    {member.isAdmin ?
                                                        (
                                                            <Item.Description>
                                                                <Label basic tiny color='blue'>
                                                                    admin
                                                                </Label>
                                                            </Item.Description>
                                                        ) : []
                                                    }
                                                    {isAdmin ?
                                                        member.user._id !== userId ?
                                                            member.isAdmin ?
                                                                (
                                                                    <Item.Extra>
                                                                        <Button.Group floated='right' color='teal'>
                                                                            <Button color='teal'>Action</Button>
                                                                            <Dropdown floating className='button icon'>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item
                                                                                        text='Kick'
                                                                                        onClick={() => setConfirmKickOpen(true)}
                                                                                    />
                                                                                    <Confirm
                                                                                        content='Are you sure to kick this member?'
                                                                                        cancelButton='NO'
                                                                                        confirmButton="YES"
                                                                                        open={confirmKickOpen}
                                                                                        onCancel={() => setConfirmKickOpen(false)}
                                                                                        onConfirm={() => {
                                                                                            removeMember({
                                                                                                variables: {
                                                                                                    communityId: communityId,
                                                                                                    userId: member.user._id
                                                                                                }
                                                                                            })
                                                                                            setConfirmKickOpen(false)
                                                                                        }
                                                                                        }
                                                                                    />
                                                                                </Dropdown.Menu>
                                                                            </Dropdown>
                                                                        </Button.Group>
                                                                    </Item.Extra>
                                                                ) : (
                                                                    <Item.Extra>
                                                                        <Button.Group floated='right' color='teal'>
                                                                            <Button color='teal'>Action</Button>
                                                                            <Dropdown floating className='button icon'>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item
                                                                                        text='Appoint admin'
                                                                                        onClick={() => setConfirmAdminOpen(true)}
                                                                                    />
                                                                                    <Confirm
                                                                                        content='Are you sure to appoint this member as admin?'
                                                                                        cancelButton='NO'
                                                                                        confirmButton="YES"
                                                                                        open={confirmAdminOpen}
                                                                                        onCancel={() => setConfirmAdminOpen(false)}
                                                                                        onConfirm={() => {
                                                                                            appointAdmin({
                                                                                                variables: {
                                                                                                    communityId: communityId,
                                                                                                    userId: member.user._id
                                                                                                }
                                                                                            })
                                                                                            setConfirmAdminOpen(false)
                                                                                        }
                                                                                        }
                                                                                    />
                                                                                    <Dropdown.Item
                                                                                        text='Kick'
                                                                                        onClick={() => setConfirmKickOpen(true)}
                                                                                    />
                                                                                    <Confirm
                                                                                        content='Are you sure to kick this member?'
                                                                                        cancelButton='NO'
                                                                                        confirmButton="YES"
                                                                                        open={confirmKickOpen}
                                                                                        onCancel={() => setConfirmKickOpen(false)}
                                                                                        onConfirm={() => {
                                                                                            removeMember({
                                                                                                variables: {
                                                                                                    communityId: communityId,
                                                                                                    userId: member.user._id
                                                                                                }
                                                                                            })
                                                                                            setConfirmKickOpen(false)
                                                                                        }
                                                                                        }
                                                                                    />
                                                                                </Dropdown.Menu>
                                                                            </Dropdown>
                                                                        </Button.Group>
                                                                    </Item.Extra>
                                                                ) : []
                                                        : []
                                                    }
                                                </Item.Content>
                                            </Item>
                                        ))
                                    }
                                </Item.Group>
                            </Segment>
                    },

                    isAdmin && isPrivate ?
                        {
                            render: () =>
                                requests &&
                                    requests.length > 0 ?
                                    (
                                        <Segment attached='bottom'>
                                            <Card.Group divided link>
                                                {
                                                    requests.map(request => (
                                                        <Card fluid>
                                                            <Card.Content>
                                                                <Image
                                                                    floated='left'
                                                                    size='mini'
                                                                    src={request.user.image}
                                                                />
                                                                <Card.Header>
                                                                    <Link
                                                                        to={`/profile/${request.user._id}`}
                                                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                                                    >
                                                                        <b>{request.user.name}</b>
                                                                    </Link>
                                                                </Card.Header>
                                                                <Card.Meta>{request.user.bio}</Card.Meta>
                                                                <Card.Description>
                                                                    <p className="paragraph">{request.message}</p>
                                                                </Card.Description>
                                                            </Card.Content>
                                                            <Card.Content extra>
                                                                <div>
                                                                    <Button color='green' onClick={() =>
                                                                        acceptMember({
                                                                            variables: {
                                                                                communityId: communityId,
                                                                                userId: request.user._id
                                                                            }
                                                                        })
                                                                    }>
                                                                        Accept
                                                                    </Button>
                                                                    <Button color='red' onClick={() =>
                                                                        rejectMember({
                                                                            variables: {
                                                                                communityId: communityId,
                                                                                userId: request.user._id
                                                                            }
                                                                        })
                                                                    }>
                                                                        Reject
                                                                    </Button>
                                                                </div>
                                                            </Card.Content>
                                                        </Card>
                                                    ))

                                                }
                                            </Card.Group>
                                        </Segment>
                                    ) : (
                                        <Segment placeholder>
                                            <Header icon>
                                                <Icon name='user x' />
                                                No new members request
                                            </Header>
                                        </Segment>
                                    )
                        }
                        :
                        {}
                ]}
                activeIndex={activeTab}
            />
        </Styles>
    )
}

export function MenuCommunityGuest({
    details: { isPrivate },
    posts,
    contextRef
}) {
    const [activeTab, setActiveTab] = useState(0)
    const [activeMenu, setActiveMenu] = useState('thread')

    function onClickThread() {
        setActiveTab(0)
        setActiveMenu('thread')
    }
    return (
        <div>
            <Sticky context={contextRef} offset={70}>
                <Segment>
                    <Menu pointing secondary>
                        <Menu.Item
                            name='thread'
                            active={activeMenu === 'thread'}
                            onClick={onClickThread}
                        >
                            Thread
                        </Menu.Item>
                    </Menu>
                </Segment>
            </Sticky>

            <Tab
                panes={[
                    {
                        render: () =>
                            !isPrivate ?
                                posts.length > 0 ?
                                    (
                                        <Segment attached='bottom'>
                                            <Item.Group divided>
                                                <Transition.Group>
                                                    {
                                                        posts &&
                                                        posts.map(post => (
                                                            <ThreadGuest key={post._id} post={post} />
                                                        ))
                                                    }
                                                </Transition.Group>
                                            </Item.Group>
                                        </Segment>
                                    ) : (
                                        <Segment placeholder>
                                            <Header icon>
                                                <Icon name='edit' />
                                                No threads posted here yet
                                            </Header>
                                        </Segment>
                                    )
                                : (
                                    <Segment placeholder>
                                        <Header icon>
                                            <Icon name='lock' />
                                            This is a private community
                                            <br></br><br></br>
                                            Login and join the community to see the contents inside
                                        </Header>
                                    </Segment>
                                )
                    }
                ]}
                activeIndex={activeTab}
            />
        </div>
    )
}