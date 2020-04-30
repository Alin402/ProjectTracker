import React, { Fragment } from 'react'
import spinner from '../../img/spinner.gif';

export const Spinner = ({ small }) => {
    return (
        <div style={{height: small && '4rem', width: small ? '4rem' : '10rem', margin: '0 auto'}}>
            <img src={spinner} alt='Loading...' style={{width: '100%'}} />
        </div>
    )
}
