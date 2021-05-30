import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { REGISTER_USER } from '../util/graphql'
import { useMutation } from '@apollo/client'
import { useForm } from '../util/hooks'
import { AuthContext } from '../context/auth'

const Styles = styled.div`
  .my-1 {
    margin: 1rem 0;
  }
`

function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(registerUser, {
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const [addUser] = useMutation(REGISTER_USER, {
        update(_, result) {
            context.login(result.data.register)
            props.history.push('/')
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser()
    }

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={8}>
                    <Segment placeholder>
                        <Grid relaxed='very' stackable>
                            <Grid.Column>

                                <Header textAlign='center'>
                                    <br></br>
                                    <h3><b>Sign Up Your Account</b></h3>
                                </Header>
                                <br></br>

                                <Form onSubmit={e => onSubmit(e)}>
                                    <Form.Input
                                        icon='at'
                                        iconPosition='left'
                                        label='Email'
                                        placeholder='Email'
                                        name='email'
                                        value={values.email}
                                        error={errors.email ? true : false}
                                        onChange={e => onChange(e)}
                                    />
                                    <Form.Input
                                        icon='user'
                                        iconPosition='left'
                                        label='Name'
                                        placeholder='Name'
                                        name='name'
                                        value={values.name}
                                        error={errors.name ? true : false}
                                        onChange={e => onChange(e)}
                                    />
                                    <Form.Input
                                        icon='lock'
                                        iconPosition='left'
                                        label='Password'
                                        placeholder='Password'
                                        type='password'
                                        name='password'
                                        value={values.password}
                                        error={errors.password ? true : false}
                                        onChange={e => onChange(e)}
                                    />
                                    <Form.Input
                                        icon='lock'
                                        iconPosition='left'
                                        label='Repeat Password'
                                        placeholder='Password'
                                        type='password'
                                        name='password2'
                                        value={values.password2}
                                        error={errors.password2 ? true : false}
                                        onChange={e => onChange(e)}
                                    />
                                    <br></br>
                                    <Button size='large' content='Register' primary />

                                </Form>
                                <br></br>
                                {Object.keys(errors).length > 0 && (
                                    <div className="ui error message">
                                        <div className="list">
                                            {Object.values(errors).map(value => (
                                                <li key={value}>{value}</li>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <Divider />

                                <Segment textAlign='center'>
                                    <p className="my-1">
                                        Already have an account?&nbsp;
                                        <Link to='/login'>Sign In</Link>
                                    </p>
                                </Segment>

                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
            </Grid>
        </Styles>
    )
}

export default Register