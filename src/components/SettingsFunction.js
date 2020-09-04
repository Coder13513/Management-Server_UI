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
// import Api from "../components/Api"
import { API_PATH } from "../components/Global";

import SettingsForm from "../components/SettingsForm";
import SettingsList from "../components/SettingsList";
import SettingsEdit from "../components/SettingsEdit";



export default function SettingsFunction() {

    let { path, url } = useRouteMatch();
    let [archivecount, setArchivecount] = useState('')


    useEffect(() => {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'GET',
            url:API_PATH.URL + "settings/home/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
        })
            .then(response => {
                console.log(response);
                let Archives = response.data.results;
                archivecount = (Archives.length)
                setArchivecount(archivecount);


            })
    });

    return (
        <div>
            <div class="container mt-5 ">
                <div class="box">
                    <div class="div1" >
                        <a class="image"><img src="H.svg" alt="John Doe" width="50px" height="50px" /></a>
                        <a class="count">
                            {archivecount}
                        </a>
                        <a class="option">Home</a>
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
    function Topic() {

        let { topicId } = useParams();

        if (topicId === "Add") {
            return <SettingsForm />
        }
        if (topicId === "Edit") {
            return <SettingsEdit />
        }
        if (topicId === "List") {
            return <SettingsList />
 }
    }

}
