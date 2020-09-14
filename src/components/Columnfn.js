
import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";
import { API_PATH } from "../components/Global";

import Chart from "react-apexcharts";


class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      //  [ firstSeries, secondSeries,thirdSeries ] = [[1, 2, 3, 4], [11, 22, ],[10]];
      series: [  
        {          // name: 'Category',
          data: [10, 20, 30, 40, 45]
        },
        {
          // name: 'Category',
          data: [15, 25, 35]
        },
        {
          // name: 'Category',
          data:  [20]
        }
      ],

      options: {

        chart: {
          type: 'bar',
          height: 550
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%',
           
            dataLabels: {
              position: 'top',  
              // top,center,bottom
              // maxItems: 100,
              // hideOverflowingLabels: true,
              // orientation: 'vertical'      
             
            },      
           
           
             },
        },

        dataLabels: {
          enabled: true,
          // rotate: 45,
          // enabledOnSeries: [20],
          // offsetY:15,
          // textAnchor: 'start',
          // offsetX:10,

          style: {
            fontSize: '12px',
            colors: ["#304758"]
          },

            formatter: function(val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },

  // formatter: function(value, { labels, dataPointIndex, w }) {
  //   return "hello" + ":  " + value }

         
        },

      

       

        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },

        xaxis: {
          categories: ['LiveTV', 'Radio', 'VoD', 'Tv Archive', 'Settings'],
           labels: ['one', 'two', 'three'],
        },
        // xaxis: {
        //   categories: ['LiveTV','LiveTV Category', 'Radio', 'VoD', 'Tv Archive', 'Settings'],
        // },
        // xaxis: {
        //   categories: ['A-b-c','B','C','D','E'],
        // },

        yaxis: {
          title: {
              text: 'Count'
          }
        },

        fill: {
          opacity: 1,
          colors: ['#17A1CD', '#39BAA1', '#9B9E9B']
        },

          tooltip: {
        y: {
          formatter: function (val) {
            return  "category"+ val 
          }
        }
          },

        //   toolTip: {
        //     enabled: true  //enable here
        //   },

        legend: {
          show: false
        },

        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          hover: {
            filter: {
              type: 'none',

            }
          },
        }

      }
    };
  }
  componentDidMount() {
    this.fetchArchives();
  }

  fetchArchives() {
    const ticket = localStorage.getItem("authToken")

    axios({
      method: 'GET',
      url: API_PATH.URL + "packages/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ticket
      }
    })
      .then(response => {
        console.log(response);
        let Archives = response.data.count;
        console.log(Archives)
        this.setState({
          Archives: Archives,
          // console.log(p)
        })
        // console.log(p)
      })
      .catch(error => {
        console.log('failure:' + JSON.stringify(this.state));
        console.log(error)
      })
  }


  render() {
    return (


      <div class="chart">
        <Chart options={this.state.options} series={this.state.series} type="bar" height={500} />
      </div>

    );
  }
}

export default ApexChart