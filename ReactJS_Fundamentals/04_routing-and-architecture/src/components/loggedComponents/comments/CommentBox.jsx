import React, { Component } from 'react';
import CommentPost from './CommentPost';
import CommentList from './CommentList';
import requester from '../../../infarastucture/requester';

class CommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        }
    }

    getComments = () => {
        requester.get('appdata', 'comments', 'kinvey')
            .then(res => {
                this.setState({ comments: res })
            }).catch(console.log())

    }

    componentDidMount() {
        this.getComments()
    }

    render() {
        return (
            <div>
                <CommentPost postId={this.props.postId} onCommentSubmit={this.getComments} />
                <CommentList postId={this.props.postId} comments={this.state.comments} onDeleteSubmit={this.getComments} />
            </div>
        );
    }
}

export default CommentBox;
