import savedCourses from './SavedReducer';
import playlist from './PlaylistReducer';
import { combineReducers } from 'redux';

const combined = combineReducers({
    savedCourses,
    playlist
});

function rootReducer(state, action) {
    return combined(state, action);
};

export default rootReducer;