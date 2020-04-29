import { playlistAPI } from '../api/playlistAPI'
import { playlistManage } from './SavedCoursesActions'

function addSuccess(name) {
    console.log('hi')
    return {
        type: 'ADD_SUCCESS',
        name
    }
}

function emptyPlaylists(name) {
    return {
        type: 'EMPTY_PLAYLIST',
        name
    }
    
}

function addFail(error) {
    return {
        type: 'ADD_FAIL',
        error
    }
}

export function addPlaylist(name) {
    console.log(name)
    return async function (dispatch) {
        let status;
        playlistAPI(name).then(response => {
            status = response.status;
            return status;
        }).then(data => {
            if (status === 200) {
                dispatch(addSuccess(name))
                //dispatch(playlistManage())
                //history.push('/show_rides');
            } else if (status === 401) {
                dispatch(addFail(data.message))
            }
        }) 
    }
}

export function firstPlaylist(name) {
    console.log(name)
    return async function (dispatch) {
        let status;
        playlistAPI(name).then(response => {
            status = response.status;
            return status;
        }).then(data => {
            if (status === 200) {
                dispatch(emptyPlaylists(name))
                //dispatch(playlistManage())
                //history.push('/show_rides');
            } else if (status === 401) {
                dispatch(addFail(data.message))
            }
        }) 
    }
}