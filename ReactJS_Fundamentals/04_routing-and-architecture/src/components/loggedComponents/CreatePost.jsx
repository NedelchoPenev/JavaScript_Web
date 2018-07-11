import React, { Component } from 'react';
import '../../styles/submit.css';
import requester from '../../infarastucture/requester';
import observer from '../../infarastucture/observer';
import Navigation from '../common/Navigation';

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: sessionStorage.getItem('username'),
            url: '',
            title: '',
            imageUrl: '',
            description: ''
        }
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
            requester.post('appdata', 'posts', 'kinvey', this.state)
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
                    <h1>Create Post</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                    <form id="createPostForm" className="submitForm" onSubmit={this.handleSubmit}>
                        <label>Link URL:</label>
                        <input name="url" type="text" onChange={this.handleChange} />
                        <label>Link Title:</label>
                        <input name="title" type="text" onChange={this.handleChange} />
                        <label>Link Thumbnail Image (optional):</label>
                        <input name="imageUrl" type="text" onChange={this.handleChange} />
                        <label>Description (optional):</label>
                        <textarea name="description" defaultValue="" onChange={this.handleChange} />
                        <input type="submit" defaultValue="Create Post" />
                    </form>
                </div>
            </section>
            </div>
        );
    }
}

export default CreatePost;
