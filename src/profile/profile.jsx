import React, { Component } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Avatar } from '@material-ui/core';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteUser } from '../store/action/auth';
import firebase from 'firebase';

class Profile extends Component {
    delete = () => {
        const uid = firebase.auth().currentUser.uid;
        const data = firebase.firestore();
        data.collection('users').doc(uid).delete();
        this.props.history.push('/login');
    }
    render() {
        const { profile, auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' /> 
        
        const update = () => {
            // data.collection('users').doc(profile).set({
            //     // firstName:this.state.firstName,
            // });

        }


        return (
            <Card className="" >
                <CardContent className="text-center">
                    <Avatar alt={profile.initials} src={profile.image} className="m-auto" />
                    <Typography className="text-uppercase" color="textSecondary" gutterBottom>
                       {profile.firstName} {profile.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Email : {auth.email}
                    </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-around">
                    <Button color="primary" size="small">Posts</Button>
                    <Button onClick={update} color="primary" size="small"><EditIcon />Edit</Button>
                    <Button onClick={this.delete} color="primary" size="small"><DeleteIcon />Delete</Button>
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
            dispatch(deleteUser(user))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));