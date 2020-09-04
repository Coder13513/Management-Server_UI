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
 
import RadioCategoryForm from "../components/RadioCategoryForm";
import RadioCategoryList from "../components/RadioCategoryList";
import RadioCategoryEdit from "../components/RadioCategoryEdit";


import RadioChannelForm from "../components/RadioChannelForm";
import RadioChannelList from "../components/RadioChannelList";
import RadioChannelEdit from "../components/RadioChannelEdit";



export default function RadioFunction() {

    let { path, url } = useRouteMatch();
    let [archivecount, setArchivecount] = useState('')
    let [channelcount, setChannelcount] = useState('')


    useEffect(() => {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'GET',
            url: API_PATH.URL + "radio/categories/",
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
            axios({
                method: 'GET',
                url: API_PATH.URL + "radio/channels/",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer'+ticket 
                },
            })
                .then(response => {
                    console.log(response);
                    let Archives = response.data.results;
                    channelcount = (Archives.length)
                    setChannelcount(channelcount);
    
    
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



                {/* ------close container/div---- */}
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

        if (topicId === "CategoryAdd") {
            return <RadioCategoryForm />
        }
        if (topicId === "CategoryList") {
            return <RadioCategoryList />
        }
        if (topicId === "CategoryEdit") {
            return <RadioCategoryEdit />
        }
        if (topicId === "ChannelAdd") {
            return <RadioChannelForm />
        }
        if (topicId === "ChannelList") {
            return <RadioChannelList />
        }
        if (topicId === "ChannelEdit") {
            return <RadioChannelEdit />
        }
      
    }





