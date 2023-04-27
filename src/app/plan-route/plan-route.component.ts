import { Component, OnInit } from '@angular/core';
import { NodeService } from '../nodeservice';
import { Router } from '@angular/router';

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


  constructor(private nodeService: NodeService, private router: Router){
  }

  ngOnInit(): void {
    this.search("");
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
    this.router.navigate(['/routetest'], { state: {stops : allStops}})
  }
}
