import { Component, Input, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "mlp-pitch-item",
  templateUrl: "./pitch-item.component.pug",
  styleUrls: ["./pitch-item.component.sass"]
})
export class PitchItemComponent {
  constructor(private router: Router, private dataService: DataService) {}

  @Input() pitch: any;

  @HostListener("click") hostClick(): void {
    this.dataService.sendSinglePitch.next(this.pitch);
    this.router.navigate([`pitches/${this.pitch.id}`]);
  }
}
