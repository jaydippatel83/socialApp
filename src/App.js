import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './home/home';
import { firebase } from './firebase/fire';
import Header from './header/header';
import SignUp from './signin/signup';
import LogIn from './signin/login';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Post from './posts/posts';
import PostList from './posts/postList';
import Profile from './profile/profile';
import PostDisplay from './posts/postDisplay';
import PostDetails from './posts/postdetails';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App mb-4">
          <Header />
        </div>
        {/* <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4 ">
              <Profile />
            </div>
            <div className="col-12 col-lg-4 ">
              <Post />
            </div>
          </div>
        </div> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/post">
            <Post />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/postlist">
            <PostList />
          </Route>
          <Route exact path="/postdetail/:id">
            <PostDetails />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </BrowserRouter >
    );
  }

}

export default App;
