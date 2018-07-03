import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SingUpForm from './SingUpForm';

class Home extends Component {
    render() {
        return (
            <div>
                <SingUpForm />
                <LoginForm />
            </div>
        );
    }
}

export default Home;
