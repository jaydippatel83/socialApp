import React, { Component } from 'react';
import Profile from '../profile/profile';
import Post from '../posts/posts';
import PostList from '../posts/postList';

class Home extends Component {

    render() {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-4 col-xs-12 home-left">
                        <Profile />
                        <Post />
                    </div>
                    <div className="col-8 col-xs-12 home-right">
                        <PostList />
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;