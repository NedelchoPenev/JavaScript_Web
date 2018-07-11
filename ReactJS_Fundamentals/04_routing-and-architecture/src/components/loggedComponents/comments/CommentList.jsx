import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    render() {
        
        return (
            <div id="allComments" className="comments">
                {this.props.comments ?
                    this.props.comments
                        .filter(c => c.postId === this.props.postId)
                        .map((c) => <Comment key={c._id} {...c} onDeleteSubmit={this.props.onDeleteSubmit}/>) :
                    <h1>No comments yet.</h1>
                }
            </div>
        )
    }
}

export default CommentList;