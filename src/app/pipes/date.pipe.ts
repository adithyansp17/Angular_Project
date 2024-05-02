import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-formatting',
  template: `
    <p>Original Date: {{ originalDate }}</p>
    <p>Formatted Date: {{ formattedDate }}</p>
  `
})
export class DateFormattingComponent {
  originalDate = new Date("2024-04-30T12:55:06.370Z");
  formattedDate: string;

  constructor(private datePipe: DatePipe) {
    // Format the date in the desired format (YYYY-MM-DD)
    this.formattedDate = this.datePipe.transform(this.originalDate, 'yyyy-MM-dd')!;
  }
}
