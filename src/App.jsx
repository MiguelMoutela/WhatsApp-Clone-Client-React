import * as React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import AuthScreen from './components/AuthScreen'
import ChatRoomScreen from './components/ChatRoomScreen'
import ChatsListScreen from './components/ChatsListScreen'
import AnimatedSwitch from './components/AnimatedSwitch'
import { withAuth } from './services/auth.service'

const App = () => (
  <BrowserRouter>
    <AnimatedSwitch>
      <Route exact path="/sign-in" component={AuthScreen} />
      <Route exact path="/chats" component={withAuth(ChatsListScreen)} />
      <Route exact path="/chats/:chatId" component={withAuth(ChatRoomScreen)} />
    </AnimatedSwitch>
    <Route exact path="/" render={redirectToChats} />
  </BrowserRouter>
)

const redirectToChats = () => (
  <Redirect to="/chats" />
)

export default App
