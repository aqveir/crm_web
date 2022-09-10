import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[tableCellSortable]'
})
export class TableCellSortableDirective {
  @Input() txtLabel: string = 'Label';

  /**
   * Default constructor
   */
  constructor(
    private _elem: ElementRef
  ) { this.fnInitialize(); }


  /**
   * Initialize
   */
  private fnInitialize(): void {
    this._elem.nativeElement.innerHTML = this.txtLabel;
  } //Function ends

} //Class ends
