import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crmo-backend-work-queue',
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss']
})
export class WorkQueueComponent implements OnInit {

  public objEvents: number[] = [1,2,3,4,5,6,7,8,9,]

  constructor() { }

  ngOnInit(): void {
  }

}
