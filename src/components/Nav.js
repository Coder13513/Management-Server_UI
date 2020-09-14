import React, { useState, useEffect, Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
} from "react-router-dom";

import { Redirect } from "react-router-dom";
import { API_PATH } from './Global';
import Breadcrumbs from '../components/Breadcrumbs';
import ArchiveFunction from "./ArchiveFunction";
import LivetvFunction from "./LivetvFunction";
import PvrFunction from "./PvrFunction";
import SettingsFunction from "./SettingsFunction";
import RadioFunction from "./RadioFunction";
import VodFunction from "./VodFunction";
import AdminFunction from "./AdminFunction";
import SubscriberFunction from "./SubscriberFunction";
import NotiFunction from "./NotiFunction";
import FavFunction from "./FavFunction";
import LogoutPage from "./LogoutPage";
import Doughnut from "./Doughnut";
import Donuts from './Donuts';
import Donut from './Donut';
import Bar from './Bar';
import Column from './Column';
import Columnfn from './Columnfn';
import Stacked from './Stacked';
import Axiosdemo from './Axiosdemo';
import Stack from './Stack';

import Chart from "./Chart";

import axios from "axios";


import RadioCategoryForm from "../components/RadioCategoryForm";
import RadioChannelForm from "../components/RadioChannelForm";
import ArchiveForm from "../components/ArchiveForm";
import ArchiveList from "../components/ArchiveList";
import ArchiveEdit from "../components/ArchiveEdit";
import SettingsForm from "../components/SettingsForm";



export class Nav extends Component {

    constructor(props) {
        super(props)

        const ticket = localStorage.getItem("storeToken")
    
        let LogIn=true

       

        if (ticket == null) {
          
            LogIn = false
          
        }

        this.state = {
            LogIn 
           }
             
    
}

 logout=()=>{
    axios({
        method: 'POST',
        url: API_PATH.URL + "auth/logout/",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {                
            console.log(response)
            console.log("now loggedout")
            localStorage.removeItem("storeToken")
            console.log("token removed")
        })
    
    this.props.history.push("/logout");
};


render() {
    if (this.state.LogIn === false) {
        return < Redirect to="/" />
    }

    return (

        <Router>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-2" >
                        <div className="sidebar">
                            <div className="btn-group-vertical">
                                <a ><img alt="pic" src="logo_white.png" width="100%" height=" 20%" /></a>
                                <div class="menu">
                                <Link to="/Donut">
                                        <a type="button" className="btn text-light"><i className="fa fa-home mr-3"></i> Home</a>
                                    </Link>
                                    <Link to="/Admin">
                                        <a type="button" className="btn text-light"><i className="fa fa-user-circle-o mr-3"></i> Admin</a>
                                    </Link>
                                    <Link to="/Subscriber">
                                        <a type="button" className="btn text-light"><i className="fa fa-users mr-3"></i> Subscribers</a>
                                    </Link>
                                    <Link to="/Livetv">
                                        <a type="button" className="btn text-light"><i className="fa fa-tv mr-3"></i> Live TV</a>
                                    </Link>
                                    <Link to="/Radio">
                                        <a type="button" className="btn text-light"><i className="fa fa-music mr-3"></i> Radio</a>
                                    </Link>
                                    <Link to="/Archive">
                                        <a type="button" className="btn text-light"><i className="fa fa-archive mr-3"></i> TV Archive</a>
                                    </Link>                               
                                    <Link to="/Vod">
                                        <a type="button" className="btn text-light"><i className="fa fa-youtube-play mr-3"></i> VOD</a>
                                    </Link>
                                    <Link to="/Settings">
                                        <a type="button" className="btn text-light"><i className="fa fa-gears mr-3"></i>   Settings</a>
                                    </Link>
                                    <Link to="/Favourites">
                                        <a type="button" className="btn text-light"><i className="fa fa-bookmark mr-3"></i>Favourites</a>
                                    </Link>
                                    <Link to="/Notifications">
                                        <a type="button" className="btn text-light"><i className="fa fa-bell mr-3"></i>Notifications</a>
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-10" >
                        <nav class="navbar navbar-expand-sm ">
                            <ul class="navbar-nav">
                                <Breadcrumbs />
                            </ul>
                            <ul class="navbar-nav mx-auto  ">
                                <div class="maintitle">
                                    <h1>IPTV</h1>
                                    <p>Management Dashboard </p>
                                </div>
                            </ul>
                            <ul class="navbar-nav ml-auto">

                                <li>
                                    {/* <Link to="/logout"> */}
                                        <button className="btn btn-mylogout" onClick={this.logout}><i class=" fa fa-sign-out"></i> Logout</button>
                                    {/* </Link> */}
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/Donut"> <Stack/>  </Route>
                            <Route path="/Archive"> <ArchiveFunction /> </Route>
                            <Route path="/Livetv"> <LivetvFunction />  </Route>                
                            <Route path="/Settings"> <SettingsFunction />  </Route>
                            <Route path="/Radio"> <RadioFunction />  </Route>
                            <Route path="/Vod"> <VodFunction />  </Route>
                            <Route path="/Admin"> <AdminFunction />  </Route>
                            <Route path="/Subscriber"> <SubscriberFunction /> </Route>    
                            <Route path="/Notifications"> <NotiFunction />  </Route>
                            <Route path="/Favourites"> <FavFunction />  </Route>
                                                
                                                

                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    )
}
}


export default Nav
