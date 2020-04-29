import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/project';

const PopupModal = ({ deleteProject, project: { project }, history }) => {
    return (
        <div className="modal fade" id='popup' tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Delete this project?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Are you sure you want to delete this project?</p>
            </div>
            <div className="modal-footer">
                <button type="button" data-dismiss='modal' className="btn btn-primary" onClick={() => {
                    deleteProject(project._id)
                    history.push('/')
                }}>
                Yes
                </button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    )
}

PopupModal.propTypes = {
    project: PropTypes.object.isRequired,
    deleteProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project: state.project
});

export default connect(mapStateToProps, { deleteProject })(withRouter(PopupModal));
