import React, { Component } from 'react';
// import './App.css';
import axios from 'axios';
import { Doughnut ,Bar,Chart} from "react-chartjs-2";
// import Chart from './components/Chart';

class Demo extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentDidMount() {
    this.getChartData();
  }

//   getChartData() {
//     axios.get("http://www.json-generator.com/api/json/get/cghIWRNGEO?indent=2")
//   .then(res => {
//         const coin = res.data;
//         let labels = coin.chartData.labels;
//         let data = coin.chartData.datasets.data;
//         // console.log(data.Object.values(data)[0])
//         // data.forEach(element => {
//         // data.push(element.data);
//         //   });

//         this.setState({
//           chartData: {
//             labels:labels,
//             datasets: [
//               {
//                 label: "Population",
//                 data: data,
//                 backgroundColor: [
//                   "rgba(255, 99, 132, 0.6)",
//                   "rgba(54, 162, 235, 0.6)",
//                   "rgba(255, 99, 132, 0.6)"
//                 ],
//               }
//             ]
//           }
//         });
//       });
//     }

  getChartData() {
    axios.get("http://127.0.0.1:8000/api/v1/archives/").then(res => {
        const coin = res.data.count;
        console.log(coin)
        // let labels = [Archive];
        let data = [];
        // coin.forEach(element => {
        // labels.push(element.labels);
        data.push(coin);
        
          // labels.push('Archive');


          // });
          console.log(coin)
          this.setState({
            chartData: {
              // labels:labels,
              datasets: [
                {
                  label: "Population",
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)"
                  ],
                }
              ]
            }
          });
        });
      }
  
    render(){
  
          return (
            <div className="App">
            {Object.keys(this.state.chartData).length &&
              <Chart
                chartData={this.state.chartData}
                location="Massachusetts"
                legendPosition="bottom"
                />
            }
            </div>
          );
  
      }     
  }
  
  export default Demo;