import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="main-navbar" style={{background:"black"}}>
                    <h1>
                        <Link to="#" style={{color:"white"}}>E-blog</Link>
                    </h1>
                    <ul>
                        <li><Link to="/register" style={{color:"white"}}>Register</Link></li>
                        <li><Link to="/login" style={{color:"white"}}>Login</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
};
const mapStateToProps = state =>({
    auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
