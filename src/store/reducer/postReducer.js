
const initState = {
    posts: [
        { id: '1', title: 'help', content: 'akfbkfsudgbsdg sdkbsgdkbg sdkbg' },
        { id: '2', title: 'demo', content: ' jaydip patel' },
        { id: '3', title: 'share', content: 'facebook' }
    ]
};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_POST':
            console.log('create post', action.post);
            return state;
        case 'CREATE_POST_ERROR':
            console.log('create error', action.err);
            return state;
        default:
            return state;
    }

}
export default postReducer;