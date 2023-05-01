import { latLng } from 'leaflet';
import { SavedRoutes } from './../models/saved-routes';
import { Component, OnInit } from '@angular/core';
import { NodeService } from '../nodeservice';
import { Router } from '@angular/router';
import { Building } from '../models/building';

@Component({
  selector: 'app-plan-route',
  templateUrl: './plan-route.component.html',
  styleUrls: ['./plan-route.component.scss']
})
export class PlanRouteComponent implements OnInit{

  start!: string;
  end!: string;
  results!: string[];
  stops: string[] = [];
  allBuildings : Building[] = [];


  constructor(private nodeService: NodeService, private router: Router){
  }

  ngOnInit(): void {
    this.search("");
    this.nodeService.getBuildings().subscribe(
      (results) => {
        this.allBuildings = results;
      }
    )
  }

  search(event: any) {
    const buildingsObserver = {
      next: (data: string[]) => {
        if(event){
          this.results = data.filter(i => i.toLowerCase().includes(event.query.toLowerCase()));
        }
      } ,
      error: (error: any) => console.error(error)
    };
    this.nodeService.getBuildingNames().subscribe(buildingsObserver);
  }

  // handleDropdown(event: any) {
  //     event.query = this.start;
  // }

  addStop() {
    this.stops.push('');
  }

  removeStop(index: number): void {
    this.stops.splice(index, 1);
  }

  addRoute(){
    let allStops = [];
    allStops = [this.start, ...this.stops, this.end];
    let buildings : Building[] = [];

    for (const stop of allStops) {
      let bldg = this.allBuildings.find(i => i.label === stop) as Building;
      buildings.push(bldg);
    }

    let selectedRoute = { userId: "", routeName:"", route : buildings };
    this.router.navigate(['/show-route'], { state: {selectedRoute : selectedRoute}})
  }
}
