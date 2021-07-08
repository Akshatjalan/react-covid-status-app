import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/cov.png';

const Navbars = () => {
    return (
        <div>
        <Navbar className="justify-content-center" bg="dark" variant="dark">
            <Navbar.Brand >
            <img alt="Covid Status App" src={logo} width="30" height="30" className="d-inline-block align-top" />
               <b> Covid Status App </b>
            </Navbar.Brand>
        </Navbar>    
        </div>
    )
}

export default Navbars;
