import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Button, Segment, Image, Icon } from 'semantic-ui-react'
import { IoMdBicycle } from 'react-icons/io'
import Popup from './Popup'
import styled from 'styled-components'

import { AuthContext } from '../context/auth'

import profileImage from '../assets/profile.jpg'

const Styles = styled.div`
  .navbar {
    height: 80;
  }

  .logo { 
    fontSize: 24;
    marginRight: 5;
  }

  .navbar-brand { 
    margin-right: 100px;
  }

  .navbar-text {
    font-family: 'Roboto', cursive;
    color: rgb(206, 206, 206);
    font-size: 20px;
  }

  .navbar-subtext {
    font-family: 'Roboto', cursive;
    color: rgb(206, 206, 206);
    font-size: 18px;
  }

  .navbar-style {
    z-index: 1000;
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
        <Segment className='navbar-style'>
          <div className='ui huge top inverted fixed menu navbar'>
            <Menu size="large" fluid inverted secondary>
              <Menu.Item></Menu.Item>
              <Menu.Item
                style={{ marginRight: 50 }}
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
              <Menu.Item>
                <Dropdown simple className="navbar-subtext" item text='EXPLORE'>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="navbar-subtext"
                      name='COMMUNITY'
                      active={activeItem === 'COMMUNITY'}
                      onClick={handleItemClick}
                      as={Link}
                      to="/explore-community"
                    >
                      COMMUNITY
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="navbar-subtext"
                      name='THREAD'
                      active={activeItem === 'THREAD'}
                      onClick={handleItemClick}
                      as={Link}
                      to="/explore-thread"
                    >
                      THREAD
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="navbar-subtext"
                      name='MARKETPLACE'
                      active={activeItem === 'MARKETPLACE'}
                      onClick={handleItemClick}
                      as='a'
                      href="http://gowes-market-react-client.herokuapp.com/"
                    >
                      MARKETPLACE
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>

              {auth.isAdmin &&
                <Menu.Item>
                  <Dropdown simple className="navbar-subtext" item text='ADMIN'>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="navbar-subtext"
                        name='FAQ-ADMIN'
                        active={activeItem === 'FAQ-ADMIN'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/faq-admin"
                      >
                        FAQ
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="navbar-subtext"
                        name='COMMUNITY-ADMIN'
                        active={activeItem === 'COMMUNITY-ADMIN'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/community-admin"
                      >
                        COMMUNITY
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
              }

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
                  className="navbar-subtext"
                  name='notification'
                  active={activeItem === 'notification'}
                  onClick={handleItemClick}
                  as={Link}
                  to="/notification"
                >
                  <Popup content="Notification">
                    <Icon name="bell" centered="true"></Icon>
                  </Popup>
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to="/user-profile"
                  className="navbar-subtext"
                >
                  {auth.image ?
                    <Image circular src={auth.image} style={{ height: 30, marginRight: 0 }} verticalAlign='middle' />
                    : <Image circular src={profileImage} style={{ height: 30, marginRight: 0 }} verticalAlign='middle' />
                  }
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
                style={{ marginRight: 70 }}
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
              <Menu.Item>
                <Dropdown simple className="navbar-subtext" item text='EXPLORE'>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="navbar-subtext"
                      name='COMMUNITY'
                      active={activeItem === 'COMMUNITY'}
                      onClick={handleItemClick}
                      as={Link}
                      to="/explore-community-guest"
                    >
                      COMMUNITY
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="navbar-subtext"
                      name='THREAD'
                      active={activeItem === 'THREAD'}
                      onClick={handleItemClick}
                      as={Link}
                      to="/explore-thread-guest"
                    >
                      THREAD
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              <Menu.Item
                className="navbar-subtext"
                name='MARKETPLACE'
                active={activeItem === 'MARKETPLACE'}
                onClick={handleItemClick}
                as='a'
                href="http://gowes-market-react-client.herokuapp.com/"
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