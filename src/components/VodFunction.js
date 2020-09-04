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

import VodCategoryForm from "../components/VodCategoryForm";
import VodCategoryList from "../components/VodCategoryList";
import VodCategoryEdit from "../components/VodCategoryEdit";

import VodContentForm from "../components/VodContentForm";
import VodContentList from "../components/VodContentList";
import VodContentEdit from "../components/VodContentEdit";


export default function VodFunction() {

    let { path, url } = useRouteMatch();
    let [archivecount, setArchivecount] = useState('')
    let [contentcount, setContentcount] = useState('')



    useEffect(() => {
        const ticket = localStorage.getItem("authToken");
        axios({
            method: 'GET',
            url: API_PATH.URL+ "vods/categories/",
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
            axios({
             method: 'GET',
                url: API_PATH.URL+"vods/contents/",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ticket
                },
            })
                .then(response => {
                    console.log(response);
                    let Archives = response.data.results;
                    contentcount = (Archives.length)
                    setContentcount(contentcount);
    
    
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
                    <a><img src="Con.jpg" alt="John Doe" width="50px" height="50px" /></a>
                    <a class="count">
                        {contentcount}
                    </a>
                    <a class="option">Contents</a>
                </div>

                <div class="div2">
                    <Link to={`${url}/VideosEdit`}>
                        <a role="button" class="btn action-btns"><i class="fa fa-edit" >Edit</i></a>
                    </Link>
                    <Link to={`${url}/VideosAdd`}>

                        <a role="button" class="btn action-btns"><i class="fa fa-plus" >Add</i></a>
                    </Link>
                    <Link to={`${url}/VideosList`}>
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

    function Topic() {

        let { topicId } = useParams();

        if (topicId === "CategoryAdd") {
            return <VodCategoryForm />
        }
        if (topicId === "CategoryList") {
            return <VodCategoryList />
        }
        if (topicId === "CategoryEdit") {
            return <VodCategoryEdit/>
        }
        if (topicId === "VideosAdd") {
            return <VodContentForm />
        }
        if (topicId === "VideosList") {
            return <VodContentList />
        }
        if (topicId === "VideosEdit") {
            return <VodContentEdit />
        }
        
    }

}



