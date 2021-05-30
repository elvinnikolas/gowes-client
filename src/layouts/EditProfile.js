import React, { useContext, useState } from 'react'
import { storage } from '../firebase'
import { useHistory } from 'react-router-dom'
import { Grid, Segment, Button, Form, Header, Divider, Icon, Progress, Container } from 'semantic-ui-react'
import styled from 'styled-components'
import Spinner from '../components/Spinner'

import { AuthContext } from '../context/auth'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from '../util/hooks'
import { GET_USER, EDIT_PROFILE } from '../util/graphql'

const Styles = styled.div`
    
`

function EditProfile() {

    const context = useContext(AuthContext)
    const { auth } = useContext(AuthContext)
    let id = auth._id
    let history = useHistory()

    const { loading, data } = useQuery(GET_USER, {
        variables: { id }
    })
    const { getUser: user } = data ? data : []

    const fileInputRef = React.createRef()
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState(user.image)

    const { onChange, onSubmit, values } = useForm(editProfileCallback, {
        name: user.name,
        bio: user.bio
    })

    const [editProfile] = useMutation(EDIT_PROFILE, {
        update(_, result) {
            context.update(result.data.editProfile)
            history.push('/user-profile')
        },
        variables: { name: values.name, bio: values.bio, image: url }
    })

    function editProfileCallback() {
        editProfile()
    }

    function onCancel() {
        history.push('/user-profile')
    }

    const handleUpload = (e) => {
        const image = e.target.files[0]
        if (image) {
            const uploadTask = storage.ref(`profile/${image.name}`).put(image)
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
                    storage.ref('profile').child(image.name).getDownloadURL().then(url => {
                        setUrl(url)
                    })
                })
        }
    }

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        return (
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={8}>

                        <Segment placeholder>
                            <Header as='h2' textAlign='center'>
                                <Icon name='pencil' />
                                Edit Profile
                            </Header>
                            <Container textAlign='center'>
                                <Form className="form" onSubmit={e => onSubmit(e)}>
                                    <Divider />
                                    <Form.Field>
                                        <label>Image:</label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            hidden
                                            onChange={handleUpload}
                                        />
                                        <img src={url || user.image} height="200" width="200" />
                                        {progress < 100 ? (
                                            <Progress percent={progress} progress />
                                        ) : (
                                            <Progress percent={progress} color='green' progress />
                                        )}
                                        <Button.Group fluid>
                                            <Button type="button" primary
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                Upload
                                        </Button>
                                            <Button.Or />
                                            <Button type="button" secondary
                                                onClick={() => setUrl('https://firebasestorage.googleapis.com/v0/b/gowes-community.appspot.com/o/profile%2Fprofile.jpg?alt=media&token=f4906486-2686-47e8-95a9-68719f51e05f')}
                                            >
                                                Remove
                                        </Button>
                                        </Button.Group>
                                    </Form.Field>
                                    <Divider />
                                    <Form.Field>
                                        <label>Name:</label>
                                        <input
                                            name='name'
                                            placeholder='Name'
                                            value={values.name}
                                            onChange={e => onChange(e)}
                                        />
                                    </Form.Field>
                                    <Form.TextArea
                                        name='bio'
                                        label='Bio:'
                                        placeholder='Bio'
                                        value={values.bio}
                                        onChange={e => onChange(e)}
                                    />
                                    <br></br>
                                    <Button.Group>
                                        <Button positive type='submit'>Save</Button>
                                        <Button.Or />
                                        <Button type='button' onClick={onCancel} negative>Cancel</Button>
                                    </Button.Group>
                                </Form>
                            </Container>
                        </Segment>

                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles >
        )
    }
}

export default EditProfile
