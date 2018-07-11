import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requester from '../../../infarastucture/requester';
import observer from '../../../infarastucture/observer';

class Comment extends Component {

    deleteComment = () => {
        requester.remove('appdata', 'comments', 'kinvey', this.props._id)
            .then(
                this.props.onDeleteSubmit(),
                observer.trigger(observer.events.notification, { 'type': 'success', 'message': 'Comment deleted.' }),
        ).catch(res => {
            observer.trigger(observer.events.notification, { 'type': 'error', 'message': res.responseJSON.description })
        })
    }

    render() {
        return (
            <article className="comment">
                <div className="comment-content">
                    {this.props.content}
                </div>
                <a href to='javascript.void(0)' className="action" onClick={this.deleteComment}>[Delete]</a>
            </article>
        );
    }
}

export default Comment;
