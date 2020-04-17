import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Alert.css';

const Alert = ({ alerts }) => 
    <div style={{position: 'fixed', bottom: '0', width: '100%', zIndex: '1'}}>
        {
        alerts.map(alert => (
        <div className={`alert alert-${alert.type} bounce-in-top`} key={alert.id}>
            {alert.msg}
        </div>
        ))
        }
    </div>

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
