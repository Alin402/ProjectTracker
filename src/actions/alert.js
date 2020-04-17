import {
    SET_ALERT,
    REMOVE_ALERT
} from './types';

const uuid = require('uuid');

export const setAlert = (msg, type) => dispatch => {
    const id = uuid.v4();

    dispatch({
        type: SET_ALERT,
        payload: {
            id, msg, type
        }
    });

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        });
    }, 3000);
}