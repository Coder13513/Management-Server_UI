import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { API_PATH } from "../components/Global";

import ReactDOM from 'react-dom';
import ReactApexChart from "react-apexcharts";
import ArchiveList from "./ArchiveList";

class Charts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //  a = [],
            Data: {}
            // series:[
            //     {
            //         name: 'A',                   
            //         data: []
            //     }
            // ]        
        }
    }

        componentDidMount() {
            const ticket = localStorage.getItem("authToken")
            axios({
                method: 'GET',
                url: API_PATH.URL + "archives/",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ticket
                },
            })
                .then(res => {
                    console.log(res);
                    const archive = res.data.count;
                    let a = [];
                    a.push(archive)
                    console.log(a)

                    this.setState({
                        Data: {
                        // labels: Archives,
                        series: [
                            {
                            label:' Archives',
                                data: a,
                                backgroundColor: [
                                    "#3cb371"
                                ]
                            }
                        ]
                    }
                    })
                })
        }

        render() {
            return (
                <div>
                    <Bar
                        data={this.state.Data}
                        options={
                            { stacked: true },
                            { maintainAspectRatio: false }
                        }
                    />
                </div>
            )
        }
    }

    export default Charts


