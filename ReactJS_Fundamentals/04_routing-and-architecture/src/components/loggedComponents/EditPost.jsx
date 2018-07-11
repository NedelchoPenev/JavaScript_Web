import React, { Component } from 'react';
import '../../styles/submit.css';
import requester from '../../infarastucture/requester';
import observer from '../../infarastucture/observer';
import Navigation from '../common/Navigation';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: '',
            url: '',
            title: '',
            imageUrl: '',
            description: ''
        }
    }

    componentDidMount(){
        requester.getById('appdata', 'posts', 'kinvey', this.props.match.params.id)
            .then(res => 
                this.setState(res)
            )
            .catch()
    }

    handleChange = (ev) => {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    handleSubmit = ev => {
        ev.preventDefault()

        if (this.state.url === '' || this.state.title === '') {
            return observer.trigger(observer.events.notification,
                { 'type': 'error', 'message': 'Title and url cannot be empty!' })
        } else if (!this.state.imageUrl.startsWith('http')) {
            return observer.trigger(observer.events.notification,
                { 'type': 'error', 'message': 'Url should start with http!' })
        } else {
            requester.update('appdata', 'posts', 'kinvey', this.state, this.props.match.params.id)
                .then(res => {
                    observer.trigger(observer.events.notification,
                        { 'type': 'success', 'message': 'Post created.' })
                    this.props.history.push('/catalog')
                }).catch(res => {
                    observer.trigger(observer.events.notification,
                        { 'type': 'error', 'message': res.responseJSON.description })
                })
        }
    }

    render() {
        return (
            <div>
            <Navigation />
            <section id="viewPostCreate">
                <div className="submitArea">
                    <h1>Edit Post</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                    <form id="createPostForm" className="submitForm" onSubmit={this.handleSubmit}>
                        <label>Link URL:</label>
                        <input name="url" type="text" onChange={this.handleChange} value={this.state.url}/>
                        <label>Link Title:</label>
                        <input name="title" type="text" onChange={this.handleChange} value={this.state.title}/>
                        <label>Link Thumbnail Image (optional):</label>
                        <input name="imageUrl" type="text" onChange={this.handleChange} value={this.state.imageUrl}/>
                        <label>Description (optional):</label>
                        <textarea name="description" onChange={this.handleChange} value={this.state.description}/>
                        <input type="submit" defaultValue="Edit Post" />
                    </form>
                </div>
            </section>
            </div>
        );
    }
}

export default EditPost;
