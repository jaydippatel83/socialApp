import React, { Component } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Avatar } from '@material-ui/core';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Redirect,withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteUser } from '../store/action/auth';

class Profile extends Component {
    render() {
        const { profile, auth} = this.props;
        console.log(profile,"image");
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <Card className="" >
                <CardContent className="text-center">
                    <Avatar alt={profile.initials} src={profile.image} className="m-auto" />
                    <Typography className="text-uppercase" color="textSecondary" gutterBottom>
                        {profile.firstName} {profile.lastName}
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                    </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-around">
                    <Button color="primary" size="small">Posts</Button>
                    <Button color="primary" size="small"><EditIcon />Edit</Button>
                    <Button onClick={this.props.deleteUser()} color="primary" size="small"><DeleteIcon />Delete</Button>
                </CardActions>
            </Card>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {  
    return {
        deleteUser: (user) => {
            dispatch(deleteUser(user ))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);