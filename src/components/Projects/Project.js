import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProject, addAssignment, deleteProject } from '../../actions/project';
import Assignment from './Assignment';

const Project = ({ project: { project, loading }, getProject, addAssignment, deleteProject, match, history }) => {
    useEffect(() => {
        getProject(match.params.id);
    }, [getProject, match.params.id]);

    const [content, setContent] = useState('');

    return loading ? <h1>Loading...</h1> : (
        <div className='container-fluid'>
            <Link to='/' className='btn btn-info'>Go Back To Projects</Link>
            <h2 className='text-center'>{project.name}</h2>
            <h2 className='text-center'><span className='text-warning'>{project.assignments && project.assignments.length}</span> assignments</h2>
            <button className='btn btn-danger' onClick={() => {
                deleteProject(project._id)
                history.push('/');
                }}>
                <i className='fa fa-times'></i> {' '}
                Delete Project
            </button>
            <div className='row mt-2 p-2'>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 p-3'>
                    <div className='bg-info rounded p-2'>
                        <h3 className='text-light'>To Do: <span className='text-warning'></span></h3>
                        {
                            project.assignments && project.assignments.filter(task => task.type === 'todo').map(task => <Assignment id={match.params.id} key={task._id} assignment={task} />)
                        }
                    </div>
                </div>

                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 p-3'>
                    <div className='bg-info rounded p-2'>
                    <h3 className='text-light'>Doing: <span className='text-warning'></span></h3>
                        {
                            project.assignments && project.assignments.filter(task => task.type === 'doing').map(task => <Assignment id={match.params.id} key={task._id} assignment={task} />)
                        }
                    </div>
                </div>

                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 p-3'>
                    <div className='bg-info rounded p-2'>
                    <h3 className='text-light'>Done: <span className='text-warning'></span></h3>
                        {
                            project.assignments && project.assignments.filter(task => task.type === 'done').map(task => <Assignment id={match.params.id} key={task._id} assignment={task} />)
                        }
                    </div>
                </div>

                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 p-3'>
                    <div className='bg-info p-3 rounded'>
                        <form onSubmit={e => {
                            e.preventDefault();
                            addAssignment(match.params.id, content);
                            setContent('');
                        }}>
                            <div className='form-group'>
                                <label htmlFor='content' className='text-light'>New assignment</label>
                                <input value={content} onChange={e => setContent(e.target.value)} type='text' id='content' name='content' className='form-control' />
                            </div>
                            <input type='submit' className='btn btn-success' />
                        </form>
                        {
                            project.assignments && project.assignments.filter(task => task.type === 'undefined').map(task => <Assignment id={match.params.id} key={task._id} assignment={task} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    addAssignment: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project: state.project
});

export default connect(mapStateToProps, { getProject, addAssignment, deleteProject })(withRouter(Project));
