import React, { Component } from 'react';

import '../../styles/notifications.css';
import observer from '../../infarastucture/observer';

const DEFAULT_STATE = {
    success: null,
    error: null,
    loading: null, 
    message: null
}

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = DEFAULT_STATE
        observer.subscribe(observer.events.notification, this.showNotification)
    }

    showNotification = data => {
        let message = data.message
        let type = data.type
        this.setState({ [type]: type, 'message': message })
    }

    hideNotification = ev => this.setState(DEFAULT_STATE)

    render() {
        let notificationId;
        if (this.state.success) {
            notificationId = 'infoBox'
        } else if (this.state.error) {
            notificationId = 'errorBox'
        } else if (this.state.loading) {
            notificationId = 'loadingBox'
        } 

        setTimeout(this.hideNotification, 10000)
        return (
            <div id={notificationId} className="notification" onClick={this.hideNotification}>{this.state.message}</div>
        )
    }
}

export default Notifications;
