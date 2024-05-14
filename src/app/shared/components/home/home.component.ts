import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Tasks Chart Configuration
  tasksChart = new Chart({
    chart: {
      type: 'pie', // Chart type
      width: 500, // Chart width
      height: 300, // Chart height
    },
    title: {
      text: 'Tasks', // Chart title
      floating: true, // Floating title
    },
    credits: {
      enabled: false, // Credits disabled
    },
    tooltip: {
      // Tooltip configuration
      formatter: function () {
        return '<b>' + this.point.name + '</b>: ' + this.point.y; // Tooltip content
      },
    },
    series: [
      {
        type: 'pie', // Series type
        data: [
          { name: 'Progress', y: 7, color: '#000' }, // Data points
          { name: 'Tasks Number', y: 3, color: '#393e64' },
          { name: 'Project Number', y: 1, color: '#00adb5' },
        ],
      },
    ],
  });

  // Users Chart Configuration
  usersChart = new Chart({
    chart: {
      type: 'pie', // Chart type
      width: 500, // Chart width
      height: 300, // Chart height
    },
    title: {
      text: 'Users', // Chart title
      floating: false, // Not floating
    },
    credits: {
      enabled: false, // Credits disabled
    },
    tooltip: {
      // Tooltip configuration
      formatter: function () {
        return '<b>' + this.point.name + '</b>: ' + this.point.y; // Tooltip content
      },
    },
    series: [
      {
        type: 'pie', // Series type
        data: [
          { name: 'Active', y: 7, color: '#000' }, // Data points
          { name: 'Inactive', y: 2, color: '#393e64' },
        ],
      },
    ],
  });
}