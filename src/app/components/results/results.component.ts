import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component({
  selector: "mlp-results",
  templateUrl: "./results.component.pug",
  styleUrls: ["./results.component.sass"]
})
export class ResultsComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.dataService.cachedFilters = null;
  }
}
