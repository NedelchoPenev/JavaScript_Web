import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import requester from '../../infarastucture/requester';
import observer from '../../infarastucture/observer';

class Logout extends Component {
    logout = () => {
        requester.post('user', '_logout', 'kinvey')
            .then(res => {
                sessionStorage.removeItem('authtoken')
                sessionStorage.removeItem('username')
                observer.trigger(observer.events.notification, { 'type': 'success', 'message': 'Logout successful.' })
            }).catch(res => {
                observer.trigger(observer.events.notification, { 'type': 'error', 'message': res.responseJSON.description })
            })
    }
    render() {
        this.logout()
        return  <Redirect to='/' /> 
    }
}

export default Logout;
