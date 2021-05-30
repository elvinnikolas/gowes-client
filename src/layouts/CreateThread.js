
import React, { useContext, useState } from 'react'
import { storage } from '../firebase'
import { useHistory } from 'react-router-dom'
import { Button, Form, Grid, Header, Icon, Image, Segment, Progress, Divider } from 'semantic-ui-react'
import styled from 'styled-components'

import { AuthContext } from '../context/auth'
import { useMutation } from '@apollo/client'
import { CREATE_POST, FETCH_QUERY_COMMUNITY } from '../util/graphql'

const Styles = styled.div`
    
`

export function CreateThread(props) {

    const { auth } = useContext(AuthContext)
    const userId = auth._id
    const communityId = props.match.params.id

    const fileInputRef = React.createRef()
    const [image, setImage] = useState([])
    const [progress, setProgress] = useState(0)

    const [values, setValues] = useState({
        title: '',
        content: ''
    })

    let history = useHistory()

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        createPostCallback()
        history.push(`/community/${communityId}`)
    }

    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: { title: values.title, content: values.content, communityId: communityId, images: image },
        refetchQueries: [{
            query: FETCH_QUERY_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    function createPostCallback() {
        createPost()
    }

    const handleUpload = (e) => {
        const image = e.target.files[0]
        if (image) {
            const uploadTask = storage.ref(`post/${image.name}`).put(image)
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progress function ....
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProgress(progress)
                },
                (error) => {
                    // error function ....
                    console.log(error)
                },
                () => {
                    // complete function ....
                    storage.ref('post').child(image.name).getDownloadURL().then(url => {
                        setImage(imgUrl => [...imgUrl, url])
                    })
                })
        }
    }

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={10}>

                    <Segment>
                        <Header as='h2' textAlign='center'>
                            <Icon name='pencil' />
                        Create New Thread
                    </Header>
                        <br></br>
                        <Form className="form" onSubmit={e => onSubmit(e)}>
                            <Form.Field>
                                <label>Title:</label>
                                <input
                                    name='title'
                                    placeholder='Thread title'
                                    value={values.title}
                                    onChange={e => onChange(e)}
                                    error={error ? true : false}
                                />
                            </Form.Field>

                            <Divider hidden />
                            <Form.Field>
                                <label>Images:</label>
                                <Segment>
                                    {image.length !== 0 ?
                                        (<Image.Group size='small'>
                                            {image &&
                                                image.map(image => (
                                                    <Image src={image} />
                                                ))}
                                        </Image.Group>) :
                                        (<Image.Group size='small'>
                                            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                        </Image.Group>)
                                    }
                                </Segment>
                                {progress > 0 ?
                                    progress < 100 ? (
                                        <Progress percent={progress} progress />
                                    ) : (
                                        <Progress percent={progress} color='green' progress />
                                    ) : []
                                }

                                <Button
                                    type="button"
                                    primary
                                    onClick={() => fileInputRef.current.click()}
                                    icon="plus"
                                    content="Add Image"
                                    disabled={image.length >= 4 ? true : false}
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    hidden
                                    onChange={handleUpload}
                                />
                            </Form.Field>
                            <Divider hidden />

                            <Form.TextArea
                                rows={12}
                                name='content'
                                label='Content:'
                                placeholder='Thread content'
                                value={values.content}
                                onChange={e => onChange(e)}
                                error={error ? true : false}
                            />
                            <Button positive type='submit'>Submit</Button>
                            <Button negative type='button' onClick={() => history.goBack()}>Back</Button>
                        </Form>

                        {error && (
                            <div className="ui error message">
                                <div className="list">
                                    <li>{error.graphQLErrors[0].message}</li>
                                </div>
                            </div>
                        )}
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
            </Grid>
        </Styles>
    )
}

// export default CreateThread