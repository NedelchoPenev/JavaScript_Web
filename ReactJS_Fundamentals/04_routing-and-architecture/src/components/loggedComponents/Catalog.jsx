import React, { Component } from 'react';
import Navigation from '../common/Navigation';
import PostList from './../posts/PostList';

class Catalog extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <PostList />
            </div>
        );
    }
}

export default Catalog;
