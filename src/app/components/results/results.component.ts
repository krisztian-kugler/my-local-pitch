import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component({
  selector: "mlp-results",
  templateUrl: "./results.component.pug",
  styleUrls: ["./results.component.sass"]
})
export class ResultsComponent implements OnDestroy {
  constructor(private dataService: DataService) {}

  mobileDropdownHeight: "0px" | "calc(100vh - 60px)" = "0px";

  public toggleMobileMenu(): void {
    this.mobileDropdownHeight === "0px" ? (this.mobileDropdownHeight = "calc(100vh - 60px)") : (this.mobileDropdownHeight = "0px");
  }

  ngOnDestroy() {
    this.dataService.cachedFilters = null;
  }
}
