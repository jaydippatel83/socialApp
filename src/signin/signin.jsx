import React, { Component } from 'react'
import {firebase} from '../firebase/fire';

class Signin extends Component {

    signin() {
        const email=document.querySelector("#email").value;
        const password=document.querySelector("#password").value;

        // firebase.auth().signInWithEmailAndPassword(email,password)
        // .then((u)=>{
        //     console.log("Successfully");
            
        // })
        // .catch((err)=>{
        //     console.log("error",err.toString());
            
        // })
    }
    signup() {
        const email=document.querySelector("#email").value;
        const password=document.querySelector("#password").value;

        // firebase.auth().createUserWithEmailAndPassword(email,password)
        // .then((u)=>{
        //     console.log("Successfully logout");
            
        // })
        // .catch((err)=>{
        //     console.log("error",err.toString());
            
        // })

    }
    render() {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-6 mx-auto">
                        <div className="col">
                            <div className="">Email</div>
                            <input id="email" placeholder="email" type="text" />
                        </div>
                        <div className="col">
                            <div className="">Password</div>
                            <input id="password" placeholder="password" type="password" />
                        </div>
                        <div className="col d-flex justify-content-center">
                            <button className="btn btn-primary m-2" onClick={this.signin}>Sign In</button>
                            <button className="btn btn-success m-2" onClick={this.signup}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Signin;