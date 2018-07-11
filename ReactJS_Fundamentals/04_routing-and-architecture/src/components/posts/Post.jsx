import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/post.css';

function calcTime(dateIsoFormat) {
    let diff = new Date() - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}


class Post extends Component {
    render() {
        let actions;
        if (this.props.author === sessionStorage.username) {
            actions = 
            <ul>
                <li className="action"><Link to={`/details/${this.props._id}`}>Details</Link></li>
                <li className="action"><Link to={`/editPost/${this.props._id}`} className="editPost">Edit</Link></li>
                <li className="action"><Link to={`/deletePost/${this.props._id}`} className="deletePost">Delete</Link></li>
            </ul>
        } else {
            actions = 
            <ul>
                <li className="action"><Link to={`/details/${this.props._id}`}>Details</Link></li>
            </ul>
        }
        return (
            <article className="post">
                <div className="col rank">
                    <span>{this.props.index + 1}</span>
                </div>
                <div className="col thumbnail">
                    <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                        <img src={this.props.imageUrl} alt={this.props.title} />
                    </a>
                </div>
                <div className="post-content">
                    <div className="title">
                        <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                            {this.props.title}
                        </a>
                    </div>
                    <div className="details">
                        <div className="info">
                            submitted {calcTime(this.props._kmd.ect)} day ago by {this.props.author}
                        </div>
                        <div className="controls">
                            {actions}
                        </div>
                    </div>
                </div>
            </article>

        );
    }
}

export default Post;
