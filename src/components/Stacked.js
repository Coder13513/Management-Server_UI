import React, { Component } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";
import { API_PATH } from "../components/Global";

import ReactDOM from 'react-dom';

import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [
        {
          name: 'Category',
          data: [44, 55, 41,]
        }, {
          name: 'Channel',
          data: [13, 23, 0]
        }, {
          name: 'Package',
          data: [11, 0, 0]
        },
        {
          name: 'Content',
          data: [0, 0, 21]
        },
        {
          name: 'Archive',
          data: [0, 0, 0, 21]
        },
        {
          name: 'Settings',
          data: [0, 0, 0, 0, 31]
        }
      ],

      options: {

        chart: {
          type: 'bar',
          height: 750,
          // width:200,
          stacked: true,

        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     legend: {
        //       position: 'bottom',
        //       fontSize: '18px',
        //       offsetX: -10,
        //       offsetY: 0
        //     }
        //   }
        // }],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '30%',
          },
        },
        xaxis: {
          //   type: 'datetime',
          categories: ['LiveTV', 'Radio', 'VoD','TV Archive','Settings'],
        },

       
        legend: {
          position: 'bottom',
          offsetY: 8,
          fontSize: '17px',
          horizontalAlign: 'center',
          itemMargin: {
            horizontal: 15,
            vertical: 0
          },
        },
        fill: {
          opacity: 1
        }
      },


    }
  };



// axios({
//   method: 'GET',
//   url: url,
// })
// .then(function(response) {
//   chart.updateSeries([{
//     name: 'Sales',
//     data: response.data
//   }])
// })


// axios({
//   method: 'GET',
//   url: API_PATH.URL + "settings/home/",
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer' + ticket
//   },
// })
//   .then(function (response) {
//     chart.updateSeries(
//       [{
//         name: 'Package',
//         data: response.data.count
//       }]
//     )
//   });


// .then(res => {
//   // console.log(res);
//   console.log(res.data.count);
//   a.push(res.data.count);




render() {
  return (


    <div id="chart" mt-5>
      <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={500}  />
    </div>

  );
}
}
export default ApexChart

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);
