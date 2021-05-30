import React, { useState } from 'react'
import { Grid, Tab, Accordion, Icon, Header, Message, Button, Label, Divider, Form, Dropdown, Input, TextArea, Menu, Container, Modal, Ref, Sticky } from 'semantic-ui-react'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

import { useQuery, useMutation } from '@apollo/client'
import { GET_FAQS, ADD_FAQ_CATEGORY, ADD_FAQ, REMOVE_FAQ } from '../util/graphql'

const Styles = styled.div`
  .content-text {
    font-family: 'Roboto', cursive;
    font-size: 15px;
  }

  .paragraph {
    font-size: 14px;
    white-space: pre-line;
  }
`;

export function Faq() {
    const contextRef = React.createRef()

    const { loading, data } = useQuery(GET_FAQS)

    const { getFaqs: faqs } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        return (
            <Ref innerRef={contextRef}>
                <Styles>
                    <Grid columns='equal'>
                        <Grid.Column>
                        </Grid.Column>

                        <Grid.Column width={14}>
                            <Header as='h2' textAlign='center'>
                                <Icon name='question circle' />
                                Frequently Asked Questions
                            </Header>
                            <br></br>

                            <Tab
                                menu={(
                                    <Menu as={Sticky} context={contextRef} offset={100} vertical tabular></Menu>
                                )}
                                panes={
                                    faqs.map(faq => (
                                        {
                                            menuItem: faq.category,
                                            render: () => (
                                                <Accordion
                                                    className="content-text"
                                                    panels={
                                                        faq.contents.map(content => (
                                                            {
                                                                key: content._id,
                                                                title: content.question,
                                                                content: {
                                                                    content: (
                                                                        <Message className="paragraph"
                                                                            content={content.answer}
                                                                        />
                                                                    ),
                                                                }
                                                            }
                                                        ))
                                                    }
                                                    exclusive={false}
                                                    fluid
                                                    styled
                                                />
                                            )
                                        }
                                    ))
                                }
                            />
                        </Grid.Column>

                        <Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Styles>
            </Ref>
        )
    }
}

export function FaqAdmin() {
    const contextRef = React.createRef()

    const [addTopic, setAddTopic] = useState('')
    const [removeTopic, setRemoveTopic] = useState('')
    const [addTopicModal, setAddTopicModal] = useState(false)
    const [removeTopicModal, setRemoveTopicModal] = useState(false)

    const [addCategory, setAddCategory] = useState('')
    const [addQuestion, setAddQuestion] = useState('')
    const [addAnswer, setAddAnswer] = useState('')
    const [addFaqModal, setAddFaqModal] = useState(false)

    const { loading, data, refetch } = useQuery(GET_FAQS)

    const { getFaqs: faqs } = data ? data : []

    let categoryOptions = []
    if (faqs) {
        faqs.forEach(faq => {
            categoryOptions.push({
                key: faq._id,
                text: faq.category,
                value: faq.category,
            })
        })
    }

    const [addFaqCategory] = useMutation(ADD_FAQ_CATEGORY, {
        variables: { category: addTopic },
        update() {
            refetch()
            setAddTopicModal(false)
            setAddTopic('')
        }
    })

    const [addFaq] = useMutation(ADD_FAQ, {
        variables: { category: addCategory, question: addQuestion, answer: addAnswer },
        update() {
            refetch()
            setAddFaqModal(false)
            setAddCategory('')
            setAddQuestion('')
            setAddAnswer('')
        }
    })

    const [removeFaq] = useMutation(REMOVE_FAQ, {
        variables: { category: removeTopic },
        update() {
            refetch()
            setRemoveTopicModal(false)
            setRemoveTopic('')
        }
    })

    const onChangeAddDropdown = (e, data) => {
        setAddCategory(data.value)
    }
    const onChangeRemoveDropdown = (e, data) => {
        setRemoveTopic(data.value)
    }

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        return (
            <Ref innerRef={contextRef}>
                <Styles>
                    <Grid columns='equal'>
                        <Grid.Column>
                        </Grid.Column>

                        <Grid.Column width={14}>
                            <Header as='h2' textAlign='center'>
                                <Icon name='question circle' />
                                Frequently Asked Questions
                            </Header>

                            <Divider hidden />
                            <Container textAlign='center'>
                                <>
                                    <Button primary onClick={() => setAddTopicModal(true)}>Add Topic</Button>
                                    <Modal
                                        size='mini'
                                        onClose={() => setAddTopicModal(false)}
                                        onOpen={() => setAddTopicModal(true)}
                                        open={addTopicModal}
                                    >
                                        <Modal.Header>Add Topic</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <Form>
                                                    <Input
                                                        fluid
                                                        name='topic'
                                                        value={addTopic}
                                                        placeholder='Input topic name'
                                                        onChange={e => setAddTopic(e.target.value)}
                                                    />
                                                </Form>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button onClick={() => setAddTopicModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button
                                                content="Add"
                                                onClick={addFaqCategory}
                                                positive
                                            />
                                        </Modal.Actions>
                                    </Modal>
                                </>

                                <>
                                    <Button positive onClick={() => setAddFaqModal(true)}>Add Q&A</Button>
                                    <Modal
                                        size='small'
                                        onClose={() => setAddFaqModal(false)}
                                        onOpen={() => setAddFaqModal(true)}
                                        open={addFaqModal}
                                    >
                                        <Modal.Header>Add Q&A</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <Form>
                                                    <Label>Choose Topic:</Label>
                                                    <Dropdown
                                                        fluid
                                                        search
                                                        selection
                                                        options={categoryOptions}
                                                        onChange={onChangeAddDropdown}
                                                    />
                                                    <Divider hidden />
                                                    <Label>Question:</Label>
                                                    <Input
                                                        fluid
                                                        name='question'
                                                        value={addQuestion}
                                                        placeholder='Input question'
                                                        onChange={e => setAddQuestion(e.target.value)}
                                                    />
                                                    <Divider hidden />
                                                    <Label>Answer:</Label>
                                                    <TextArea
                                                        rows={7}
                                                        fluid
                                                        name='answer'
                                                        value={addAnswer}
                                                        placeholder='Input answer'
                                                        onChange={e => setAddAnswer(e.target.value)}
                                                    />
                                                </Form>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button onClick={() => setAddFaqModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button
                                                content="Add"
                                                onClick={addFaq}
                                                positive
                                            />
                                        </Modal.Actions>
                                    </Modal>
                                </>

                                <>
                                    <Button negative onClick={() => setRemoveTopicModal(true)}>Remove Topic</Button>
                                    <Modal
                                        size='mini'
                                        onClose={() => setRemoveTopicModal(false)}
                                        onOpen={() => setRemoveTopicModal(true)}
                                        open={removeTopicModal}
                                    >
                                        <Modal.Header>Remove Topic</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <Form>
                                                    <Label>Choose Topic:</Label>
                                                    <Dropdown
                                                        fluid
                                                        search
                                                        selection
                                                        options={categoryOptions}
                                                        onChange={onChangeRemoveDropdown}
                                                    />
                                                </Form>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button onClick={() => setRemoveTopicModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button
                                                content="Remove"
                                                onClick={removeFaq}
                                                negative
                                            />
                                        </Modal.Actions>
                                    </Modal>
                                </>
                            </Container>
                            <Divider />
                            <Divider hidden />

                            <Tab
                                menu={(
                                    <Menu as={Sticky} context={contextRef} offset={100} vertical tabular></Menu>
                                )}
                                panes={
                                    faqs.map(faq => (
                                        {
                                            menuItem: faq.category,
                                            render: () => (
                                                <Accordion
                                                    className="content-text"
                                                    panels={
                                                        faq.contents.map(content => (
                                                            {
                                                                key: content._id,
                                                                title: content.question,
                                                                content: {
                                                                    content: (
                                                                        <Message className="paragraph"
                                                                            content={content.answer}
                                                                        />
                                                                    ),
                                                                }
                                                            }
                                                        ))
                                                    }
                                                    exclusive={false}
                                                    fluid
                                                    styled
                                                />
                                            )
                                        }
                                    ))
                                }
                            />
                        </Grid.Column>

                        <Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Styles>
            </Ref>
        )
    }
}