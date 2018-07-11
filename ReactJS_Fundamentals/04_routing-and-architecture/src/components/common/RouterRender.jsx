import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Logout from '../user/Logout';
import Catalog from '../loggedComponents/Catalog';
import CreatePost from '../loggedComponents/CreatePost';
import Home from '../home/Home';
import DeletePost from './../loggedComponents/DeletePost';
import EditPost from '../loggedComponents/EditPost';
import MyPosts from '../posts/MyPosts';
import Details from './../loggedComponents/Details';

class RouterRender extends Component {
    render() {
        return (
            <div>
                <Route path='/' exact component={Home} />
                <Route path='/catalog' exact component={Catalog} />
                <Route path='/createPost' exact component={CreatePost} />
                <Route path='/deletePost/:id' exact component={DeletePost} />
                <Route path='/editPost/:id' exact component={EditPost} />
                <Route path='/myPosts' exact component={MyPosts} />
                <Route path='/details/:id' exact component={Details} />
                <Route path='/logout' exact component={Logout} />
            </div>
        );
    }
}

export default RouterRender;
