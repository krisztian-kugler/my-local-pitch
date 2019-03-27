import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { PitchesComponent } from "./components/results/pitches/pitches.component";
import { SearchComponent } from "./components/search/search.component";
import { ResultsComponent } from "./components/results/results.component";
import { PitchDetailsComponent } from "./components/results/pitch-details/pitch-details.component";
import { PitchItemComponent } from "./components/results/pitches/pitch-item/pitch-item.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { CalendarComponent } from "./components/results/pitch-details/calendar/calendar.component";
import { CalendarDayComponent } from "./components/results/pitch-details/calendar/calendar-day/calendar-day.component";

import { DataService } from "./services/data.service";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PitchesComponent,
    SearchComponent,
    ResultsComponent,
    PitchDetailsComponent,
    PitchItemComponent,
    SpinnerComponent,
    CalendarComponent,
    CalendarDayComponent,
    FooterComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
