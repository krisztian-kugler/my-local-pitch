import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "mlp-search",
  templateUrl: "./search.component.pug",
  styleUrls: ["./search.component.sass"]
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private dataService: DataService) {}

  public sports: Sport[];
  public cities: City[];

  public selected = {
    sport: <Sport>null,
    city: <City>null
  };

  public dropdowns = {
    sports: <boolean>false,
    cities: <boolean>false
  };

  public invalid = {
    sport: <boolean>false,
    city: <boolean>false
  };

  private selectedSportAndCity: Subscription;

  public toggleMenu(menu: string): void {
    for (let dropdown in this.dropdowns) {
      dropdown === menu ? (this.dropdowns[dropdown] = !this.dropdowns[dropdown]) : (this.dropdowns[dropdown] = false);
    }
  }

  public selectItem(item: Sport | City, menu: string): void {
    this.selected[item.type] = item;
    this.toggleMenu(menu);
  }

  public submit(): void {
    let valid = true;
    this.dataService.cachedFilters = null;
    this.dataService.cachedSportAndCity = this.selected;
    this.dataService.selectedSportAndCity.next(this.selected);
    for (let input in this.selected) {
      this.invalid[input] = false;
      if (!this.selected[input]) {
        this.invalid[input] = true;
        valid = false;
      }
    }
    if (!valid) return;
    this.router.navigate(["/pitches"]);
    this.dataService.loadingContent.next();
    this.dataService.getPitches(this.selected.sport, this.selected.city).subscribe((response: any) => {
      this.dataService.sendPitches.next(response);
    });
  }

  ngOnInit() {
    this.dataService.getSportsAndCities().subscribe((data: { sports: Sport[]; cities: City[] }) => {
      this.sports = data.sports;
      this.cities = data.cities;
    });
    this.selectedSportAndCity = this.dataService.selectedSportAndCity.subscribe((response: any) => {
      if (response) {
        this.selected = response;
      } else {
        return;
      }
    });
  }

  ngOnDestroy() {
    if (this.selectedSportAndCity) this.selectedSportAndCity.unsubscribe();
  }
}
