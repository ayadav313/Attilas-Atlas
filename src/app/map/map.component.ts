import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { latLng, LatLng, marker, tileLayer, MarkerOptions } from 'leaflet';
import { Building } from '../models/building';
import * as L from 'leaflet'; // import the L object from the leaflet library


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  @Input() selectedBuildings !: Building[]; 
  @Input() className = "homeMap";

	optionsSpec: any = {
		layers: [{ url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
		zoom: 40,
		center: [ 40.7439905, -74.0274740 ]
	};

	// Leaflet bindings
	zoom = this.optionsSpec.zoom;
	center = latLng(this.optionsSpec.center);
	options = {
		layers: [ tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution }) ],
		zoom: this.optionsSpec.zoom,
		center: latLng(this.optionsSpec.center)
	};

	// Form bindings
	formZoom = this.zoom;
	zoomLevels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ];
	lat = this.center.lat;
	lng = this.center.lng;

  layers = this.defaultLayer();

  ngOnInit(): void {
    this.layers = this.defaultLayer();

    if(this.selectedBuildings){
      this.layers = [];
      for (const selectedBuilding of this.selectedBuildings) {
        if(this.selectedBuildings){
          let lat = selectedBuilding?.latLng[0] ;
          let lang = selectedBuilding?.latLng[1] ;

          this.layers.push(
            marker( [lat, lang]
              , {
                title: selectedBuilding.label,
				icon: L.icon({ iconUrl: '/assets/marker-icon.png' })
              } ))

        }
      }
      this.center = latLng(this.selectedBuildings[0].latLng[0], this.selectedBuildings[0].latLng[1]);
    }


  }

  defaultLayer(){
    return [
      marker([ 40.745027414562415, -74.02567552690417 ]
        , {
          title:"Stevens Institute of Technology",
		  icon: L.icon({ iconUrl: '/assets/marker-icon.png' })
        } )
    ];
  }

	// Output binding for center
	onCenterChange(center: LatLng) {
		setTimeout(() => {
			this.lat = center.lat;
			this.lng = center.lng;
		});
	}

	onZoomChange(zoom: number) {
		setTimeout(() => {
			this.formZoom = zoom;
		});
	}

	doApply() {
		this.center = latLng(this.lat, this.lng);
		this.zoom = this.formZoom;
	}
}
