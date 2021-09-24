import React, { Component } from 'react';
import Input from "../general/Input";
import {message} from "antd";
import Navbar from '../general/Navbar';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {register} from "../../actions/authActions"

class Register extends Component {
    constructor(){
        super();
        this.state={
            name:"",
            username:"",
            email:"",
            photo:"",
            password:"",
        }
    }
    componentWillReceiveProps(nextProps){
        const search = this.props.location.search;
        let split = search.split("redirect=");
        const hasRedirect = search.includes("redirect=");
        split = split[split.length - 1];
        console.log(nextProps.auth);
        if(nextProps && nextProps.auth.errors && nextProps.auth.errors.length > 0){
            nextProps.auth.errors.forEach(error => {
                message.error(error.msg);
            });
        }    
        if(nextProps.auth.isAuthenticated){
            if(split && hasRedirect){
                this.props.history.push(split);
            }else{
                message.success("Thank you for signing up");
                setTimeout(()=> this.props.history.push("/"), 3000);
            } 
        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit=(e)=>{
        const{name, username, email, password} = this.state;
        const newUser={
            name, username, email, password
        };
        this.props.register(newUser);
    }
    render() {
        const {name, username, email, photo, password} = this.state;
        return (
            <div className="container">
                <Navbar/>
                <h1 className="large">Register</h1>
                <p className="lead">Create Your Account</p>
                <div className="form">
                    <Input
                    name="name" 
                    type="text" 
                    placeholder="Enter Name" 
                    value={name} 
                    onChange={this.onChange} 
                    /> 
                </div>
                <div className="form">
                    <Input
                    name="username" 
                    type="text" 
                    placeholder="Enter Username" 
                    value={username} 
                    onChange={this.onChange} 
                    /> 
                </div>
                <div className="form">
                    <Input
                    name="email" 
                    type="email" 
                    placeholder="Enter Email" 
                    value={email} 
                    onChange={this.onChange} 
                    /> 
                </div>
                <div className="form">
                    <Input
                    name="password" 
                    type="password" 
                    placeholder="Enter Password" 
                    value={password} 
                    onChange={this.onChange} 
                    /> 
                </div>
                <div className="form">
                    <Input
                    name="photo" 
                    type="file" 
                    placeholder="Upload Photo" 
                    value={photo} 
                    onChange={this.onChange} 
                    /> 
                </div>
                <button className="btn btn-primary" onClick={this.onSubmit}>Register</button>
            </div>
        )
    }
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps,{register})(withRouter(Register));
