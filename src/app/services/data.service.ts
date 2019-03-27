import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public loadingContent = new Subject();
  public sendPitches = new Subject<any>();
  public sendFilteredPitches = new Subject<any>();
  public backFromDetails = new BehaviorSubject<any>(null);
  public selectedSportAndCity = new BehaviorSubject<Object>(null);
  public sendSinglePitch = new BehaviorSubject<Object>(null);
  public cachedSportAndCity;
  public cachedFilters;
  public cachedFilterParams;

  private baseURL: string = "https://api-v2.mylp.info";

  public getSportsAndCities(): Observable<Object> {
    return this.http.get("assets/data.json");
  }

  public getPitches(...params): Observable<Object> {
    if (this.cachedSportAndCity) {
      params = this.concatParams(params);
    }
    const url = this.generateRequestURL(this.baseURL, params);
    return this.http.get(url);
  }

  public checkAvailability(params): Observable<Object> {
    const url = `${this.baseURL}/pitches/${params.id}/slots?filter[${params.start.type}]=${params.start.date}&filter[${params.end.type}]=${params.end.date}`;
    return this.http.get(url);
  }

  public loadPage(pageURL: string): Observable<Object> {
    const url = `${this.baseURL}${pageURL}`;
    return this.http.get(url);
  }

  private concatParams(filters): Array<any> {
    const cached = [];
    for (let data in this.cachedSportAndCity) {
      cached.push(this.cachedSportAndCity[data]);
    }
    return [...cached, ...filters];
  }

  // Build valid request URL from provided parameters
  private generateRequestURL(url: string, params: Array<any>): string {
    params.forEach((param, i) => {
      i === 0 ? (url += `/pitches?filter[${param.type}]=${encodeURI(param.id)}`) : (url += `&filter[${param.type}]=${encodeURI(param.id)}`);
    });
    return url;
  }
}
