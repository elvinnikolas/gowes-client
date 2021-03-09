import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../util/hooks'
import { AuthContext } from '../context/auth'

const Styles = styled.div`
  .my-1 {
    margin: 1rem 0;
  }
`

const LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(email: $email, password: $password) 
        {
            _id
            name
            email
            date
            token
        }
    }
`

function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUser, {
    email: '',
    password: ''
  })

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login)
      props.history.push('/')
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function loginUser() {
    login()
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
                  <h3><b>Sign in to Your Account</b></h3>
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
                  <br></br>
                  <Button size='large' content='Login' primary />

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
                    Don't have an account?&nbsp;
                    <Link to='/register'>Sign Up</Link>
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

export default Login