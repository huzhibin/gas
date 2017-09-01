import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "pagination-comp",
  template: `<div class="form-group row">
              <label class="col-md-3 form-control-label" for="select">              
                共{{ totalItems }}行,每页
                <select #pageSize [ngModel]="itemsPerPage" (ngModelChange)="sizeChanged(pageSize.value)" class="form-control form-control-sm pagination">
                  <option *ngFor="let pageSize of pageSizes" [value]="pageSize">{{ pageSize }}</option>
                </select>行            
              </label>
              <div class="col-md-9">
                <pagination [boundaryLinks]="true" (pageChanged)=pageChanged($event) [totalItems]="totalItems" [itemsPerPage]="itemsPerPage" [(ngModel)]="currentPage" class="pagination-md pull-right" [maxSize]="maxSize"
                  [rotate]="false" previousText="&lsaquo;" nextText="&rsaquo;" firstText="&laquo;" lastText="&raquo;"></pagination>
              </div>
            </div>`,
  styles: [
    `select.pagination {
      width: 4rem;
      display: inline-block;
    }`
  ]
})
export class PaginationComponent {
  @Input() currentPage;//当前页号
  @Input() totalItems;//总行数
  @Input() itemsPerPage;//默认分页大小
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();//当前页号变化
  @Output() changeSize: EventEmitter<number> = new EventEmitter<number>();//分页大小改变
  private pageSizes = [1,5, 10, 20, 30, 50];
  private maxSize = 5;//显示的分页链接数目

  pageChanged(event: any) {
    console.log('页号改变，当前页号:' + JSON.stringify(event));
    this.changePage.emit(event);
  }
  sizeChanged(event: any) {
    console.log('分页大小改变，当前大小:' + JSON.stringify(event));
    this.itemsPerPage = event;
    this.changeSize.emit(event);
  }
}
