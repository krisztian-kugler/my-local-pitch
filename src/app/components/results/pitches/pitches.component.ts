import { Component, OnInit, OnDestroy, HostBinding, ElementRef } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "mlp-pitches",
  templateUrl: "./pitches.component.pug",
  styleUrls: ["./pitches.component.sass"]
})
export class PitchesComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService, private element: ElementRef) {}

  public info: string = "";
  public loadingContent: boolean = true;
  public loadingFilters: boolean = false;
  public pitches: any = [];
  public filters: any = [];

  private paging = {
    prev: <string>null,
    next: <string>null
  };

  private pitchesSubscription: Subscription;
  private filteredPitchesSubscription: Subscription;
  private contentLoaderSubscription: Subscription;
  private backFromDetailsSubscription: Subscription;

  public turnPage(direction: "prev" | "next"): void {
    if (!this.paging[direction]) return;
    this.loadingFilters = true;
    this.dataService.loadPage(this.paging[direction]).subscribe((response: any) => {
      this.dataService.sendFilteredPitches.next(response);
      this.element.nativeElement.scrollTop = 0;
    });
  }

  public toggleFilter(i: number, j: number): void {
    this.filters[i].options[j].checked = !this.filters[i].options[j].checked;

    const params: any = [];
    this.filters.forEach(filter => {
      let filterValue: string = "";
      let type: string;
      filter.options.forEach(option => {
        if (option.checked) {
          if (!filterValue) {
            filterValue += `${option.key}`;
            type = option.type;
          } else {
            filterValue += `,${option.key}`;
          }
        }
      });
      if (type) {
        params.push({ id: filterValue, type });
      }
    });

    this.info = "Applying filters...";
    this.loadingFilters = true;
    this.dataService.cachedFilters = this.filters;
    this.dataService.cachedFilterParams = params;
    this.dataService.getPitches(...params).subscribe((response: any) => {
      this.dataService.sendFilteredPitches.next(response);
      this.element.nativeElement.scrollTop = 0;
    });
  }

  private dataFormatter(obj: Object): Array<any> {
    const arr: Array<any> = [];
    for (let key in obj) {
      if (key === "formats" || key === "surfaces" || key === "facilities") {
        const options: Array<any> = obj[key];
        options.forEach(option => {
          switch (key) {
            case "formats":
              option.type = "format";
              break;
            case "surfaces":
              option.type = "surface";
              break;
            case "facilities":
              option.type = "facilities";
          }
          option.id = option.key;
          option.checked = <boolean>false;
        });
        arr.push({ name: key.charAt(0).toUpperCase() + key.slice(1), options });
      }
    }
    return arr;
  }

  private setPageLinks(response: any): void {
    response.links.prev ? (this.paging.prev = response.links.prev) : (this.paging.prev = null);
    response.links.next ? (this.paging.next = response.links.next) : (this.paging.next = null);
    console.log(this.paging.prev, this.paging.next);
  }

  ngOnInit() {
    this.pitchesSubscription = this.dataService.sendPitches.subscribe((response: any) => {
      console.log(response);
      if (this.dataService.cachedFilters) {
        this.filters = this.dataService.cachedFilters;
      } else {
        this.filters = this.dataFormatter(response.meta.aggregations);
        this.dataService.cachedFilters = this.filters;
      }
      this.pitches = response.data;
      this.info = `We have found ${response.meta.total_items} venue(s) on ${response.meta.total_pages} page(s).`;
      this.setPageLinks(response);
      this.loadingContent = false;
    });
    this.filteredPitchesSubscription = this.dataService.sendFilteredPitches.subscribe((response: any) => {
      console.log(response);
      this.pitches = response.data;
      this.info = `We have found ${response.meta.total_items} venue(s) on ${response.meta.total_pages} page(s).`;
      this.setPageLinks(response);
      this.loadingFilters = false;
    });
    this.contentLoaderSubscription = this.dataService.loadingContent.subscribe(() => {
      this.loadingContent = true;
    });
    this.backFromDetailsSubscription = this.dataService.backFromDetails.subscribe((response: any) => {
      if (!response) return;
      this.filters = this.dataService.cachedFilters;
      this.dataService.getPitches(...this.dataService.cachedFilterParams).subscribe((response: any) => {
        this.pitches = response.data;
        this.info = `We have found ${response.meta.total_items} venue(s) on ${response.meta.total_pages} page(s).`;
        this.setPageLinks(response);
        this.loadingContent = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.pitchesSubscription) this.pitchesSubscription.unsubscribe();
    if (this.filteredPitchesSubscription) this.pitchesSubscription.unsubscribe();
    if (this.contentLoaderSubscription) this.contentLoaderSubscription.unsubscribe();
    if (this.backFromDetailsSubscription) this.backFromDetailsSubscription.unsubscribe();
  }
}
