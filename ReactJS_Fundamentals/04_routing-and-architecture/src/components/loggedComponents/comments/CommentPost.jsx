import React, { Component } from 'react';
import requester from '../../../infarastucture/requester';
import observer from '../../../infarastucture/observer';

class CommentPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: sessionStorage.username,
            content: '',
        }
    }

    handleChange = (ev) => {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        let data = this.state
        data.postId = this.props.postId
        requester.post('appdata', 'comments', 'kinvey', data)
            .then(res => {
                observer.trigger(observer.events.notification,
                    { 'type': 'success', 'message': 'Comment created.' })
            }).catch(res => {
                observer.trigger(observer.events.notification,
                    { 'type': 'error', 'message': res.responseJSON.description })
            })

        this.props.onCommentSubmit()
        this.setState({content: ''})
    }

    render() {
        return (
            <div className="submitArea">
                <h1>Post Comment</h1>
                <form id="createCommentForm" className="submitForm" onSubmit={this.handleSubmit}>
                    <label>Content:</label>
                    <input id="cmtContent" name="content" type="text" onChange={this.handleChange} value={this.state.content}/>
                    <input type="submit" defaultValue="Post Comment" />
                </form>
            </div>
        );
    }
}

export default CommentPost;
