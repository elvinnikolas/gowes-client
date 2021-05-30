import React, { useContext, useState } from 'react'
import { storage } from '../firebase'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Segment, Button, Form, Header, Divider, Icon, Progress } from 'semantic-ui-react'
import styled from 'styled-components'
import Spinner from '../components/Spinner'
import profileImage from '../assets/profile.jpg'

import { AuthContext } from '../context/auth'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from '../util/hooks'
import { GET_USER, EDIT_PROFILE } from '../util/graphql'

const Styles = styled.div`
    
`

function EditImage() {

    const context = useContext(AuthContext)
    const { auth } = useContext(AuthContext)
    let id = auth._id
    let history = useHistory()

    const fileInputRef = React.createRef();
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState('')

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

    const { loading, data } = useQuery(GET_USER, {
        variables: { id }
    })
    const { getUser } = data ? data : []

    const { onChange, onSubmit, values } = useForm(editProfileCallback, {
        name: getUser.name,
        bio: getUser.bio
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
                            <Form className="form" onSubmit={e => onSubmit(e)}>
                                <Divider />
                                <Form.Field>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        hidden
                                        onChange={handleUpload}
                                    />
                                    <img src={url || profileImage} height="200" width="200" />
                                    {progress < 100 ? (
                                        <Progress percent={progress} progress />
                                    ) : (
                                        <Progress percent={progress} color='green' progress />
                                    )}
                                    <Button primary onClick={() => fileInputRef.current.click()}>
                                        Change Image
                                    </Button>
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
                                {/* <Button.Group> */}
                                <Button positive type='submit' fluid>Submit</Button>
                                {/* <Button.Or /> */}
                                <br></br>
                                <Link to='/user-profile'>
                                    <Button negative fluid>Cancel</Button>
                                </Link>
                                {/* </Button.Group> */}
                            </Form>
                        </Segment>

                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles >
        )
    }
}

export default EditImage



// import React, { useState } from 'react'
// import { storage } from '../firebase'
// import { Button, Input, Form, Image, Progress } from 'semantic-ui-react'
// import profileImage from '../assets/profile.jpg'

// function EditImage() {
//     const fileInputRef = React.createRef();
//     const [progress, setProgress] = useState(0)
//     const [url, setUrl] = useState('')

//     const handleUpload = (e) => {
//         const image = e.target.files[0]
//         if (image) {
//             const uploadTask = storage.ref(`profile/${image.name}`).put(image)
//             uploadTask.on('state_changed',
//                 (snapshot) => {
//                     // progress function ....
//                     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
//                     setProgress(progress)
//                 },
//                 (error) => {
//                     // error function ....
//                     console.log(error)
//                 },
//                 () => {
//                     // complete function ....
//                     storage.ref('profile').child(image.name).getDownloadURL().then(url => {
//                         setUrl(url)
//                     })
//                 })
//         }
//     }

//     return (
//         <Form>
//             {progress < 100 ? (
//                 <Progress percent={progress} progress />
//             ) : (
//                 <Progress percent={progress} color='green' progress />
//             )}
//             <br /><br />
//             <Button primary onClick={() => fileInputRef.current.click()}>
//                 Upload Image
//             </Button>
//             <input
//                 ref={fileInputRef}
//                 type="file"
//                 hidden
//                 onChange={handleUpload}
//             />
//             <br /><br />
//             {/* <Button primary onClick={handleUpload}>
//                 Save
//             </Button> */}
//             <br /><br />
//             <img src={url || profileImage} height="250" width="250" />
//             {console.log(url)}
//         </Form>
//     )
// }

// export default EditImage