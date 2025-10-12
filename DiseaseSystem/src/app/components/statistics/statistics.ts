import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { StatisticsService } from '../../services/statistics-service/statistics-service';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics implements OnInit {

  // Vertical bar chart for counts
  countsData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  countsType: ChartType = 'bar';
  countsOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  // Horizontal bar for common diseases
  diseasesData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  diseasesOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    scales: { 
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1
        }
      } 
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  constructor(private statsService: StatisticsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCounts();
    this.loadCommonDiseases();
  }

  loadCounts() {
    this.statsService.getCounts().subscribe(data => {
      this.countsData = {
        labels: ['Doctors', 'Patients', 'Appointments'],
        datasets: [
          {
            label: 'Count',
            data: [data.doctorCount, data.patientCount, data.appointmentCount],
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
          }
        ]
      };
      this.cdr.detectChanges()
    });
  }

  loadCommonDiseases() {
    this.statsService.getCommonDiseases().subscribe(data => {
      this.diseasesData = {
        labels: data.map(d => d.diseaseName),
        datasets: [
          {
            label: 'Occurrences',
            data: data.map(d => d.count),
            backgroundColor: data.map(d =>
              d.severity === 'Severe'
                ? '#e74c3c'
                : d.severity === 'Moderate'
                ? '#f39c12'
                : '#2ecc71'
            )
          }
        ]
      };
      this.cdr.detectChanges()
    });
  }
  
}