import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Button, Segment, Image, Icon } from 'semantic-ui-react'
import { IoMdBicycle } from 'react-icons/io'
import Popup from './Popup'
import styled from 'styled-components'

import { AuthContext } from '../context/auth'

import profilePic from '../assets/profile.jpg'

const Styles = styled.div`
  .navbar {
    height: 80;
  }

  .logo { 
    fontSize: 30;
    marginRight: 5;
  }

  .navbar-brand { 
    margin-right: 100px;
  }

  .navbar-text {
    font-family: 'Roboto', cursive;
    color: rgb(206, 206, 206);
    font-size: 25px;
  }

  .navbar-subtext {
    font-family: 'Roboto', cursive;
    color: rgb(206, 206, 206);
    font-size: 20px;
  }
`
const NavbarDefault = () => {
  const { auth, logout } = useContext(AuthContext)

  const path = window.location.pathname
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  let showname = ''
  if (auth !== null && auth.name !== undefined) {
    showname = auth.name.split(" ")[0]
  } else {
    showname = 'User'
  }

  const NavbarMenu =
    auth ?
      (
        <Segment>
          <div className='ui huge top inverted fixed menu navbar'>
            <Menu size="large" fluid inverted secondary>
              <Menu.Item></Menu.Item>
              <Menu.Item
                style={{ marginRight: 100 }}
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
              >
                <IoMdBicycle color='rgb(206, 206, 206)' style={{ fontSize: 30, marginRight: 5 }}></IoMdBicycle>
                <div className="navbar-text">GOWES</div>
              </Menu.Item>
              <Menu.Item
                className="navbar-subtext"
                name='HOME'
                active={activeItem === 'HOME'}
                onClick={handleItemClick}
                as={Link}
                to="/"
              />
              <Menu.Item
                className="navbar-subtext"
                name='FAQ'
                active={activeItem === 'FAQ'}
                onClick={handleItemClick}
                as={Link}
                to="/faq"
              />
              <Menu.Item
                className="navbar-subtext"
                name='EXPLORE'
                active={activeItem === 'EXPLORE'}
                onClick={handleItemClick}
                as={Link}
                to="/explore-thread"
              />
              <Menu.Item
                className="navbar-subtext"
                name='COMMUNITY'
                active={activeItem === 'COMMUNITY'}
                onClick={handleItemClick}
                as={Link}
                to="/explore-community"
              />
              {/* <Menu.Item
                className="navbar-subtext"
                name='MARKETPLACE'
                active={activeItem === 'MARKETPLACE'}
                onClick={handleItemClick}
                as={Link}
                to="/marketplace"
              /> */}


              <Menu.Menu position='right'>
                <Menu.Item
                  className="navbar-subtext"
                  name='bookmark'
                  active={activeItem === 'bookmark'}
                  onClick={handleItemClick}
                  as={Link}
                  to="/bookmark"
                >
                  <Popup content="Bookmark">
                    <Icon name="bookmark" centered="true"></Icon>
                  </Popup>
                </Menu.Item>

                <Menu.Item
                  className="navbar-subtext"
                  name='chat'
                  active={activeItem === 'chat'}
                  onClick={handleItemClick}
                  as={Link}
                  to="/chat"
                >
                  <Popup content="Chat">
                    <Icon name="chat" centered="true"></Icon>
                  </Popup>
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to="/user-profile"
                  className="navbar-subtext"
                >
                  <Image circular src={profilePic} style={{ height: 30, marginRight: 0 }} verticalAlign='middle' />
                  &nbsp;&nbsp;{showname}
                </Menu.Item>

                <Menu.Item>
                  <Button
                    color='red'
                    inverted
                    name='LOGOUT'
                    onClick={logout}
                    as={Link}
                  >
                    LOGOUT
                  </Button>
                </Menu.Item>

                <Menu.Item></Menu.Item>
              </Menu.Menu>
            </Menu>
          </div>
        </Segment >

      )

      :

      (
        <Segment inverted>
          <div className="ui huge top inverted fixed menu navbar">
            <Menu fluid inverted secondary size='large'>
              <Menu.Item></Menu.Item>
              <Menu.Item
                style={{ marginRight: 100 }}
                active={activeItem === ''}
                onClick={handleItemClick}
                as={Link}
                to="/"
              >
                <IoMdBicycle color='rgb(206, 206, 206)' style={{ fontSize: 30, marginRight: 5 }}></IoMdBicycle>
                <div className="navbar-text">GOWES</div>
              </Menu.Item>

              <Menu.Item
                className="navbar-subtext"
                name='FAQ'
                active={activeItem === 'FAQ'}
                onClick={handleItemClick}
                as={Link}
                to="/faq"
              />
              <Menu.Item
                className="navbar-subtext"
                name='EXPLORE'
                active={activeItem === 'EXPLORE'}
                onClick={handleItemClick}
                as={Link}
                to="/explore-thread"
              />
              <Menu.Item
                className="navbar-subtext"
                name='COMMUNITY'
                active={activeItem === 'COMMUNITY'}
                onClick={handleItemClick}
                as={Link}
                to="/explore-community"
              />


              <Menu.Menu position='right'>
                <Menu.Item>
                  <Button
                    color='teal'
                    inverted
                    name='LOGIN'
                    active={activeItem === 'LOGIN'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                  >
                    LOGIN
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    color='green'
                    inverted
                    name='REGISTER'
                    active={activeItem === 'REGISTER'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                  >
                    REGISTER
                  </Button>
                </Menu.Item>
                <Menu.Item></Menu.Item>
              </Menu.Menu>
            </Menu>
          </div>
        </Segment>
      )

  return (
    <Styles>
      {NavbarMenu}
    </Styles>
  )
}

export default NavbarDefault