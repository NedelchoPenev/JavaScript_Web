import React, { Component } from 'react';
import requester from '../../infarastucture/requester';
import observer from '../../infarastucture/observer';
import { Redirect } from 'react-router-dom';

class DeletePost extends Component {
    componentDidMount() {
        requester.remove('appdata', 'posts', 'kinvey', this.props.match.params.id)
            .then(
                observer.trigger(observer.events.notification, { 'type': 'success', 'message': 'Post deleted.' }),
            ).catch(res => {
                observer.trigger(observer.events.notification, { 'type': 'error', 'message': res.responseJSON.description })
            })
    }

    render() {
        return <Redirect to='/catalog' />
    }
}

export default DeletePost;
