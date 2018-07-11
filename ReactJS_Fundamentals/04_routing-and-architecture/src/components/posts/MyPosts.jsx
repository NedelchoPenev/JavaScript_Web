import React, { Component } from 'react';
import requester from '../../infarastucture/requester';
import Navigation from '../common/Navigation';
import Post from './Post';
import '../../styles/post.css';

class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    getPosts = () => (
        requester.get('appdata', 'posts', 'kinvey')
            .then(res => {
                this.setState({ posts: res })
            })
    )

    componentDidMount() {
        this.getPosts()
    }


    render() {
        return (
            <div>
                <Navigation />
                <section id="viewMyPosts">
                    <div id="myForumPosts" className="post">
                        <h1>My Posts</h1>
                        {this.state.posts ?
                            this.state.posts
                                .filter(p => p.author === sessionStorage.username)
                                .map((p, i) => <Post key={p._id} index={i} {...p} />) :
                            <h1>No posts in database</h1>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default PostList;
