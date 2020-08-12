import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { API_PATH } from "../components/Global";


const Dankmemes = () => {

    const [chartData, setChartData] = useState({});

    const ticket = localStorage.getItem("authToken")

    const chart = () => {
        let s = [];       
        let value = [s]
        let module = ['Settings']

        axios({
            method: 'GET',
            url: API_PATH.URL + "settings/home/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
                .then(res => {
                // console.log(res);
                console.log(res.data.count);
                s.push(res.data.count);


                setChartData({
                    labels: module,
                    datasets: [
                        {
                            data: value,
                            backgroundColor: ['red'],
                            borderWidth: 1
                        }
                    ]
                });
            })

            .catch(err => {
                console.log(err);
            });
        
    };

    useEffect(() => {
        chart();
    },
    );

    return (
        <div className="App">
            <div>
                <div class="DR1">
                    <Doughnut
                        data={chartData}
                        options={{
                            responsive: true,
                            title: { text: "Management Statistics", display: true },
                        }}
                    />
                </div>             
               
            </div>
        </div>
    );
};

export default Dankmemes;

