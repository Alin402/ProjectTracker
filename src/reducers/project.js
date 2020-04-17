import {
    GET_PROJECTS,
    PROJECT_FAIL,
    GET_PROJECT,
    ADD_ASSIGNMENT,
    UPDATE_ASSIGNMENT,
    DELETE_ASSIGNMENT,
    DELETE_PROJECT
} from '../actions/types';

const initialState = {
    projects: [],
    project: {},
    loading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: payload,
                loading: false
            }
        case GET_PROJECT:
            return {
                ...state,
                project: payload,
                loading: false
            }
        case DELETE_ASSIGNMENT:
        case UPDATE_ASSIGNMENT:
        case ADD_ASSIGNMENT:
            return {
                ...state,
                project: {...state.project, assignments: payload}
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: payload
            }
        case PROJECT_FAIL:
            return {
                ...state,
                projects: [],
                loading: false
            }
        default: return state
    }
}