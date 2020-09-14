import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import axios from 'axios'
import { API_PATH } from './Global'


export class LoginPage extends Component {
    constructor(props) {
        super(props)

        // const ticket = localStorage.getItem("storeToken")

        let LogIn = false

        // if (ticket == null)
        // {
        //     LogIn=false
        // }



        this.state = {
            email: '',
            password: '',

            LogIn
        }
    }
    usernamechange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    passwordchange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    loginHandler = (e) => {
        // alert(e)
        e.preventDefault()

        let fd = new FormData()
        fd.append("email", this.state.email)
        fd.append("password", this.state.password)

        axios({
            method: 'POST',
            url: API_PATH.URL + "auth/login/",
            headers: {
                'Content-Type': 'application/json',
            },
            data: fd
        })
            .then(response => {
                
                console.log(response)
                console.log(response.data.data.user.token)

                let pass = response.data.data.user.token


                if (pass != null) {

                    localStorage.setItem("storeToken", response.data.data.user.token)
                    // let  storage=localStorage.getItem("storeToken")
                    // console.log(storage)

                    this.setState({
                        LogIn: true

                    })
                }
            })
              .catch(error => {
                console.log(error)
            });
    
        };
            // .catch(error => {
            //     console.log(error)
            // });
    

    render() {

        if (this.state.LogIn) {
            return <Redirect to="/Admin" />
        }


        const { email, password } = this.state

        return (
            <div>
                <form onSubmit={this.loginHandler}>
                    <div class="form-group row logo ">
                        <a > <img alt="LOGO" src="black_leanvia.png" width="300px"
                            height="100px" /></a>
                    </div>
                    <div class="loginBox">
                        <div class=" loginMaintitle">
                            <h1>IPTV</h1>
                            <p>Management Dashboard </p>
                        </div>
                        <div class="form-group  ">
                            <label class="inputlogin">Username:</label>
                            <input class="form-control login" type="text" value={email} onChange={this.usernamechange} />
                        </div>
                        <div class="form-group ">
                            <label class="inputlogin" >Password:</label>
                            <input class="form-control login" type="password" value={password} onChange={this.passwordchange} />
                        </div>
                    </div>
                    {/* <input type="submit" /> */}
                    <button className="btn btn-loginbtn" type="submit" > Log in </button>
                </form>
            </div >
        )
    }
}

export default LoginPage