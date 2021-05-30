import React, { useContext, useState, useEffect } from 'react'
import { Grid, Segment, Menu, Feed, Icon, Label, Header, Input, Form, Button, Popup } from 'semantic-ui-react'

import Spinner from '../components/Spinner'
import Moment from 'react-moment'
import styled from 'styled-components'

import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { useSubscription } from '@apollo/client'
import { AuthContext } from '../context/auth'
import { GET_CHATS, GET_MESSAGES, SEND_MESSAGE, NEW_MESSAGE } from '../util/graphql'

const Styles = styled.div`
    .message-segment {
        height: 60vh; 
        overflow-y: scroll;
        display: flex;
        flex-direction: column-reverse;
        background-color: #F5F5F5;
        // scrollbar-width: none;
    }
    
    .chat-segment {
        overflow-y: scroll;
        display: flex;
        flex-direction: column-reverse;
        background-color: #F5F5F5;
    }
    
    .input-segment {
        color: rgba(0,0,0,0.5);
        background-color: #F5F5F5;
    }
`

function Chat() {
    const { auth } = useContext(AuthContext)
    const id = auth._id
    const [selectedChat, setSelectedChat] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedName, setSelectedName] = useState(null)
    const [chatContent, setContent] = useState('')

    const { loading, data, refetch } = useQuery(GET_CHATS)

    const { getChats: chats } = data ? data : []

    const { data: newMessageData } = useSubscription(NEW_MESSAGE)

    useEffect(() => {
        if (newMessageData && newMessageData.newMessage.chat == selectedChat) {
            messagesRefetch()
            refetch()
        } else {
            refetch()
        }
    }, [newMessageData])

    const [
        getMessages,
        { loading: messagesLoading, data: messagesData, refetch: messagesRefetch },
    ] = useLazyQuery(GET_MESSAGES)

    useEffect(() => {
        if (selectedChat) {
            getMessages({ variables: { chatId: selectedChat } })
        }
    }, [selectedChat])

    const onChange = e => {
        setContent(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        sendMessageCallback()
    }

    const [sendMessage, { error }] = useMutation(SEND_MESSAGE, {
        update() {
            setContent('')
        },
        variables: { chatId: selectedChat, content: chatContent, to: selectedUser },
        refetchQueries: [{
            query: GET_MESSAGES,
            variables: { chatId: selectedChat }
        }, {
            query: GET_CHATS
        }],
        awaitRefetchQueries: true
    })

    function sendMessageCallback() {
        sendMessage()
    }

    let chatsHeader
    if (selectedChat == null) {
        chatsHeader =
            <Segment attached>
                <Menu size="large" fluid secondary>
                    <Menu.Item>
                        <Icon name="user" centered="true"></Icon>
                    &nbsp;&nbsp;&nbsp;<b>Select User from Chat List</b>
                    </Menu.Item>
                </Menu>
            </Segment>
    } else {
        chatsHeader =
            <Segment attached>
                <Menu size="large" fluid secondary>
                    <Menu.Item>
                        <Icon name="user" centered="true"></Icon>
                        <b>{selectedName}</b>
                    </Menu.Item>
                </Menu>
            </Segment>
    }

    let chatsContent
    if (!chats || loading) {
        chatsContent = <Spinner />

    } else if (chats.length == 0) {
        chatsContent =
            <Segment placeholder>
                <Header icon>
                    <Icon name='chat' />
                    No messages yet
                </Header>
            </Segment>

    } else if (chats.length > 0) {
        chatsContent = chats.map((chat) => (
            chat.users[1]._id == id && chat.lastMessage == '' ?
                [] : (
                    <Popup
                        content={
                            <>
                                <Moment format='DD/MM/YY'>{chat.sent}</Moment>
                                <br></br>
                                <Moment format='HH:mm'>{chat.sent}</Moment>
                            </>
                        }
                        position='left center'
                        size='small'
                        inverted
                        trigger={<Menu.Item
                            onClick={
                                () => {
                                    chat.users.map(user =>
                                        user._id !== id ? (
                                            setSelectedUser(user._id),
                                            setSelectedName(user.name)
                                        ) : []
                                    )
                                    setSelectedChat(chat._id)
                                }
                            }
                        >
                            {
                                chat.status.map(status =>
                                    status.user == id && status.read == false ? (
                                        <Label color='green' circular empty />
                                    ) : []
                                )
                            }
                            <Feed size='medium'>
                                <Feed.Event>
                                    {
                                        chat.users.map(user =>
                                            user._id !== id ? (
                                                <Feed.Label image={user.image} />
                                            ) : []
                                        )
                                    }
                                    <Feed.Content>
                                        {
                                            chat.users.map(user =>
                                                user._id !== id ? (
                                                    <Feed.Summary>{user.name}</Feed.Summary>
                                                ) : []
                                            )
                                        }
                                        {/* <br></br>
                                <Feed.Date>{<Moment format='DD/MM/YY HH:mm'>{chat.sent}</Moment>}</Feed.Date> */}
                                        <Feed.Extra text>
                                            {chat.lastMessage}
                                        </Feed.Extra>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Menu.Item>
                        }
                    />
                )
        ))
    }

    const messageStyle = {
        marginLeft: 10,
        marginRight: 10,
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)',
    }

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={5} stretched>
                    <Menu fluid vertical className='chat-segment'>
                        <Menu.Item>
                            <h3>Chat List</h3>
                        </Menu.Item>
                        {chatsContent}
                        <Menu.Item></Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column width={9} stretched>
                    {chatsHeader}
                    <Segment attached className='message-segment'>
                        <Grid>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid>
                        {
                            messagesLoading ?
                                <Spinner /> :
                                messagesData &&
                                    messagesData.getMessages.length > 0 ? (
                                    messagesData.getMessages.map((message) =>
                                        message.from == id ? (
                                            <Popup
                                                content={
                                                    <>
                                                        <Moment format='DD/MM/YY'>{message.sent}</Moment>
                                                        <br></br>
                                                        <Moment format='HH:mm'>{message.sent}</Moment>
                                                    </>
                                                }
                                                position='right center'
                                                inverted
                                                size='mini'
                                                trigger={
                                                    <Grid>
                                                        <Grid.Column style={{ padding: 0, margin: 0 }}>
                                                            <Segment basic compact floated='right'>
                                                                <Label size='large' color='blue' pointing='right' style={messageStyle}>
                                                                    {message.content}
                                                                </Label>
                                                            </Segment>
                                                        </Grid.Column>
                                                    </Grid>
                                                }
                                            />
                                        ) : (
                                            <Popup
                                                content={
                                                    <>
                                                        <Moment format='DD/MM/YY'>{message.sent}</Moment>
                                                        <br></br>
                                                        <Moment format='HH:mm'>{message.sent}</Moment>
                                                    </>
                                                }
                                                position='left center'
                                                inverted
                                                size='mini'
                                                trigger={
                                                    <Grid>
                                                        <Grid.Column style={{ padding: 0, margin: 0 }}>
                                                            <Segment basic compact floated='left'>
                                                                <Label size='large' basic pointing='left' style={messageStyle}>
                                                                    {message.content}
                                                                </Label>
                                                            </Segment>
                                                        </Grid.Column>
                                                    </Grid>
                                                }
                                            />
                                        )
                                    )
                                ) : []
                        }
                    </Segment>
                    {
                        selectedChat ? (
                            <Segment attached='bottom' className='input-segment'>
                                <Form className="form" onSubmit={e => onSubmit(e)}>
                                    <Input fluid focus placeholder='Write message here...'
                                        value={chatContent}
                                        onChange={e => onChange(e)}
                                    >
                                        <input />
                                        <Button type='submit' icon='send' primary></Button>
                                    </Input>
                                </Form>
                            </Segment>
                        ) :
                            <Segment attached='bottom'>
                                <Input action={{ icon: 'send', color: 'blue' }} fluid disabled placeholder='Write message here...' />
                            </Segment>
                    }
                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
            </Grid>
        </Styles>
    )
}
export default Chat