import { Building } from './../models/building';
import { TreeNode } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SavedRoutes } from '../models/saved-routes';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  savedRoutes$ !: Observable<SavedRoutes[]>
  routesTree !: TreeNode<any>[];

  constructor( private db: AngularFireDatabase, private router : Router){

  }

  ngOnInit(): void {

    this.savedRoutes$ = this.db.list<SavedRoutes>('SavedRoutes').valueChanges();

    // this.savedRoutes$.subscribe( (result) => {
    //   console.log(result);
    //   this.routesTree = result.map(i => i.routeName) as TreeNode<any>[];
    // });

  }

  showRoute(selectedRoute : SavedRoutes){
    console.log(selectedRoute);
    // let allStops = [];
    this.router.navigate(['/show-route'], { state: {selectedRoute : selectedRoute}})
  }

  removeRoute(routeToDelete : SavedRoutes){
    // const savedRouteRef = this.db.list('SavedRoute');
    // savedRouteRef.remove('');
  }
}
