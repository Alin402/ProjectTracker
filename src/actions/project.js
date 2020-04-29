import {
    GET_PROJECTS,
    PROJECT_FAIL,
    GET_PROJECT,
    ADD_ASSIGNMENT,
    UPDATE_ASSIGNMENT,
    DELETE_ASSIGNMENT,
    DELETE_PROJECT,
    CLEAR_PROJECT
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getProjects = () => async dispatch => {
    try {
        const res = await axios.get('https://projecttracker2.herokuapp.com/projects');

        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROJECT_FAIL
        });
    }
}

export const addProject = (name, deadline, assignments) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, deadline, assignments });

    try {
        await axios.post('https://projecttracker2.herokuapp.com/projects', body, config);
        dispatch(setAlert('Project added', 'success'));
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }
    }
}

export const getProject = (id) => async dispatch => {
    dispatch({
        type: CLEAR_PROJECT
    });
    try {
        const res = await axios.get(`https://projecttracker2.herokuapp.com/projects/${id}`);

        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROJECT_FAIL
        });
    }
}

export const addAssignment = (id, name) => async dispatch => {
    try {
        const res = await axios.post(`https://projecttracker2.herokuapp.com/projects/${id}`, JSON.stringify({ name }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: ADD_ASSIGNMENT,
            payload: res.data
        });

        dispatch(setAlert('Assignment added', 'success'));
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROJECT_FAIL
        });
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }
    }
}

export const updateAssignment = (id, taskId , field) => async dispatch => {
    try {
        const res = await axios.put(`https://projecttracker2.herokuapp.com/projects/${id}/${taskId}`, JSON.stringify({ field }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: UPDATE_ASSIGNMENT,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROJECT_FAIL
        });
    }
}

export const deleteAssignment = (id, taskId) => async dispatch => {
    try {
        const res = await axios.delete(`https://projecttracker2.herokuapp.com/projects/${id}/${taskId}`);

        dispatch({
            type: DELETE_ASSIGNMENT,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROJECT_FAIL
        });
    }
}

export const deleteProject = (id) => async dispatch => {
    try {
        const res = await axios.delete(`https://projecttracker2.herokuapp.com/projects/${id}`);

        dispatch({
            type: DELETE_PROJECT,
            payload: res.data
        });
        dispatch(setAlert('Project deleted', 'success'));
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROJECT_FAIL
        });
    }
}

export const updateDeadline = (id, deadline) => async dispatch => {
    try {
        await axios.post(`http://localhost:3002/projects/deadline/${id}`, JSON.stringify({ deadline }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(setAlert('Project updated', 'success'));
    } catch (err) {
        console.log(err);
        dispatch(setAlert(err.response.data.msg, 'danger'));
    }
}