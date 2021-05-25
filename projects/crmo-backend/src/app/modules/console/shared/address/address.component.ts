import { Component, OnInit, Input } from '@angular/core';
import { IAddress } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

@Input()address: IAddress;
  constructor() { }

  ngOnInit(): void {
  }

}
