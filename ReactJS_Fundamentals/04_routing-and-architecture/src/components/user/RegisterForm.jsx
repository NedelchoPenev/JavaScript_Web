import React, { Component } from 'react';
import requester from '../../infarastucture/requester';
import observer from '../../infarastucture/observer';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPass: ''
        }
    }

    handleChange = ev => {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    handleSubmit = ev => {
        ev.preventDefault()

        if (this.state.password === this.state.repeatPass && this.state.username && this.state.password) {
            requester.post('user', '', 'basic', this.state)
                .then(res => {
                    observer.trigger(observer.events.notification, { 'type': 'success', 'message': 'Register Successful. Now you can Login!' })
                }).catch(res => {
                    observer.trigger(observer.events.notification, { 'type': 'error', 'message': res.responseJSON.description })
                    this.setState({ username: '', password: '', repeatPass: '' })
                })
        } else {
            observer.trigger(observer.events.notification, { 'type': 'error', 'message': ' Your password and confirmation password do not match!' })
            this.setState({ username: '', password: '', repeatPass: '' })
        }
    }

    render() {
        return (
            <form id="registerForm" onSubmit={this.handleSubmit}>
                <h2>Sign Up</h2>
                <label>Username:</label>
                <input name="username" onChange={this.handleChange} type="text" value={this.state.username} />
                <label>Password:</label>
                <input name="password" onChange={this.handleChange} type="password" value={this.state.password} />
                <label>Repeat Password:</label>
                <input name="repeatPass" onChange={this.handleChange} type="password" value={this.state.repeatPass} />
                <input id="btnRegister" defaultValue="Sign Up" type="submit" />
            </form>
        );
    }
}

export default LoginForm;
