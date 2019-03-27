import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PitchesComponent } from "./components/results/pitches/pitches.component";
import { ResultsComponent } from "./components/results/results.component";
import { PitchDetailsComponent } from "./components/results/pitch-details/pitch-details.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "pitches",
    component: ResultsComponent,
    children: [
      {
        path: "",
        component: PitchesComponent
      },
      {
        path: ":id",
        component: PitchDetailsComponent
      }
    ]
  },
  { path: "", component: HomeComponent, pathMatch: "full" }
  //{ path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
