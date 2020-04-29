import { savedCoursesAPI } from '../api/savedCoursesAPI'

export function playlistManage() {
    return {
        type: 'PLAYLIST_SUCCESS'
    }
}

function findSuccess(courseList) {
    return {
        type: 'FIND_SUCCESS',
        courseList
    }
}

function emptyArray(savedCourses) {
    return {
        type: 'EMPTY_ARRAY',
        savedCourses
    }
    
}

function saveSuccess(savedCourses) {
    return {
        type: 'SAVE_SUCCESS',
        savedCourses
    }
}

function failedSave(error) {
    return {
        type: 'SAVE_FAIL',
        error
    }
}

export function attemptFind(history, courseList) {
    return async function (dispatch) {

        dispatch(findSuccess(courseList))
        history.push({
            pathname: '/courses',
            state: { tab: 'findCourses' }
        });

    }
}

export function attemptMyCourses(history, courseList) {
    return async function (dispatch) {

        dispatch(findSuccess(courseList))
        history.push({
            pathname: '/courses',
            state: { tab: 'myCourses' }
        });

    }
}

export function attemptFirst(savedCourses) {
    console.log(savedCourses)
    return async function (dispatch) {
        let status;
        savedCoursesAPI(savedCourses).then(response => {
            status = response.status;
            return status;
        }).then(data => {
            if (status === 200) {
                dispatch(emptyArray(savedCourses))
                //history.push('/show_rides');
            } else if (status === 401) {
                dispatch(failedSave(data.message))
            }
        })
    }
}

export function attemptSave(savedCourses) {
    console.log(savedCourses)
    return async function (dispatch) {
        let status;
        savedCoursesAPI(savedCourses).then(response => {
            status = response.status;
            return status;
        }).then(data => {
            if (status === 200) {
                dispatch(saveSuccess(savedCourses))
                //history.push('/show_rides');
            } else if (status === 401) {
                dispatch(failedSave(data.message))
            }
        })
    }
}
