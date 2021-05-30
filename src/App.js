//react
import React from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//css
import 'semantic-ui-css/semantic.min.css'
import "react-slideshow-image/dist/styles.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './context/auth'

//components
import { Layout } from './components/Layout'
import NavbarDefault from './components/Navbar'
import { Footer } from './components/Footer'

//layouts
import Home from './layouts/Home'
import Login from './layouts/Login'
import Register from './layouts/Register'
import BookmarkThread from './layouts/Bookmark'
import { Profile, UserProfile } from './layouts/Profile'
import EditProfile from './layouts/EditProfile'
import EditImage from './layouts/EditImage'
import { ExploreCommunity, ExploreCommunityGuest } from './layouts/ExploreCommunity'
import { ExploreThread, ExploreThreadGuest } from './layouts/ExploreThread'
import { Community, CommunityGuest } from './layouts/Community'
import { CreateCommunity } from './layouts/CreateCommunity'
import { CreateThread } from './layouts/CreateThread'
import { ThreadDetail, ThreadDetailGuest } from './layouts/ThreadDetail'
import { Faq, FaqAdmin } from './layouts/Faq'
import { CommunityAdmin } from './layouts/CommunityAdmin'
import Chat from './layouts/Chat'
import Notification from './layouts/Notification'

//route
import AuthRoute from './routes/AuthRoute'
import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavbarDefault />
        <Container>
          <Layout>
            <Switch>
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />

              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/bookmark" component={BookmarkThread} />
              <PrivateRoute exact path="/user-profile" component={UserProfile} />
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/edit-image" component={EditImage} />
              <PrivateRoute exact path="/explore-thread" component={ExploreThread} />
              <PrivateRoute exact path="/explore-community" component={ExploreCommunity} />
              <PrivateRoute path="/community/:id" component={Community} />
              <PrivateRoute path="/create-community" component={CreateCommunity} />
              <PrivateRoute path="/create-thread/:id" component={CreateThread} />
              <PrivateRoute path="/thread/:id" component={ThreadDetail} />
              <PrivateRoute path="/chat" component={Chat} />
              <PrivateRoute path="/notification" component={Notification} />

              <Route path="/faq" component={Faq} />
              <Route exact path="/explore-community-guest" component={ExploreCommunityGuest} />
              <Route exact path="/explore-thread-guest" component={ExploreThreadGuest} />
              <Route exact path="/community-guest/:id" component={CommunityGuest} />
              <Route path="/thread-guest/:id" component={ThreadDetailGuest} />

              <AdminRoute path="/faq-admin" component={FaqAdmin} />
              <AdminRoute path="/community-admin" component={CommunityAdmin} />
            </Switch>
          </Layout>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App