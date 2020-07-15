import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AuthForm  from './common/AuthForm';
import Axios from 'axios';
import {isEmail} from './common/validation'
import "../index.css"

class Auth extends Component {
    state={
        login:{email:"",password:"",errors:{email:"",password:""}},
        register:{username:"",email:"",password:"",errors:{username:"",email:"",password:""}},
        active:"register"
    }
    handleActive=(active)=>{

        this.setState({
            active
        })
    }

    handleNewTaskUpdate=(e,StateObj)=>{
        const name = e.currentTarget.name
        let Obj = {...this.state[StateObj]}
        Obj[name]=e.currentTarget.value
        if(Obj[name]==="") Obj.errors[name]=`Please enter a valid ${name}`
        else delete Obj.errors[name]
        if(StateObj==="login"){
            this.setState({
                login:Obj
            })
        }
        else{
            this.setState({
                register:Obj
            })           
        }
      }

    handleSubmit=async(item,active)=>{
        if(!isEmail(item.email)){
            let Obj={...this.state[active]}
            Obj.errors.email="Please enter a valid email format"
            this.setState({[active]:Obj})
            return ;
        }

        const {data} = await Axios.post(`http://localhost:8080/auth/${active}`,item)
        if(data.token){
            localStorage.setItem('jwt',data.token)
            this.props.history.replace('/home')
        }
        else{
            let Obj = {...this.state}
            Obj[active].credentialError = data.error
            this.setState(Obj)
        }

    }

    render() {
        return (
            <React.Fragment>
            <div className="container p-5">
                <h3 className="text-center m-5">Welcome to 
                    <small className="courier ml-1 mr-2">Taskboom.com</small> a Task manager web app</h3>
                <div className="row p-0 m-0">
                    <div className="col-6 ">
                        <button className={`btn border-dark absolute float-right ${this.state.active==="login"?"btn-dark":""}`} 
                        onClick={()=>{this.handleActive('login')}}>Log in</button>
                    </div>
                    <div className="col-6">
                        <button className={`btn border-dark absolute float-left ${this.state.active==="register"?"btn-dark":""}`} 
                        onClick={()=>{this.handleActive('register')}}>Register</button>
                    </div>
                </div>
            </div>
            {this.state.active !== ""?
            <AuthForm 
            item={this.state[this.state.active]} 
            active={this.state.active}
            handleNewTaskUpdate={this.handleNewTaskUpdate}
            handleSubmit={this.handleSubmit}
            />:<React.Fragment/>}
            </React.Fragment>
        );
    }
}

export default Auth;