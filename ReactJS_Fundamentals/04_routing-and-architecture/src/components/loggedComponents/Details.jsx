import React, { Component } from 'react';
import Navigation from './../common/Navigation';
import requester from '../../infarastucture/requester';
import observer from '../../infarastucture/observer';
import '../../styles/comment.css';
import CommentBox from './comments/CommentBox';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            author: '',
            url: '',
            title: '',
            imageUrl: '',
            description: ''
        }
    }

    componentDidMount() {
        requester.getById('appdata', 'posts', 'kinvey', this.props.match.params.id)
            .then(res =>
                this.setState(res),
            )
            .catch(res => {
                observer.trigger(observer.events.notification,
                    { 'type': 'error', 'message': res.responseJSON.description })
            })
    }

    render() {        
        return (
            <div>
                <Navigation />
                <section id="viewPostDetails">
                    <article id="postDetails" className="post">
                        <div className="col thumbnail">
                            <a href={this.state.url} target="_blank" rel="noopener noreferrer">
                                <img src={this.state.imageUrl} alt={this.props.title} />
                            </a>
                        </div>
                        <div className="post-content">
                            <div className="title">
                                <strong>{this.state.title}</strong>
                            </div>
                            <div className="details">
                                {this.state.description}
                            </div>
                        </div>
                    </article>
                    <CommentBox postId={this.state._id}/>
                </section>
            </div>
        );
    }
}

export default Details;
