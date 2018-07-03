import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import './App.css'

import Home from './components/form/home/Home';
import Pokemon from './components/form/pokemon/Pokemon';

class App extends Component {
  constructor() {
    super()

    let username = ''
    let token = ''
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
      username = localStorage.getItem('username')
      token = localStorage.getItem('token')
    }

    this.state = {
      username: username,
      token: token
    }

    this.isLogin = this.isLogin.bind(this)
  }

  isLogin() {
    if (!this.state.token) {
      return <Home />
    } else {
      return <Pokemon username={this.state.username} />
    }
  }

  render() {
    return (
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/pokemons" exact render={(props) => (
          <Pokemon {...props} username={this.state.username}/>
        )} />
      </div>
    )
  }
}

export default App
