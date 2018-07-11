import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/menu.css';

class Navigation extends Component {
    render() {
        return (
            <div id="menu">
                <div className="title">Navigation</div>
                <Link className="nav" to="/catalog" id="linkCatalog" data-target="Catalog">Catalog</Link>
                <Link className="nav" to="/createPost" data-target="PostCreate">Create Post</Link>
                <Link className="nav" to="/myPosts" id="linkMyPosts" data-target="MyPosts">My Posts</Link>
                <Link className="nav" to="/logout" id="Logout" data-target="Logout">Logout</Link>
            </div>
        )
    }
}

export default Navigation;
