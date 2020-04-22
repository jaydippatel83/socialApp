import firebase from 'firebase';
import firestore from 'redux-firestore';

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((res) => {
      return firestore.collection('users').doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        image: newUser.image,
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err })
    })
  }
} 


export const updateProfile = (update) => {
  return (dispatch, getState, { getFirestore }) => {
    const uid = firebase.auth().currentUser.uid;
    const udata = firebase.firestore();
    udata.collection('users').doc(uid).set({
      // ...users,update
    })
  }
}

export const deleteUser = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    user = firebase.auth().currentUser.uid;
    firestore.collection('users').doc(user).delete()
      .then(() => {
        dispatch({ type: 'DELETE_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'DELETE_ERROR', err });
      })
  }
}