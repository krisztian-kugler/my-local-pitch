import { Component, OnInit, Input, Output, EventEmitter, HostListener } from "@angular/core";

@Component({
  selector: "mlp-calendar",
  templateUrl: "./calendar.component.pug",
  styleUrls: ["./calendar.component.sass"]
})
export class CalendarComponent implements OnInit {
  constructor() {}

  public today = new Date();

  @Input() public currentYear: number;
  @Input() public currentMonth: number;

  @Output() destroy = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<Date>();

  @HostListener("click", ["$event"]) hostClick = event => {
    event.stopPropagation();
  };

  public selectedDay: number;
  public mode: "start" | "end";
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  public weeksInMonth = [1, 2, 3, 4, 5, 6];
  public dayList: number[] = []; // Contains the list of days to display in a calendar month

  public displayDaysInMonth(year: number, month: number): void {
    // Calculate the number of days in month
    const daysInMonth: number = 32 - new Date(year, month, 32).getDate();

    // Calculate the date of the first day of the month
    const firstDay: number = new Date(year, month, 1).getDay();

    // Fill daysList with the proper numbers
    this.dayList = [];
    for (let i = 0; i < 42; i++) {
      if (firstDay === 0) {
        // If the first day of the month is Sunday
        if (i < 6 || i >= daysInMonth + 6) {
          this.dayList[i] = null;
        } else {
          this.dayList[i] = i - 5;
        }
      } else {
        // If the first day of the month is NOT Sunday
        if (i < firstDay - 1 || i > daysInMonth + firstDay - 2) {
          this.dayList[i] = null;
        } else {
          this.dayList[i] = i - firstDay + 2;
        }
      }
    }
  }

  public nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.selectedDay = undefined;
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
  }

  public prevMonth(): void {
    if (this.currentYear === this.today.getFullYear() && this.currentMonth === this.today.getMonth()) {
      return;
    }
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.selectedDay = undefined;
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
  }

  public submitDate(date: number): void {
    const submitDate = new Date(this.currentYear, this.currentMonth, date);
    this.submit.emit(submitDate);
  }

  ngOnInit() {
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
  }
}
