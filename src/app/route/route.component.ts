import { SavedRoutes } from './../models/saved-routes';
import { NodeService } from './../nodeservice';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { Building } from '../models/building';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {
   stops!: any[];
   allStops !: string[];
   routeName = "";
   showMessage = false;
   routeSavedMessage = "Your route was saved";
   routeExistMessage = "Route exists, please change the route name to save."
   saveMessage = "";
   savedRoute !: SavedRoutes;
   newRoute = true;

  constructor(private router: Router, private nodeService: NodeService, private db: AngularFireDatabase){

  }

  ngOnInit() {

    this.savedRoute = history.state.selectedRoute as SavedRoutes;
    //console.log(this.savedRoute);
    this.allStops = this.savedRoute.route;
    //console.log(this.allStops);

    this.newRoute = true;
    this.routeName = this.allStops.join(' - ');
    if(this.savedRoute.routeName){
      this.newRoute = false;
      this.routeName = this.savedRoute.routeName;
    }

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

  resetMessage(){

    setTimeout(() => {
      this.showMessage = false;
      this.saveMessage = "";
     }, 2000)
  }

  saveRoute(){
    this.resetMessage();
    const userId = localStorage.getItem("userId");
    if(!userId){
      console.log("You have to login to save route");
      return;
    }


    //if route exist then return
    this.db.list<SavedRoutes>('SavedRoutes').valueChanges().subscribe(
      (result) => {
        if(result.filter(i => (i.userId === userId && i.routeName === this.routeName)).length > 0){
          console.log(`found ${this.routeName}`);
          this.saveMessage = this.routeExistMessage;
          this.showMessage = true;
          this.resetMessage();
          return;
        }
        console.log(`not found ${this.routeName}`);
        var buildingRef = this.db.list('SavedRoutes').push({
          userId: userId,
          routeName: this.routeName,
          route: this.allStops
        })

        this.saveMessage = this.routeSavedMessage;
        this.showMessage = true;
        this.resetMessage();
      }
    );

  }
}
