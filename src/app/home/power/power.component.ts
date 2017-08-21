import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceList } from "../data/resource";

@Component({
  templateUrl: 'power.component.html'
})
export class PowerComponent implements OnInit {

  resourceList: any;
  ngOnInit(): void {
    this.resourceList = ResourceList;
  }
}
