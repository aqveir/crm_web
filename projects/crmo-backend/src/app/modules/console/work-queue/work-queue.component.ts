import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crmo-backend-work-queue',
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss']
})
export class WorkQueueComponent implements OnInit {

  public objQueueData: any = {
    'requests': [],
    'task_events': [
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}}
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
