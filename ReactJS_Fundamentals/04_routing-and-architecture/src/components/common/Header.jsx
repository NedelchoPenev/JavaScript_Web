import React, { Component } from 'react';
import '../../styles/header.css';
import observer from '../../infarastucture/observer';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null
        }

        observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    }

    userLoggedIn = username =>
        this.setState({ username })

    userHide = () => {
        return this.setState({ username: null });
    }

    render() {
        const loggedInUser =
            <div id="profile">
                <span id="username">Hello, {this.state.username}!</span>
                |<Link to='/logout' onClick={this.userHide}>logout</Link>
            </div>
        return (
            <header>
                <span className="logo">☃</span><span className="header">SeenIt</span>
                {this.state.username ? loggedInUser : null}
            </header>
        );
    }
}

export default Header;
