import React, { Fragment, useContext, useState } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Grid, Segment, Button, Form, Dropdown, Header, Divider, Icon } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import Spinner from '../components/Spinner'

import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { AuthContext } from '../context/auth'
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
    const { getUser } = data ? data : []

    const [errors, setErrors] = useState({})
    const { onChange, onSubmit, values } = useForm(editProfileCallback, {
        name: getUser.name,
        bio: getUser.bio
    })

    const [editProfile, { error }] = useMutation(EDIT_PROFILE, {
        update(_, result) {
            context.update(result.data.editProfile)
            history.push('/user-profile')
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function editProfileCallback() {
        editProfile()
    }

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        const { _id, name, bio } = getUser

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
                                <Form.Field>
                                    <label>Name:</label>
                                    <input
                                        name='name'
                                        placeholder='Name'
                                        value={values.name}
                                        onChange={e => onChange(e)}
                                        error={error ? true : false}
                                    />
                                </Form.Field>
                                <Form.TextArea
                                    name='bio'
                                    label='Bio:'
                                    placeholder='Bio'
                                    value={values.bio}
                                    onChange={e => onChange(e)}
                                    error={error ? true : false}
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
            </Styles >
        )
    }
}

export default EditProfile
