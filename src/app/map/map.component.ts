import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { latLng, LatLng, marker, tileLayer, MarkerOptions } from 'leaflet';
import { Building } from '../models/building';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  @Input() selectedBuilding !: Building;

	optionsSpec: any = {
		layers: [{ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
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

  layers = [
    marker([ 40.74488695175566, -74.02565024899728 ]
      , {
        title:"Stevens Institute of Technology"
      } )
  ];

  ngOnInit(): void {
    this.layers = this.defaultLayer();

    if(this.selectedBuilding){
      let lat = this.selectedBuilding.latLng[0];
      let lang = this.selectedBuilding.latLng[1];
      this.center = latLng(lat, lang);
      this.layers =
      [
        marker( [lat, lang]
          , {
            title: this.selectedBuilding.label
          } )
      ]
    }
  }

  defaultLayer(){
    return [
      marker([ 40.74488695175566, -74.02565024899728 ]
        , {
          title:"Stevens Institute of Technology"
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
