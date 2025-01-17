import React, { Component, useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import axios from 'axios';
import { API_PATH } from "../components/Global";


import SubscribersForm from "../components/SubscribersForm";
import SubscriberProfile from "../components/SubscriberProfile";

import SubscribersGroupsForm from "../components/SubscribersGroupsForm";




export default function SubscriberFunction() {

    let { path, url } = useRouteMatch();
    let [archivecount, setArchivecount] = useState('')


    useEffect(() => {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'GET',
            url: API_PATH.URL +"auth/profile/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
        })
            .then(response => {
                console.log(response);
                // let Archives = response.data.results;
                // archivecount = (Archives.length)
                // setArchivecount(archivecount);


            })
    });

    return (
        <div>
        <div class="container mt-5 ">

            <div class="box">
                <div class="div1" >
                    <a><img src="Sub.jpg" alt="John Doe" width="50px" height="50px" /></a>
                    <a class="count">
                        {archivecount}
                    </a>
                    <a class="option">Subscribers</a>
                </div>
                <div class="div2">
                    {/* <Link to={`${url}/Edit`}> */}
                        <a role="button" class="btn action-btns"><i class="fa fa-edit" >Edit</i></a>
   {/* </Link> */}
                    <Link to={`${url}/Add`}>
                        <a role="button" class="btn action-btns"><i class="fa fa-plus" >Add</i></a>
                    </Link>
                    <Link to={`${url}/Profile`}>
                        < a role="button" class="btn action-btns"><i class="fa fa-list" >List</i></a>
                    </Link>
                </div>
            </div>

            <div class="box">
                <div class="div1" >
                    <a><img src="G.png" alt="John Doe" width="50px" height="50px" /></a>
                    <a class="count">
                        {/* {channelcount} */}
                    </a>
                    <a class="option">Groups</a>
                </div>

                <div class="div2">
                    {/* <Link to={`${url}/Edit`}> */}
                        <a role="button" class="btn action-btns"><i class="fa fa-edit" >Edit</i></a>
                    {/* </Link> */}
                    {/* <Link to={`${url}/Add`}> */}

                        <a role="button" class="btn action-btns"><i class="fa fa-plus" >Add</i></a>
                    {/* </Link> */}
                    {/* <Link to={`${url}/List`}> */}
                        <a role="button" class="btn action-btns"><i class="fa fa-list" >List</i></a>
                    {/* </Link> */}
                </div>
            </div>


         



                {/* ------close container/div---- */}
            </div>
      




        <Switch>
            <Route path={`${path}/:topicId`}>
                <Topic />
            </Route>
        </Switch>
    </div>


    );

    function Topic() {

        let { topicId } = useParams();

        if (topicId === "Add") {
            return <SubscribersForm />
        }
        // if (topicId === "GroupAdd") {
        //     return <SubscribersGroupsForm />
        // }
        if (topicId === "Profile") {
            return <SubscriberProfile />
        }
    }

}



