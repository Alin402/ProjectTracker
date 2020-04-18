import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Projects.css';
import Moment from 'react-moment';
import axios from 'axios';
const moment = require('moment');

const ProjectItem = ({ project }) => {
    useEffect(() => {
        const verifyProject = async () => {
            try {
                await axios.put(`https://projecttracker2.herokuapp.com/projects/${project._id}`);
            } catch (err) {
                console.log(err);
            }
        }
        verifyProject();
    }, []);
    const [taskState, setTaskState] = useState({
        todo: project.assignments.filter(task => task.type === 'todo'),
        doing: project.assignments.filter(task => task.type === 'doing'),
        done: project.assignments.filter(task => task.type === 'done'),
        undefiend: project.assignments.filter(task => task.type === 'undefined'),
    });
    const { todo, doing, done, undefiend } = taskState;
    return (
            <div className='col-sm-12 col-md-4 col-lg-3 col-xl-3 p-2'>
                <Link to={`/project/${project._id}`} style={{textDecoration: 'none'}}>
                    <div id='item' className={`card bg-${project.deadline && moment(project.deadline).isBefore(new Date()) ? 'danger' : 'info'}`} style={{height: '15rem'}}>
                        <div className='card-body'>
                            <h3 className='card-title text-light'>
                                {project.name}
                                <span className='text-warning'>
                                    {project.done && ' - Done'}
                                </span>
                            </h3>
                            <hr />
                            {
                                project.deadline ?
                                <h4 className='text-light'>DEADLINE: <span className='text-warning'><Moment format='MMMM DD YYYY'>
                                {project.deadline}</Moment>
                                </span>
                                </h4>:
                                <h4 className='text-light'>No deadline</h4>
                            }
                            <p className='text-light'><span className='text-warning'>{done.length}</span> assignments done, 
                            <span className='text-warning'> {doing.length}</span> doing, <span className='text-warning'>{todo.length}</span> to do
                            and <span className='text-warning'>{ undefiend.length}</span> undefined</p>
                        </div>
                    </div>
                </Link>
            </div>
    )
}

ProjectItem.propTypes = {
    project: PropTypes.object.isRequired
}

export default ProjectItem;
