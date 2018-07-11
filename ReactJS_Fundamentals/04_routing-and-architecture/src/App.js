import React, { Component } from 'react';

import './App.css';
import './styles/site.css';

import Header from './components/common/Header';
import Notifications from './components/common/Notifications';
import RouterRender from './components/common/RouterRender';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="content">
          <Notifications />
          <RouterRender />
        </main>
      </div>
    );
  }
}

export default App;
