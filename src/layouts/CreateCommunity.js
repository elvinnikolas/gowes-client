
import React, { useState } from 'react'
import { storage } from '../firebase'
import { useHistory } from 'react-router-dom'
import { Button, Form, Dropdown, Header, Icon, Grid, Segment, Modal, Progress, Container } from 'semantic-ui-react'
import styled from 'styled-components'

import { CREATE_COMMUNITY } from '../util/graphql'
import { useMutation } from '@apollo/client'
import { GET_FILTER_COMMUNITIES } from '../util/graphql'

import _ from 'lodash'

const Styles = styled.div`
    
`

export function CreateCommunity() {
    const addressDefinitions =
    {
        state: [
            { "id": 11, "nama": "Aceh" }, { "id": 12, "nama": "Sumatera Utara" }, { "id": 13, "nama": "Sumatera Barat" }, { "id": 14, "nama": "Riau" }, { "id": 15, "nama": "Jambi" }, { "id": 16, "nama": "Sumatera Selatan" }, { "id": 17, "nama": "Bengkulu" }, { "id": 18, "nama": "Lampung" }, { "id": 19, "nama": "Kepulauan Bangka Belitung" }, { "id": 21, "nama": "Kepulauan Riau" }, { "id": 31, "nama": "Dki Jakarta" }, { "id": 32, "nama": "Jawa Barat" }, { "id": 33, "nama": "Jawa Tengah" }, { "id": 34, "nama": "Di Yogyakarta" }, { "id": 35, "nama": "Jawa Timur" }, { "id": 36, "nama": "Banten" }, { "id": 51, "nama": "Bali" }, { "id": 52, "nama": "Nusa Tenggara Barat" }, { "id": 53, "nama": "Nusa Tenggara Timur" }, { "id": 61, "nama": "Kalimantan Barat" }, { "id": 62, "nama": "Kalimantan Tengah" }, { "id": 63, "nama": "Kalimantan Selatan" }, { "id": 64, "nama": "Kalimantan Timur" }, { "id": 65, "nama": "Kalimantan Utara" }, { "id": 71, "nama": "Sulawesi Utara" }, { "id": 72, "nama": "Sulawesi Tengah" }, { "id": 73, "nama": "Sulawesi Selatan" }, { "id": 74, "nama": "Sulawesi Tenggara" }, { "id": 75, "nama": "Gorontalo" }, { "id": 76, "nama": "Sulawesi Barat" }, { "id": 81, "nama": "Maluku" }, { "id": 82, "nama": "Maluku Utara" }, { "id": 91, "nama": "Papua Barat" }, { "id": 94, "nama": "Papua" }
        ]
    }

    const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: state.id,
        text: state.nama,
        value: state.nama,
    }))

    const [values, setValues] = useState({
        name: '',
        bio: '',
        city: '',
        province: '',
        isPrivate: '',
    })

    let history = useHistory()

    const fileInputRef = React.createRef()
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState('https://firebasestorage.googleapis.com/v0/b/gowes-community.appspot.com/o/community%2Fgowes.jpg?alt=media&token=2cb149c2-3eae-4a19-a147-dde7cf0978d3')
    const [modalOpen, setModalOpen] = useState(false)

    const handleUpload = (e) => {
        const image = e.target.files[0]
        if (image) {
            const uploadTask = storage.ref(`community/${image.name}`).put(image)
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
                    storage.ref('community').child(image.name).getDownloadURL().then(url => {
                        setUrl(url)
                    })
                })
        }
    }

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        createCommunityCallback()
        history.push('/explore-community')
    }

    const [createCommunity, { error }] = useMutation(CREATE_COMMUNITY, {
        variables: { ...values, image: url },
        refetchQueries: [{
            query: GET_FILTER_COMMUNITIES,
            variables: { filter: '', location: '', sort: '' }
        }],
        awaitRefetchQueries: true
    })

    function createCommunityCallback() {
        createCommunity()
    }

    const onChangeDropdown = (e, data) => {
        setValues({ ...values, [data.name]: data.value })
    }

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={8}>

                    <Segment>
                        <Header as='h2' textAlign='center'>
                            <Icon name='group' />
                            Create Community
                        </Header>
                        <br></br>
                        <Form className="form" onSubmit={e => onSubmit(e)}>
                            <Form.Field>
                                <label>Image:</label>
                                <Container textAlign='center'>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        hidden
                                        onChange={handleUpload}
                                    />
                                    <img src={url} height="200" width="200" />
                                    {progress > 0 ?
                                        progress < 100 ? (
                                            <Progress percent={progress} progress />
                                        ) : (
                                            <Progress percent={progress} color='green' progress />
                                        ) : []
                                    }
                                    <br></br>
                                    <Button.Group>
                                        <Button type="button" primary
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            Upload
                                        </Button>
                                        <Button.Or />
                                        <Button type="button" secondary
                                            onClick={() => setUrl('https://firebasestorage.googleapis.com/v0/b/gowes-community.appspot.com/o/community%2Fgowes.jpg?alt=media&token=2cb149c2-3eae-4a19-a147-dde7cf0978d3')}
                                        >
                                            Remove
                                        </Button>
                                    </Button.Group>
                                </Container>
                            </Form.Field>
                            <Form.Field>
                                <label>Name:</label>
                                <input
                                    name='name'
                                    placeholder='Community Name'
                                    value={values.name}
                                    onChange={e => onChange(e)}
                                    error={error ? true : false}
                                />
                            </Form.Field>
                            <Form.TextArea
                                name='bio'
                                label='Bio:'
                                placeholder='Community Bio'
                                value={values.bio}
                                onChange={e => onChange(e)}
                                error={error ? true : false}
                            />
                            <Form.Field>
                                <label>City:</label>
                                <input
                                    name='city'
                                    placeholder='City'
                                    value={values.city}
                                    onChange={e => onChange(e)}
                                    error={error ? true : false}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Province:</label>
                                <Dropdown
                                    name='province'
                                    placeholder='Province'
                                    fluid
                                    search
                                    selection
                                    onChange={onChangeDropdown}
                                    options={stateOptions}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Visibility:</label>
                                <Dropdown
                                    name='isPrivate'
                                    placeholder='Select Visibility'
                                    fluid
                                    selection
                                    onChange={onChangeDropdown}
                                    options={
                                        [
                                            {
                                                key: 'private',
                                                text: 'Private',
                                                value: true,
                                            },
                                            {
                                                key: 'public',
                                                text: 'Public',
                                                value: false,
                                            }
                                        ]
                                    }
                                />
                            </Form.Field>
                            <br></br>
                            <Button positive type='button' onClick={() => setModalOpen(true)}>Submit</Button>

                            <Modal
                                size='mini'
                                onClose={() => setModalOpen(false)}
                                onOpen={() => setModalOpen(true)}
                                open={modalOpen}
                            >
                                <Modal.Header>Community Created Successfully</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Form>
                                            <p>Please wait for the admin to review it first
                                            <br></br>
                                            You will get notified after being approved</p>
                                        </Form>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button
                                        type="submit"
                                        content="Understood"
                                        primary
                                        onClick={e => onSubmit(e)}
                                    />
                                </Modal.Actions>
                            </Modal>
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