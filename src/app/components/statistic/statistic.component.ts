import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  ChartConfiguration,
  ChartEvent,
  ChartType,
  ChartOptions,
  Chart,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { StatisticService } from '../../services/statistic.service';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ActivatedRoute } from '@angular/router';

Chart.register(zoomPlugin);

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatisticComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  formCtrStartMonth = new FormControl();
  formCtrEndMonth = new FormControl();
  searchFormControl = new FormControl();
  filteredOptions?: Observable<any[]>;
  chartTypeOption: ChartType = 'line';
  endDate = '';
  startDate = '';
  startMonth = '';
  endMonth = '';
  startMonthYear = '';
  endMonthYear = '';
  startYear = '';
  endYear = '';
  length = 0;
  pageSize = 0;
  isStatistic = false;
  labels = new Array();
  data = {
    data: new Array(),
    label: '',
    backgroundColor: 'rgba(25,135,84,0.8)',
    borderColor: 'green',
    pointBackgroundColor: 'red',
    pointBorderColor: 'red',
    pointHoverBackgroundColor: '#fff',
    fill: 'origin',
  };
  storeId = "";

  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  constructor(
    private statisticService: StatisticService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.getData();
    this.storeId = this.activatedRoute.snapshot.params['id'];
  }

  resetData(): void {
    this.data.data = new Array();
    this.labels = new Array();
  }

  getDataWithDay(type: string, startDate: string, endDate: string): void {
    this.resetData();
    this.statisticService
      .getDataWithDay(this.storeId, startDate, endDate)
      .subscribe((data) => {
        for (let i = 0; i < data?.data.length; i++) {
          this.data.data.push(data.data[i].units);
          this.labels.push(data.data[i].date);
        }
        this.data.label = data?.titleX;

        this.lineChartData = {
          datasets: [this.data],
          labels: this.labels,
        };

        this.isStatistic = false;
      });
  }

  getDataWithMonth(
    type: string,
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string
  ): void {
    this.resetData();
    this.statisticService
      .getDataWithMonth(
        this.storeId,
        startMonth,
        startYear,
        endMonth,
        endYear
      )
      .subscribe((data) => {
        for (let i = 0; i < data?.data.length; i++) {
          this.data.data.push(data.data[i].units);
          this.labels.push(data.data[i].date);
        }
        this.data.label = data?.titleX;

        this.lineChartData = {
          datasets: [this.data],
          labels: this.labels,
        };

        this.isStatistic = false;
      });
  }

  getDataWithYear(type: string, startYear: string, endYear: string): void {
    this.resetData();
    this.statisticService
      .getDataWithYear(this.storeId, startYear, endYear)
      .subscribe((data) => {
        for (let i = 0; i < data?.data.length; i++) {
          this.data.data.push(data.data[i].units);
          this.labels.push(data.data[i].date);
        }
        this.data.label = data?.titleX;

        this.lineChartData = {
          datasets: [this.data],
          labels: this.labels,
        };

        this.isStatistic = false;
      });
  }

  formatLabel(value: number) {
    return value;
  }

  stopPropagation(event: any) {
  }

  getEndDate(event: any) {
    this.endDate = event.value;
  }

  getStartDate(event: any) {
    this.endDate = event.value;
  }

  getPickItem(event: any): void {
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  lineChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'VNĐ',
          font: {
            weight: '700',
          },
          color: '#898989',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Thống kê doanh thu bán hàng',
        position: 'bottom',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        limits: {
          x: { min: 0, max: 100000, minRange: 50 },
          y: { min: 0, max: 100000000, minRange: 50 },
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
          onZoomComplete({ chart }) {
            chart.update('active');
          },
        },
      },
    },
  };

  chartClicked({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
  }

  chartHovered({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
  }

  hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  getDate(type: string, event: any): void {
    const newDate = new Date(event.value);
    this.startDate =
      type == 'start'
        ? newDate.getMonth() +
          1 +
          '-' +
          newDate.getDate() +
          '-' +
          newDate.getFullYear()
        : this.startDate;
    this.endDate =
      type == 'end'
        ? newDate.getMonth() +
          1 +
          '-' +
          newDate.getDate() +
          '-' +
          newDate.getFullYear()
        : this.endDate;
  }

  getStatistic(type: string): void {
    this.isStatistic = true;
    switch (type) {
      case 'day':
        this.getDataWithDay(type, this.startDate, this.endDate);
        break;
      case 'month':
        this.getDataWithMonth(
          type,
          this.startMonth,
          this.startMonthYear,
          this.endMonth,
          this.endMonthYear
        );
        break;
      case 'year':
        this.getDataWithYear(type, this.startYear, this.endYear);
        break;
      default:
        break;
    }
  }

  getYear(type: string, value: any): void {
    this.startYear = type == 'start' ? value : this.startYear;
    this.endYear = type == 'end' ? value : this.endYear;
  }

  getMonth(type: string, value: any): void {
    this.startMonth = type == 'start' ? value : this.startMonth;
    this.endMonth = type == 'end' ? value : this.endMonth;
  }

  chooseMonthHandler(
    type: string,
    event: any,
    datePicker: any,
    startMonth: any
  ): void {
    const newDate = new Date(event);
    startMonth.value = newDate.getMonth() + 1 + '/' + newDate.getFullYear();

    if (type == 'start') {
      this.startMonth = (newDate.getMonth() + 1).toString();
      this.startMonthYear = newDate.getFullYear().toString();
    } else if (type == 'end') {
      this.endMonth = (newDate.getMonth() + 1).toString();
      this.endMonthYear = newDate.getFullYear().toString();
    }

    datePicker.close();
  }

  chooseYearHandler(
    type: string,
    event: any,
    datePicker: any,
    startYear: any
  ): void {
    const newDate = new Date(event);
    startYear.value = newDate.getFullYear();
    this.startYear =
      type == 'start' ? newDate.getFullYear().toString() : this.startYear;
    this.endYear =
      type == 'end' ? newDate.getFullYear().toString() : this.endYear;
    datePicker.close();
  }

  resetChartZoom(): void {
    this.chart?.chart?.resetZoom();
  }

  changeChartType(type: ChartType): void {
    this.chartTypeOption = type;
  }
}
