
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
    selector: 'ngx-starter-menu',
    styleUrls: ['./starter.component.scss'],
    templateUrl: './starter.component.html',
  })
  export class StarterMenuComponent implements OnInit {
    doughnut: any;
    myLine: any;
  myBarChart: any;
    constructor() {}

ngOnInit(): void {
this.lineCustomChart();
this.doughnutChart();
this.initBarChart();
}

lineCustomChart(): void {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const config: any = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        label: 'My First dataset',
        borderColor: 'red',
        backgroundColor: 'red',
        data: [
    1, -15, 30, -45, 60, -90,
        ],
      }, {
        label: 'My Second dataset',
        borderColor: 'blue',
        backgroundColor: 'blue',
        data: [ 20, -50, 70, -90, 100, -120,
        ],
      }, {
        label: 'My Third dataset',
        borderColor: 'green',
        backgroundColor: 'green',
        data: [1, -10, 20, -30, 40, -50,
        ],
      }, {
        label: 'My Third dataset',
        borderColor: 'yellow',
    backgroundColor: 'yellow',
    data: [1, -5, 10, -15, 20, -25					],
      }],
    },
    options: {
      // maintainAspectRatio: true,
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Stacked Area',
      },
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index',
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        }],
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        }],
      },
    },
  };

this.myLine = new Chart('myLine', config);

}

    doughnutChart(): void {
      this.doughnut =  new Chart('doughnut', {
        type: 'doughnut',
        options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'Doughnut Chart',
        }, legend: {
          position: 'top',
        }, animation: {
          animateScale: true,
          animateRotate: true,
      },
      rotation: -50 * Math.PI,
      // circumference: 3 * Math.PI,
      // cutoutPercentage: 60,
      // elements: {
      // point: {
      // radius: 0,
      // pointStyle: 'triangle',
      // 'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle';
      // hitRadius: 20,
      // },
      // arc: {
      // borderWidth: 10
      // },
      // },
      // borderAlign: BorderAlignment,
      // 	borderColor: string;
      // 	borderWidth: number;
      // 	circumference: number;
      // 	endAngle: number;
      // 	innerRadius: number;
      // 	outerRadius: number;
      // 	startAngle: number;
      // 	x: number;
      // 	y: number;
      // devicePixelRatio: 10,
      plugins: {

      },
        },
        data: {
        datasets: [{
          data: [45, 25, 15],
          backgroundColor: [ 'orangered', 'blue', 'green'],
        label: 'Dataset 1',
      // borderAlign: 'inner',
      // borderWidth: 10,
      // weight: 100,
      // borderColor: 'black',
      // radius: 10000,
      // innerRadius: 100,
        }],
        labels: [ 'Orangered', 'Blue', 'Green'],
      },
      // rotation: -0.5 * Math.PI
      // borderAlign: 'inner'
      });
    }

    initBarChart(): void {
      const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
     const color = Chart.helpers.color;
      const horizontalBarChartData = {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [{
            label: 'Dataset 1',
            backgroundColor: color('red').alpha(0.5).rgbString(),
            borderColor: 'red',
            borderWidth: 1,
            data: [ 2, 3, 4, 5,
        ]},
        ],
        };
     this.myBarChart = new Chart('myBarChart', {
    type: 'horizontalBar',
    data: horizontalBarChartData,
    options: {
      maintainAspectRatio: false,
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
          borderWidth: 2,
          },
        },
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Horizontal Bar Chart',
        },
        },
      });
      //   this.myBarChart = new Chart('myBarChart', {
      //   type: 'horizontalBar',
      //   data: {
      //     datasets: [{
      //       barPercentage: 0.5,
      //       barThickness: 6,
      //       maxBarThickness: 8,
      //       minBarLength: 2,
      //       data: [10, 20, 30, 40, 50, 60]
      //   }]
      //   },
      //   options: {
      //     scales: {
      //         xAxes: [{
      //             stacked: true
      //         }],
      //         yAxes: [{
      //             stacked: false
      //         }]
      //     }
      // }

      //   });

      }
  }
