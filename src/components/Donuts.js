import React, { useState, useEffect } from "react";
import { Doughnut ,Bar} from "react-chartjs-2";
import axios from "axios";
import { API_PATH } from "../components/Global";


const Dankmemes = () => {
    
    const ticket = localStorage.getItem("authToken")

    const [chartData, setChartData] = useState({});
    const [settingsData, setSettingsData] = useState({});
    const [livetvData, setLivetvData] = useState({});
     const[radioData, setRadioData] = useState({});
     const [vodData, setVodData] = useState({});



    // useEffect(() => {
    //     chart();
    //     settings();
    //     livetv();
    // },
    // );
    
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

    const settings = () => {
        let s = [];
        let value = [s]
        let module = ['Archives']

        axios({
            method: 'GET',
            url: API_PATH.URL + "archives/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
            .then(res => {
                // console.log(res);
                console.log(res.data.count);
                s.push(res.data.count);


                setSettingsData({
                    labels: module,
                    datasets: [
                        {
                            data: value,
                            backgroundColor: ['yellow'],
                            borderWidth: 1
                        }
                    ]
                });
            })

            .catch(err => {
                console.log(err);
            });

    };
    const livetv = () => {
        let ca = [];
        let ch = [];
        let pa = [];
        let value = [ca, ch, pa]
        let module = ['LiveTVCategory', 'LiveTVChannel', 'Packages']

        axios({
            method: 'GET',
            url: API_PATH.URL + "livetv/categories/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
            .then(res => {
                // console.log(res);
                console.log(res.data.count);
                ca.push(res.data.count);

                axios({
                    method: 'GET',
                    url: API_PATH.URL + "livetv/channels/",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer' + ticket
                    },
                })
                    .then(res => {
                        // console.log(res);
                        console.log(res.data.count);
                        ch.push(res.data.count);

                        axios({
                            method: 'GET',
                            url: API_PATH.URL + "packages/",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer' + ticket
                            },
                        })
                            .then(res => {
                                // console.log(res);
                                console.log(res.data.count);
                                pa.push(res.data.count);





                                setLivetvData({
                                    labels: module,
                                    datasets: [
                                        {
                                            data: value,
                                            backgroundColor: ['magenta','orange','green'],
                                            borderWidth: 1
                                        }
                                    ]
                                });
                            })
                    })
            })

            .catch(err => {
                console.log(err);
            });

    };
    const vod = () => {
        let ca = [];
        let ch = [];
       
        let value = [ca, ch]
        let module = ['VoD Category', 'VoD Contents']

        axios({
            method: 'GET',
            url: API_PATH.URL + "vods/categories/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
            .then(res => {
                // console.log(res);
                console.log(res.data.count);
                ca.push(res.data.count);

                axios({
                    method: 'GET',
                    url: API_PATH.URL + "vods/contents/",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer' + ticket
                    },
                })
                    .then(res => {
                        // console.log(res);
                        console.log(res.data.count);
                        ch.push(res.data.count);

                     


                                setVodData({
                                    labels: module,
                                    datasets: [
                                        {
                                            data: value,
                                            backgroundColor: ['yellow','orange'],
                                            borderWidth: 1
                                        }
                                    ]
                                });
                            
                    })
            })

            .catch(err => {
                console.log(err);
            });

    };
    const radio = () => {
        let ca = [];
        let ch = [];
       
        let value = [ca, ch]
        let module = ['Radio Category', 'Radio Channel',]

        axios({
            method: 'GET',
            url: API_PATH.URL + "radio/categories/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
            .then(res => {
                // console.log(res);
                console.log(res.data.count);
                ca.push(res.data.count);

                axios({
                    method: 'GET',
                    url: API_PATH.URL + "radio/channels/",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer' + ticket
                    },
                })
                    .then(res => {
                        // console.log(res);
                        console.log(res.data.count);
                        ch.push(res.data.count);

                      
                                setRadioData({
                                    labels: module,
                                    datasets: [
                                        {
                                            data: value,
                                            backgroundColor: ['magenta','green'],
                                            borderWidth: 1
                                        }
                                    ]
                                });
                        
                    })
            })

            .catch(err => {
                console.log(err);
            });

    };



    useEffect(() => {
        chart();
        settings();
        livetv();
        radio();
        vod();
    },
    );

    return (
        <div className="App">
            <div  class="row">

                <div class="DD">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            // title: { text: "Management Statistics", display: true },
                        }}
                    />
                </div>
                <div class=" DD">
                    <Bar
                        data={settingsData}
                        options={{
                            responsive: true,
                            // title: { text: "Management Statistics", display: true },
                        }}
                    />
                </div>
                <div class="DD">
                    <Bar
                        data={livetvData}
                        options={{
                            responsive: true,
                            // title: { text: "Management Statistics", display: true },
                        }}
                    />
                </div>
                <div class="DD">
                    <Bar
                        data={radioData}
                        options={{
                            responsive: true,
                            // title: { text: "Management Statistics", display: true },
                        }}
                    />
                </div>
                <div class="DD">
                    <Bar
                        data={vodData}
                        options={{
                            responsive: true,
                            // title: { text: "Management Statistics", display: true },
                        }}
                    />
                </div>

            </div>
        </div>
    );
};

export default Dankmemes;

