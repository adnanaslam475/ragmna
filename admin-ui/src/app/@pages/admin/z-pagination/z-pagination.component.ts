import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-z-pagination',
  templateUrl: './z-pagination.component.html',
  styleUrls: ['./z-pagination.component.css']
})
export class ZPaginationComponent implements OnInit {

  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];
  activePage: number = 1;

  ngOnInit(): void {}
  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.onPageChange.emit(1);
  }

  private getPageCount(): number {
   
    let totalPage = 0;
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);
      totalPage =
        roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];
    if (pageCount > 0) {
      let _pageCount = pageCount;
      let _loopStart = 1;
      if (this.activePage == undefined || this.activePage < 7) {
        if (pageCount > 7) {
          _pageCount = 7;
        } else {
          _pageCount = pageCount;
        }
      } else {
        _loopStart = this.activePage - 3;
        _pageCount =
          this.activePage + 3 <= pageCount ? this.activePage + 3 : pageCount;
      }

      this.pages = [];
      for (let i = _loopStart; i <= _pageCount; i++) {
        // if(pageCount>7)
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    let pageCount = this.getPageCount();

    if (pageNumber >= 1 && pageNumber <= pageCount) {
      this.activePage = pageNumber;

      this.onPageChange.emit(this.activePage);
      this.pages = this.getArrayOfPage(pageCount);
    }
  }

}
