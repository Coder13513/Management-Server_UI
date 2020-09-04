import React, { useState, useEffect } from "react";
import { Doughnut ,Bar} from "react-chartjs-2";
import axios from "axios";
import { API_PATH } from "../components/Global";


const Dankmemes = () => {
  const [chartData, setChartData] = useState({});
  const ticket = localStorage.getItem("authToken")

  const chart = () => {
    let a = [];
    let s = [];
    let rc = [];
    let rch = [];
    let lc = [];
    let lch = [];
    let pc = [];
    let vc = [];
    let vco = [];

    let value = [a, s, rc, rch, lc, lch, pc, vc, vco];
    let module = ['Settings', 'Archives', 'Radio Category', 'Radio Channel', 'LiveTv Category', 'LiveTv Channel', 'Package', 'VoD Category', 'VoD Contents'];
   

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
        a.push(res.data.count);

       

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
            console.log(res.data.count);
            s.push(res.data.count);

    

            axios({
              method: 'GET',
              url: API_PATH.URL + "radio/categories/",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket 
              },
            })

              .then(res => {
                console.log(res);
                console.log(res.data.count);
                rc.push(res.data.count);

                axios({
                  method: 'GET',
                  url: API_PATH.URL+ "radio/channels/",
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ticket 
                  },
                })

                  .then(res => {
                    console.log(res);
                    console.log(res.data.count);
                    rch.push(res.data.count);

                    axios({
                      method: 'GET',
                      url: API_PATH.URL+"vods/categories/",
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer'+ ticket 
                      },
                    })

                      .then(res => {
                        console.log(res);
                        console.log(res.data.count);
                        vc.push(res.data.count);


                        axios({
                          method: 'GET',
                          url: API_PATH.URL+ "vods/contents/",
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer'+ ticket 
                          },
                        })

                          .then(res => {
                            console.log(res);
                            console.log(res.data.count);
                            vco.push(res.data.count);


                            axios({
                              method: 'GET',
                              url: API_PATH.URL+"livetv/categories/",
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer'+ ticket 
                              },
                            })

                              .then(res => {
                                console.log(res);
                                console.log(res.data.count);
                                lc.push(res.data.count);

                                axios({
                                  method: 'GET',
                                  url: API_PATH.URL+"livetv/channels/",
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer'+ ticket 
                                  },
                                })

                                  .then(res => {
                                    console.log(res);
                                    console.log(res.data.count);
                                    lch.push(res.data.count);

                                    axios({
                                      method: 'GET',
                                      url: API_PATH.URL+"packages/",
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer'+ ticket 
                                      },
                                    })

                                      .then(res => {
                                        console.log(res);
                                        console.log(res.data.count);
                                        pc.push(res.data.count);


                                        setChartData({
                                          labels: module,
                                          datasets: [
                                            {
                                             
                                              data: value,
                                              backgroundColor: ['red', 'yellow', '#96843A', 'green', 'indigo', 'orange', 'cyan', 'brown', 'purple', '#4475A2'],
                                              borderWidth: 1
                                            }
                                          ]
                                        });
                                      })
                                  })
                              })
                          })
                      })
                  })
              })
          })
      })


      .catch(err => {
        console.log(err);
      });
    console.log(value, module);
  };

  useEffect(() => {
    chart();
  },
  );

  return (
    <div className="App">

      <div>

        <Bar
          data={chartData}
          options={{
            // { maintainAspectRatio: false ,
            
            // responsive: true,
            title: { text: "Management Statistics", display: true },
          }}
        />


        {/* <Doughnut
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Management Statistics", display: true },
          }}
        /> */}



      </div>

    </div>
  );
};

export default Dankmemes;

