import { Component, Input, OnInit } from '@angular/core';
import { Building } from '../models/building';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  selectedBuilding !: Building;

  ngOnInit(): void {
    this.selectedBuilding = history.state.building as Building;
    console.log(`selected building ${JSON.stringify(this.selectedBuilding)}`);

  }

}
