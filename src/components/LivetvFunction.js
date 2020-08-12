import React, { Component, useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import axios from 'axios'
import { API_PATH } from "../components/Global";

import LivetvCategoryForm from "../components/LivetvCategoryForm";
import LivetvCategoryList from "../components/LivetvCategoryList";
import LivetvCategoryEdit from "../components/LivetCategoryEdit";

import LivetvChannelForm from "../components/LivetvChannelForm";
import LivetvChannelList from "../components/LivetvChannelList";
import LivetvChannelEdit from "../components/LivetvChannelEdit";

import PackageForm from "../components/PackageForm";
import PackageList from "../components/PackageList";
import PackageEdit from "../components/PackageEdit";


export default function LivetvFunction() {

    let { path, url } = useRouteMatch();
    let [archivecount, setArchivecount] = useState('')
    let [channelcount, setChannelcount] = useState('')
    let [packagecount, setPackagecount] = useState('')



    useEffect(() => {
        const ticket = localStorage.getItem("authToken")
       
        axios({
            method: 'GET',
            url:API_PATH.URL + "livetv/categories/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ticket
            },
        })
            .then(response => {
                console.log(response);
                let Archives = response.data.results;
                archivecount = (Archives.length)
                setArchivecount(archivecount);


            })

        axios({
            method: 'GET',
            url: API_PATH.URL + "livetv/channels/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ticket
            },
        })
            .then(response => {
                console.log(response);
                let Archives = response.data.results;
                channelcount = (Archives.length)
                setChannelcount(channelcount);


            })
        axios({
            method: 'GET',
            url: API_PATH.URL + "packages/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ticket
              
            },
        })
            .then(response => {
                console.log(response);
                let Archives = response.data.results;
                packagecount = (Archives.length)
                setPackagecount(packagecount);


            })

    });

    return (
        <div>
            <div class="container mt-5 ">

                <div class="box">
                    <div class="div1" >
                        <a><img src="category.png" alt="John Doe" width="50px" height="50px" /></a>
                        <a class="count">
                            {archivecount}
                        </a>
                        <a class="option">Categories</a>
                    </div>
                    <div class="div2">
                        <Link to={`${url}/CategoryEdit`}>
                            <a role="button" class="btn action-btns"><i class="fa fa-edit" >Edit</i></a>
       </Link>
                        <Link to={`${url}/CategoryAdd`}>
                            <a role="button" class="btn action-btns"><i class="fa fa-plus" >Add</i></a>
                        </Link>
                        <Link to={`${url}/CategoryList`}>
                            < a role="button" class="btn action-btns"><i class="fa fa-list" >List</i></a>
                        </Link>
                    </div>
                </div>

                <div class="box">
                    <div class="div1" >
                        <a><img src="Chan.png" alt="John Doe" width="50px" height="50px" /></a>
                        <a class="count">
                            {channelcount}
                        </a>
                        <a class="option">Channels</a>
                    </div>

                    <div class="div2">
                        <Link to={`${url}/ChannelEdit`}>
                            <a role="button" class="btn action-btns"><i class="fa fa-edit" >Edit</i></a>
                        </Link>
                        <Link to={`${url}/ChannelAdd`}>

                            <a role="button" class="btn action-btns"><i class="fa fa-plus" >Add</i></a>
                        </Link>
                        <Link to={`${url}/ChannelList`}>
                            <a role="button" class="btn action-btns"><i class="fa fa-list" >List</i></a>
                        </Link>
                    </div>
                </div>


                <div class="box">
                    <div class="div1" >
                        <a><img src="package.png" alt="John Doe" width="50px" height="50px" /></a>
                        <a class="count">
                            {packagecount}
                        </a>
                        <a class="option">Packages</a>
                    </div>
                    <div class="div2">
                        <Link to={`${url}/PackageEdit`}>
                            <a role="button" class="btn action-btns"><i class="fa fa-edit" >Edit</i></a>
                        </Link>

                        <Link to={`${url}/PackageAdd`}>
                            <a role="button" class="btn action-btns"><i class="fa fa-plus" >Add</i></a>
                        </Link>
                        <Link to={`${url}/PackageList`}>
                            <a role="button" class="btn action-btns"><i class="fa fa-list" >List</i></a>
                        </Link  >
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

        if (topicId === "CategoryAdd") {
            return <LivetvCategoryForm />
        }
        if (topicId === "CategoryList") {
            return <LivetvCategoryList />
        }
        if (topicId === "CategoryEdit") {
            return <LivetvCategoryEdit />
        }
        if (topicId === "ChannelAdd") {
            return <LivetvChannelForm />
        }
        if (topicId === "ChannelList") {
            return <LivetvChannelList />
        }
        if (topicId === "ChannelEdit") {
            return <LivetvChannelEdit />
        }
        if (topicId === "PackageAdd") {
            return <PackageForm />
        }
        if (topicId === "PackageList") {
            return <PackageList />
        }
        if (topicId === "PackageEdit") {
            return <PackageEdit />
        }
    }

}