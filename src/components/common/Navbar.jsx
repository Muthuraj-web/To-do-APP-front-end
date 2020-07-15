import React, { Component } from 'react';
import {decode} from 'jsonwebtoken'
import '../../index.css'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg sticky-top  navbar-light bg-light">
                <p className="navbar-brand inline display-6" >
                    <img src={process.env.PUBLIC_URL+"/icon.png"}
                    alt="icon" 
                    className="mr-2" style={{width:"30px",height:"auto"}}>
                    </img>Taskboom</p>
                    <button className="navbar-toggler" type="button" 
                    data-toggle="collapse" data-target="#navbarNav" 
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <p className="nav-link pl-3 cursor" 
                        style={{display:"inline-block"}}>
                        {decode(localStorage.jwt).username}</p>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link pl-3 cursor" 
                        style={{display:"inline-block"}} 
                        onClick={()=>{localStorage.removeItem('jwt');this.props.history.replace('/auth')}}>
                        Logout</p>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;