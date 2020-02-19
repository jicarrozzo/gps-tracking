import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, GoogleMaps, ILatLng, Marker, GoogleMapsAnimation, Polygon } from '@ionic-native/google-maps';

@Component({
	selector: 'app-map-view',
	templateUrl: './map-view.page.html',
	styleUrls: [ './map-view.page.scss' ]
})
export class MapViewPage implements OnInit, OnDestroy {
	map: GoogleMap;
	point: ILatLng;
	polygon: ILatLng[];

	constructor(private platform: Platform, private route: ActivatedRoute, private navCtrl: NavController) {
		this.route.queryParams.subscribe((params) => {
			this.point = JSON.parse(params['point']) as ILatLng;
			this.polygon = JSON.parse(params['polygon']) as ILatLng[];
		});
	}

	async ngOnInit() {
		console.log('ngOnInit');
	}
	async ngOnDestroy() {
		console.log('ngOnDestroy');
	}
	async ngAfterViewInit() {
		await this.platform.ready();
		await this.load(this.point);
		await this.setMarker(this.point);
		await this.setPolygon(this.polygon);
	}

	async load(point: ILatLng) {
		try {
			this.map = GoogleMaps.create('map_canvas', {
				camera: {
					target: {
						lat: point.lat,
						lng: point.lng
					},
					zoom: 15,
					tilt: 30
				}
			});
		} catch (error) {
			console.log(error);
		}
	}
	async setMarker(point: ILatLng) {
		this.map.addMarkerSync({
			title: 'Tracked location',
			snippet: 'This plugin is awesome!',
			position: point,
			animation: GoogleMapsAnimation.BOUNCE
		});
	}

	async setPolygon(poly: ILatLng[]) {
		this.map.addPolygonSync({
			points: poly,
			strokeColor: '#AA00FF',
			fillColor: '#00FFAA',
			strokeWidth: 2
		});
	}

	dismiss() {
		this.navCtrl.navigateBack('home');
	}
}
