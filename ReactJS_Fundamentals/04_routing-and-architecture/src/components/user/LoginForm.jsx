import React, { Component } from 'react';
import requester from '../../infarastucture/requester';
import observer from '../../infarastucture/observer';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = ev => {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    handleSubmit = ev => {
        ev.preventDefault()

        if (this.state.username && this.state.password) {
            requester.post('user', 'login', 'basic', this.state)
            .then(res => {
                observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { 'type': 'success', 'message': 'Login Successful.' })
                sessionStorage.setItem('authtoken', res._kmd.authtoken)
                sessionStorage.setItem('username', res.username)
                this.props.history.push('/catalog')
            }).catch(res => {
                observer.trigger(observer.events.notification, { 'type': 'error', 'message': res.responseJSON.description })
                this.setState({ username: '', password: '' })
            })
        } else {
            observer.trigger(observer.events.notification, { 'type': 'error', 'message': 'Please fill username and password fields' })
        }
    }

    render() {
        return (
            <form id="loginForm" onSubmit={this.handleSubmit}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" onChange={this.handleChange} type="text" value={this.state.username}/>
                <label>Password:</label>
                <input name="password" onChange={this.handleChange} type="password" value={this.state.password}/>
                <input id="btnLogin" defaultValue="Sign In" type="submit" />
            </form>
        );
    }
}

export default LoginForm;
