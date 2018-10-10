import { GET_ALL_POSTS_ASYNC, GET_POSTS_BY_CATEGORY_ASYNC, FAIL_GET_POSTS_ASYNC } from '../actions/Posts'

const initialState = {
    dataPost: []
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_ALL_POSTS_ASYNC:
            return {
                ...state,
                dataPost: {
                    data: payload.data
                }
            }
        case GET_POSTS_BY_CATEGORY_ASYNC:
            return {
                ...state,
                dataPost: {
                    data: payload.data
                }
            }
        case FAIL_GET_POSTS_ASYNC: {
            return {
                ...state,
                dataPost: {
                    data: [],
                    error: payload.error
                }
            }
        }          
        default:
            return state
    }
}