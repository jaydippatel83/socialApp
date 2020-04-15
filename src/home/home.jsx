import React, { Component } from 'react'
// import {fire} from '../firebase/fire';

class Home extends Component {

    signout() {
        // fire.auth().signOut();
    }
    render() {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col">
                        <h1>You are logged in</h1>
                        <button className="btn btn-danger" onClick={this.signout}>Sign Out</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;