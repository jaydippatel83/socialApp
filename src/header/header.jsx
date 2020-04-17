import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { connect } from 'react-redux';
import { signOut } from '../store/action/auth';
import { Avatar, Fab } from '@material-ui/core';

class Header extends Component {
    render() {
        const { auth, profile } = this.props;
        const link = auth.uid ?
            <Link onClick={this.props.signOut} className="text-white text-uppercase font-weight-bold text-decoration-none" to="/">Sign Out</Link> :
            <Link className="text-white text-uppercase font-weight-bold text-decoration-none mr-3" to="/login">Sign in</Link>;
        return (
            <AppBar position="static">
                <Toolbar className="d-flex justify-content-between">
                    <Link to="/" className="text-decoration-none text-white">
                        <IconButton edge="start" className="" color="inherit" aria-label="menu">
                            <MenuIcon className="mr-2" />
                             SocialApp
                        </IconButton>
                    </Link>
                    <div className="">
                        <Link className="text-white text-uppercase font-weight-bold text-decoration-none mr-3" to="/profile">Profile</Link>
                        <Link className="text-white text-uppercase font-weight-bold text-decoration-none mr-3" to="/postlist">Posts</Link>
                        {link}
                        {
                            auth.uid ? <Fab size="small" color="secondary" className="ml-3 font-weight-bold">
                                {profile.initials}
                            </Fab> : null
                        }
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
const mapStateToProps = (state) => { 
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);