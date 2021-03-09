import React, { Fragment } from 'react'
import spinner from '../assets/spinner.gif'
import styled from 'styled-components'

const Styles = styled.div`
  .spinner {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    display: block;
  }
`

export default () => (
  <Styles>
    <Fragment>
      <img
        className='spinner'
        src={spinner}
        alt='loading..'
      />
    </Fragment>
  </Styles>
)