import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "mlp-pitch-details",
  templateUrl: "./pitch-details.component.pug",
  styleUrls: ["./pitch-details.component.sass"]
})
export class PitchDetailsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {}

  pitch: any;
  sendSinglePitchSubscription: Subscription;

  calendars = {
    start: {
      display: <boolean>false,
      date: new Date()
    },
    end: {
      display: <boolean>false,
      date: new Date()
    }
  };

  public toggleCalendar(calendarType: string) {
    for (let calendar in this.calendars) {
      if (calendar === calendarType) continue;
      this.calendars[calendar].display = false;
    }
    this.calendars[calendarType].display = !this.calendars[calendarType].display;
  }

  public onSubmitDate(calendarType: string, date: Date): void {
    this.calendars[calendarType].date = date;
    this.calendars[calendarType].display = false;
  }

  public backToPitches(): void {
    this.router.navigate(["/pitches"]);
    this.dataService.backFromDetails.next("1");
  }

  public dateFormatter(date: Date): string {
    let month: any = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  }

  public checkAvailability(): void {
    const params = {
      id: this.pitch.id,
      start: {
        type: "starts",
        date: this.dateFormatter(this.calendars.start.date)
      },
      end: {
        type: "ends",
        date: this.dateFormatter(this.calendars.end.date)
      }
    };
    this.dataService.checkAvailability(params).subscribe((response: any) => {
      console.log(response);
    });
  }

  ngOnInit() {
    this.calendars.start.date.setDate(this.calendars.start.date.getDate() + 1);
    this.calendars.end.date.setDate(this.calendars.end.date.getDate() + 2);

    this.sendSinglePitchSubscription = this.dataService.sendSinglePitch.subscribe((pitch: any) => {
      this.pitch = pitch;
    });
  }

  ngOnDestroy(): void {
    if (this.sendSinglePitchSubscription) this.sendSinglePitchSubscription.unsubscribe();
  }
}
