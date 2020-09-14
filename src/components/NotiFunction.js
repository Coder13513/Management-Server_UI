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

import Api from "../components/Api"
import { API_PATH } from "../components/Global";
import NotiForm from "../components/NotiForm";
import NotiList from "../components/NotiList";
import NotiEdit from "../components/NotiEdit";

export default function ArchiveFunction() {

    let { path, url } = useRouteMatch();
    let [archivecount, setArchivecount] = useState('')
    
    const ticket = localStorage.getItem("authToken")


    useEffect(() => {
        axios({
            method: 'GET',
            url:  API_PATH.URL + "notification/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket 
            },
        })
            .then(response => {
                console.log(response);
                let Archives = response.data.results;
                archivecount = (Archives.length)
                setArchivecount(archivecount);


            })
    }
    );

    return (
        <div>
            <div class="container mt-5 ">
                <div class="box">
                    <div class="div1" >
                        <a class="image"><img src="not.png" alt="John Doe" width="50px" height="50px" /></a>
                        <a class="count">
                            {archivecount}
                        </a>
                        <a class="option">Notifications</a>
                    </div>
                    <div class="div2">
                        <Link to={`${url}/Edit`}>
                            <a role="button" class="btn action-btns" ><i class="fa fa-edit" >Edit</i></a>
                        </Link>

                        <Link to={`${url}/Add`}>
                            <a role="button" class="btn action-btns" ><i class="fa fa-plus" >Add</i></a>
                        </Link >
                        <Link to={`${url}/List`}>
                            <a role="button" class="btn action-btns"><i class="fa fa-list" >List</i></a>
                        </Link>
                    </div>
                </div>
            </div>
            <Switch>
                <Route path={`${path}/:topicId`}>
                    <Topic />
                </Route>
            </Switch>
        </div>

    );
}

    function Topic() {

        let { topicId } = useParams();

        if (topicId === "Add") {
            return <NotiForm />
        }
        if (topicId === "Edit") {
            return <NotiEdit />
        }
        if (topicId === "List") {
            return <NotiList />
        }
        else{
            return    <h2> No</h2>    
        }
    }
