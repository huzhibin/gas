import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';


@Component({
  selector: "table-comp",
  templateUrl: "table.component.html",
  // styleUrls: ['table.component.css']
})
export class TableComponent implements OnInit {
  canSelect: boolean;//是否可选择表格行
  rows: any;//表格行数据
  colums: any;//表格列--表头
  


  ngOnInit() {

  }
}
