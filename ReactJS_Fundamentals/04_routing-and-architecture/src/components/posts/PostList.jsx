import React, { Component } from 'react';
import requester from '../../infarastucture/requester';
import Post from './Post';

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
            <section id="viewCatalog">
                <div id="allForumPosts" className="posts">
                    {this.state.posts ?
                         this.state.posts.map((p, i) => <Post key={p._id} index={i} {...p} />) :
                        <h1>No posts in database</h1>
                    }
                </div>
            </section>
        );
    }
}

export default PostList;
