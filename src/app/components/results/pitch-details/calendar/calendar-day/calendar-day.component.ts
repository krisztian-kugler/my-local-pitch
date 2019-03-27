import { Component, OnInit, Input, HostBinding, HostListener, AfterContentChecked } from "@angular/core";

@Component({
  selector: "mlp-calendar-day",
  template: "{{ content }}",
  styleUrls: ["./calendar-day.component.sass"]
})
export class CalendarDayComponent implements AfterContentChecked {
  constructor() {}

  @Input() content: number;
  @Input() currentDate: { currentYear: number; currentMonth: number };
  @HostBinding("class.disabled") disabled = false;

  @HostListener("click", ["$event"]) hostClick = event => {
    event.stopPropagation();
  };

  private disablePastDays(): void {
    const today = new Date();
    if (this.currentDate.currentYear === today.getFullYear() && this.currentDate.currentMonth === today.getMonth() && this.content <= today.getDate()) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  ngAfterContentChecked(): void {
    this.disablePastDays();
  }
}
