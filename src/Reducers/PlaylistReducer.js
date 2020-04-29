function playlistReducer(state = {}, action) {
    switch (action.type) {
        case 'EMPTY_PLAYLIST':
            return Object.assign({}, state, {
                playlists: action.name,
                error: ''
            });
        case 'ADD_SUCCESS':
            return Object.assign({}, state, {
                playlists: [...state.playlists, action.name],
                error: ''
            });
        case 'ADD_FAIL':
            return Object.assign({}, state, {
                error: 'unable to save'
            });
        default:
            return state;
    }
}
export default playlistReducer;