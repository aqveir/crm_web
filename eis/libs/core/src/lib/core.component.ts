import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'core',
  template: `
    <p>
      Core component that contains all the core and common services, compoenents, directives, pipes and configurations !
    </p>
  `,
  styles: [
  ]
})
export class CoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
