import React, { Component } from 'react'
import { Redirect } from 'react-router';

import Input from '../formFields/Input'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            fireRedirect: false
        }

        this.submitLogin = this.submitLogin.bind(this)
    }

    submitLogin(e) {
        e.preventDefault();
        let payload = {
            email: this.state.email,
            password: this.state.password,
        }
        this.login(payload)
    }

    login(payload) {
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                return res.json()
            })
            .then(d => {
                if (d.success) {
                    localStorage.setItem('token', d.token)
                    localStorage.setItem('username', d.user.name)
                    this.setState({ fireRedirect: true })
                }
            })
    }

    loginValidationFunc(email, password) {
        let validMail = (() => {
            if (email !== '') {
                return true
            }
            return false
        })()

        let validPassword = (() => {
            if (password !== '') {
                return true
            }
            return false
        })()

        return {
            validMail,
            validPassword
        }
    }

    render() {
        let validObj = this.loginValidationFunc(
            this.state.email,
            this.state.password
        )

        const { fireRedirect } = this.state

        return (
            <div>
                <form onSubmit={this.submitLogin}>
                    <fieldset className='App'>
                        <div style={{ display: 'inline-grid' }}>
                            <h2>Login</h2>
                            <Input
                                type='text'
                                data='loginEmail'
                                name='Email'
                                func={e => {
                                    this.setState({ email: e.target.value })
                                }}
                                valid={validObj.validMail}
                            />

                            <Input
                                type='password'
                                data='loginPassword'
                                name='Password'
                                func={e => {
                                    this.setState({ password: e.target.value })
                                }}
                                valid={validObj.validPassword}
                            />

                            <input
                                type='submit'
                                value='Login'
                            />
                        </div>
                    </fieldset>
                </form>
                {fireRedirect && (
                    <Redirect to='/pokemons' />
                )}
            </div>
        );
    }
}

export default Login;
