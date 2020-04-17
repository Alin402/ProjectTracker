import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addProject } from '../../actions/project';
import { connect } from 'react-redux';
const uuid = require('uuid');

const AddProject = ({ addProject }) => {
    const [tasks, setTasks] = useState([{
        id: uuid.v4(),
        name: ''
    }]);

    const [formState, setFormState] = useState({
        title: '',
        deadline: ''
    });

    const { title, deadline } = formState;

    const onChange = e => setFormState({...formState, [e.target.name]: e.target.value});

    const submit = e => {
        e.preventDefault();
        addProject(title, deadline, tasks);
        setFormState({
            title: '',
            deadline: ''
        });
        setTasks([{
            id: uuid.v4(),
            name: ''
        }]);
    }
    return (
        <div className='container'>
            <Link to='' className='btn btn-info'>Go Back To Projects</Link>
            <h2 className='mt-2'>Add a project</h2>
            <form onSubmit={e => submit(e)}>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input value={title} onChange={e => onChange(e)} type='text' id='title' name='title' className='form-control' />
                </div>
                <div className='form-group'>
                    <label htmlFor='deadline'>Deadline</label>
                    <input value={deadline} onChange={e => onChange(e)} type='date' id='deadline' name='deadline' className='form-control' />
                </div>
                <hr />
                <div>
                <h2 className='text-info'>Assignments</h2>
                {
                    tasks.map((task, index) => (
                        <div key={index} className='form-group'>
                            <label htmlFor='task'>Assignment</label>
                            <input value={task.name} onChange={e => {
                                setTasks(tasks.map(tas => tas.id === task.id ? {...tas, name: e.target.value} : tas))
                            } 
                            }
                                type='text' 
                                id='task' 
                                name='task' 
                                className='form-control' 
                            />
                        </div>
                    ))
                }
                </div>
                <button type='button' className='btn btn-primary' onClick={e => {
                    setTasks([...tasks, { id: uuid.v4(), name: '' }]);
                }}>
                    New
                </button> <br />
                <input type='submit' className='btn btn-info mt-3' value='Submit project' />
            </form>
        </div>
    )
}

AddProject.propTypes = {
    addProject: PropTypes.func.isRequired
}

export default connect(null, { addProject })(AddProject);
