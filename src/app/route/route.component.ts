import { NodeService } from './../nodeservice';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { Building } from '../models/building';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {
   stops!: any[];
   allStops !: string[];

  constructor(private router: Router, private nodeService: NodeService){

  }

  ngOnInit() {

    this.allStops = history.state.stops as string[];

    const buildingsObserver = {
      next: (data: Building[]) => {
        this.stops = new Array();
        for (let index = 0; index < this.allStops.length; index++) {
          let bld = data.find(i => i.label.toLowerCase() == (this.allStops[index].toLowerCase()))
          if(bld){
            let stop = {
              name: bld.label,
              image: 'https://images.ctfassets.net/mviowpldu823/855fb73053799b60a42a80b18ae145e9/4ae621e4ea552fdf03c13adac5b32b09/STEVENS-knk02-v2-babbio-crop.jpg',
              address: bld.data,
              icon: PrimeIcons.MAP_MARKER,
              color: '#00',
            };
            this.stops.push(stop);
          }
        }
      } ,
      error: (error: any) => console.error(error)
    };
    this.nodeService.getBuildings().subscribe(buildingsObserver);
  }

  saveRoute(){

  }
}
