import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChartModule } from 'highcharts-angular';
import { WebSocketDataService } from '../../services/web-socket-data.service';

@Component({
  selector: 'app-depth-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './depth-chart.component.html',
  styleUrl: './depth-chart.component.css',
})
export class DepthChartComponent implements OnInit {
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(private webSocketDataService: WebSocketDataService) {}

  ngOnInit(): void {
    this.webSocketDataService.bidOrders$.subscribe((bidOrders) => {
      this.webSocketDataService.askOrders$.subscribe((askOrders) => {
        this.chartOptions = {
          chart: {
            type: 'area',
            backgroundColor: '#424242',
            borderColor: '#fff',
            // height: '100%',
            style: {
              color: '#fff',
              // height: 100 ,
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
                value: 45.5, // CALC NEEDED
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
                x: 8,
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
                x: -8,
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
              threshold: null,
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
              data: bidOrders,
              color: '#03a7a8',
              type: 'area',
            },
            {
              name: 'Asks',
              data: askOrders,
              color: '#fc5857',
              type: 'area',
            },
          ],
        };
      });
    });
  }
}
