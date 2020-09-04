import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link,Redirect } from "react-router-dom"

export class LogoutPage extends Component {
    constructor(props) {
        super(props)

        
    }

    render() {
       

            return (
                <div>
                    <h1>You have been Logout !</h1>
                    < Link to="/"> Login Again</Link>
                </div>
            )
        }
    
}

export default LogoutPage
