export const createPost = (post) => {
    return (dispatch, geyState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...post,
            createdAt: new Date(),
        }).then(()=>{
            dispatch({ type: 'CREATE_POST', post });
        }).catch((err)=>{
            dispatch({type:'CREATE_POST_ERROR',err});
        }) 
    }
};