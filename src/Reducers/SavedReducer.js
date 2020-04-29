function savedReducer(state = {}, action) {
    switch (action.type) {
        case 'PLAYLIST_SUCCESS':
            return Object.assign({}, state, {
                myCourses: state.myCourses,
                courseList: state.courseList,
                error: state.error
            });
        case 'FIND_SUCCESS':
            return Object.assign({}, state, {
                myCourses: state.myCourses,
                courseList: action.courseList,
                error: ''
            });
        case 'EMPTY_ARRAY':
            return Object.assign({}, state, {
                myCourses: action.savedCourses,
                error: ''
            });
        case 'SAVE_SUCCESS':
            return Object.assign({}, state, {
                myCourses: [...state.myCourses, action.savedCourses],
                error: ''
            });
        case 'SAVE_FAIL':
            return Object.assign({}, state, {
                error: 'unable to save'
            });
        default:
            return state;
    }
}
export default savedReducer;