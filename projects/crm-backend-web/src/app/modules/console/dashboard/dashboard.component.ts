import { Component, OnInit } from '@angular/core';
import { EventBrokerService } from 'common-lib';
import { Globals } from '../../../app.global';

@Component({
  selector: 'crmo-backend-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public claim: any;

  constructor(
    private _globals: Globals,
    private _broker: EventBrokerService,
  ) { }

  ngOnInit(): void {
    this.claim = this._globals.getClaim();
  }


  public fnShowModal(name: string): void {
    switch (name) {
      case 'show_note_modal':
        this._broker.emit(name, ['entity_type_contact', 5, null]);
        break;

      case 'show_document_modal':
        this._broker.emit(name, ['entity_type_contact', 5]);
        break;
    
      default:
        break;
    }
  }

}
