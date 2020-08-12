import React, { Component } from "react";
import {
  BrowserRouter as Router, Route, Switch, Link, useParams,  useRouteMatch
}
 from "react-router-dom";

 import './index.css';
//  import "./App.css";



import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import Nav from "./components/Nav";
import Stacked from "./components/Stacked";






class App extends Component {
  render() {
    return (
   <Router>
     
          <Switch>
            <Route exact  path="/" component={LoginPage} /> 
            <Route  path="/Admin" component={Nav} /> 
           
             <Route path="/logout" component={LogoutPage}/> 
     
    
           </Switch >
           </Router>
        
 
    );
  }
}



export default App;

