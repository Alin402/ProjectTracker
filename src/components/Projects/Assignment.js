import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateAssignment, deleteAssignment } from '../../actions/project';
import { Spinenr, Spinner } from '../spinner/Spinner';

const Assignment = ({ id,  assignment, updateAssignment, deleteAssignment }) => {
    return !assignment ? <Spinner small /> : (
        <div className='bg-light mt-1 p-3 rounded' style={{width: '100%'}}>
            <div>
                <p>
                    {assignment.name}
                </p>
            </div>
                <div className='dropdown mt-2'>
                    <button className='btn btn-primary dropdown-toggle' data-toggle='dropdown'>
                        Move
                    </button>
                <div className='dropdown-menu'>
                    <button onClick={() => updateAssignment(id, assignment._id, 'todo')} className='btn btn-outline'>To Do</button>
                    <button onClick={() => updateAssignment(id, assignment._id, 'doing')} className='btn btn-outline'>Doing</button>
                    <button onClick={() => updateAssignment(id, assignment._id, 'done')} className='btn btn-outline'>Done</button>
               </div> {' '}
               <button onClick={() => deleteAssignment(id, assignment._id)} className='btn btn-danger'>
                   <i className='fa fa-times'></i>
               </button>
            </div>
        </div>
    )
}

Assignment.propTypes = {
    assignment: PropTypes.object.isRequired,
    updateAssignment: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}

export default connect(null, { updateAssignment, deleteAssignment })(Assignment);
