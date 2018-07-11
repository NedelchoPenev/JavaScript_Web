import React, { Component } from 'react';

import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import About from './About';

class Home extends Component {
    render() {
        return (
            <section id="viewSignIn">
                <div className="welcome">
                    <div className="signup">
                        <LoginForm {...this.props}/>
                        <RegisterForm />
                    </div>
                    <About />
                </div>
            </section>

        );
    }
}

export default Home;
