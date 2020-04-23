import React, { Component } from 'react';

let NavBar = ({totalCounters}) => {
    return ( 
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" />
            <a className="navbar-brand" href="#">
                Navbar <span className="badge badge-pill badge-secondary">{totalCounters}</span>
            </a>
        </>
    );
}
 
export default NavBar;