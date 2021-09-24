import React, { Component } from 'react';
import Navbar from '../general/Navbar';
import Input from "../general/Input";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../actions/authActions";
import {message} from "antd";

class Login extends Component {
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
        }
    }

    componentWillReceiveProps(nextProps){
        const search = this.props.location.search;
        let split = search.split("redirect=");
        const hasRedirect = search.includes("redirect=");
        split = split[split.length - 1];

        if(nextProps && nextProps.errors && nextProps.errors.length > 0){
            nextProps.errors.forEach((error) => {
                message.error(error.msg);
            });
        }
        if(nextProps.isAuthenticated){
            if(split && hasRedirect){
                this.props.history.push(split);
            }else{
                setTimeout(()=> this.props.history.push("/"), 2000);
            }
        }
    }
    onChange=(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit=(e)=>{
        const {email, password} = this.state
        const user={
            email,
            password,
        };
        this.props.login(user);
    }
    render() {
        return (
            <div className="container">
                <Navbar/>
                <h1 style={{color:"black"}}>Login</h1>
                <div className="form">
                    <Input 
                    name="email"
                    type="email" 
                    placeholder="Enter Email" 
                    value={this.state.email}
                    onChange={this.onChange} 
                    /> 
                </div>
                <div className="form">
                    <Input
                    name="password" 
                    type="password" 
                    placeholder="Enter Password" 
                    value={this.state.password}
                    onChange={this.onChange} 
                    /> 
                </div>
                <button className="btn btn-primary" onClick={this.onSubmit}>Sign In</button>
            </div>
        )
    }
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors,
});

export default connect(mapStateToProps, {login})(withRouter(Login));
