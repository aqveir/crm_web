import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../app.global';

@Component({
  selector: 'crmo-backend-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public claim: any;

  constructor(private _globals: Globals) { }

  ngOnInit(): void {
    this.claim = this._globals.getClaim();
  }

}
