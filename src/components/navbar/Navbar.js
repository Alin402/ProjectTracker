import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar bg-dark navbar-expand-md fixed-top'>
            <div className='container' style={{width: '40%'}}>    
                <Link to='/' className='btn btn-light w-100'>Projects</Link>
            </div>
        </nav>
    )
}

export default Navbar;
