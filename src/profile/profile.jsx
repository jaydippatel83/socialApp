import React, { Component } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Avatar, Modal, Grid, TextField } from '@material-ui/core';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteUser, updateProfile, updateEmail } from '../store/action/auth';
import firebase from 'firebase';

class Profile extends Component {

    state = {
        open: false,
        firstName: '',
        lastName: '',
        email: '',
        image: null
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeFile = (e) => {
        this.setState({ image: URL.createObjectURL(e.target.files[0]) })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateProfile(this.state);
        this.props.updateEmail(this.state.email);
        this.setState({ open: false });
    }

    delete = () => {
        const uid = firebase.auth().currentUser.uid;
        const data = firebase.firestore();
        data.collection('users').doc(uid).delete();
        this.props.history.push('/login');
    }
    render() {
        const { profile, auth, posts } = this.props;
        console.log(posts ? posts.length : null, "post");


        if (!auth.uid) return <Redirect to='/login' />

        const update = () => {
            // data.collection('users').doc(profile).set({
            //     // firstName:this.state.firstName,
            // });  

        }
        const handleOpen = () => {
            this.setState({ open: true });
        };

        const handleClose = () => {
            this.setState({ open: false });
        };



        return (
            <Card className="" >
                <CardContent className="text-center">
                    <Avatar alt={profile.initials} src={profile.image} className="m-auto" />
                    <Typography className="text-uppercase" color="textSecondary" gutterBottom>
                        {profile.firstName} {profile.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Email : {profile.email ? profile.email : auth.email}
                    </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-around">
                    <Button color="primary" size="small">Posts
                       <p>{posts ? posts.length : null} </p>
                    </Button>
                    <Button onClick={handleOpen} color="primary" size="small"><EditIcon />Edit</Button>
                    <Button onClick={this.delete} color="primary" size="small"><DeleteIcon />Delete</Button>
                </CardActions>
                <Modal
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={{ marginTop: '100px', borderRadius: '6px' }} className="bg-white col-4 ml-auto mr-auto p-4">
                        <h2>Profile update</h2>
                        <form onSubmit={this.handleSubmit} className="form mt-2" noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        onChange={this.handleChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        onChange={this.handleChange}
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onChange={this.handleChange}
                                        autoComplete="email"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <input
                                        variant="contained"
                                        color="primary"
                                        required
                                        fullWidth
                                        label="Image Upload"
                                        type="file"
                                        id="image"
                                        onChange={this.handleChangeFile}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit mt-3"
                            >
                                Save
                       </Button>
                        </form>

                    </div>
                </Modal>
            </Card>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteUsemapStateToPropsr: (user) => {
            dispatch(deleteUser(user))
        },
        updateProfile: (update) => {
            dispatch(updateProfile(update))
        },
        updateEmail: (newEmail) => {
            dispatch(updateEmail(newEmail))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));