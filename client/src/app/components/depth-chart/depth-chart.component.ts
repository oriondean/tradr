import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-depth-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './depth-chart.component.html',
  styleUrl: './depth-chart.component.css',
})
export class DepthChartComponent {
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'area',
      backgroundColor: '#424242',
      borderColor: '#fff',
      style: {
        color: '#fff',
      },
    },
    title: {
      text: '$$$-$$$ Market Depth',
      style: {
        color: '#fff',
      },
    },
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      labels: {
        style: {
          color: '#fff',
        },
      },
      plotLines: [
        {
          color: '#888',
          value: 45.5, // CALC
          width: 1,
          label: {
            text: 'Actual price',
            rotation: 90,
            style: {
              color: '#fff',
            },
          },
        },
      ],
      title: {
        text: 'Price',
        style: {
          color: '#fff',
        },
      },
    },
    yAxis: [
      {
        lineWidth: 1,
        gridLineWidth: 1,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
          align: 'left',
          x: 8, //#endregion, temp
          style: {
            color: '#fff',
          },
        },
      },
      {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
          align: 'right',
          x: -8, //temp val
          style: {
            color: '#fff',
          },
        },
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillOpacity: 0.2,
        lineWidth: 1,
        step: 'center',
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size: 10px;">Price: {point.key}</span><br/>',
      valueDecimals: 2,
    },
    series: [
      {
        name: 'Bids',
        data: [
          [35, 25],
          [40, 40],
          [45, 25],
        ],
        color: '#03a7a8',
        type: 'line',
      },
      {
        name: 'Asks',
        data: [
          [46, 20],
          [50, 35],
          [60, 40],
        ],
        color: '#fc5857',
        type: 'line',
      },
    ],
  };
}
