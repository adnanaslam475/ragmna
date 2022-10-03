import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};
  quoteList: any = [];
  unDetailsList: any = [];
  activePage: number = 1;
  itemPerPage: number = 10;
  totalRecords: number = 0;
  isloading: boolean = false;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getDashboard();
    this.getquoteList(1);
  }

  getDashboard() {
    this.isloading = true;
    this.adminService.getDashboardData().subscribe((data: any) => {
      this.isloading = false;
      if (data && data.success) {
        this.dashboardData = data['items'][0];
      }
    });
  }
  getquoteList(currentPage: number) {
    this.isloading = true;
    this.adminService.getAllQuotes().subscribe((data: any) => {
      this.isloading = false;
      if (data && data.success) {
        let oldArray = data['items'];
        this.quoteList = oldArray.map(function (item: any, rank: number) {
          rank = rank + 1;
          return { rank, ...item };
        });
        let perPage = this.itemPerPage * (currentPage - 1);
        this.totalRecords =
          data['items'] != null && data['items'] != undefined
            ? data['items'].length
            : 0;
        this.unDetailsList = this.quoteList;
        this.unDetailsList = this.unDetailsList.filter(
          (x: { rank: number }) =>
            x.rank >= perPage + 1 && x.rank <= perPage + this.itemPerPage
        );
      }
    });
  }
  DisplayActivePage(activePageNumber: number): void {
    this.activePage = activePageNumber;
    this.getConfigList(this.activePage);
  }
  getConfigList(currentPage: number) {
    let perPage = this.itemPerPage * (currentPage - 1);
    this.unDetailsList = this.quoteList.filter(
      (x: { rank: number }) =>
        x.rank >= perPage + 1 && x.rank <= perPage + this.itemPerPage
    );
  }
 
}
