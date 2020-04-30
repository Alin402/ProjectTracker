import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProjectItem from './ProjectItem';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/project';
import { Spinner } from '../spinner/Spinner';

const ProjectList = ({ getProjects, project: { projects, loading } }) => {
    useEffect(() => {
        getProjects();
    }, [loading, getProjects]);
    return loading ? <Spinner />  : (
        <div className='container'>
            <div className='row'>
                {
                    projects && projects.map(project => (
                        <ProjectItem key={project._id} project={project} />
                    ))
                }
                <div className='col-sm-12 col-md-4 col-lg-3 col-xl-3 p-4' style={{
                    display: 'flex',
                    alignItems: 'center'
                    }}>
                    <Link to='/add-project'>
                        <i data-toggle='tooltip' data-placement='top' title='Add a new project' className='fa fa-plus-square text-info' style=
                        {{
                            fontSize: '5em',
                            cursor: 'pointer'
                        }}>
                        </i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

ProjectList.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project: state.project
});

export default connect(mapStateToProps, { getProjects })(ProjectList);
