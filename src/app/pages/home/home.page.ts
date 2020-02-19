import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { GoogleMap, ILatLng, Poly } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

export interface PointIsInside {
	point: Coordinates;
	polygon: ILatLng[];
	inside: boolean;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: [ './home.page.scss' ]
})
export class HomePage implements OnInit, OnDestroy {
	map: GoogleMap;

	sub: Subscription;
	polygon: string = 'home';
	polyMarket: ILatLng[]; //Geometry;
	polyDom: ILatLng[]; //Geometry;
	polyBig: ILatLng[]; //Geometry;
	state: boolean = true;
	positions: PointIsInside[] = [];

	constructor(private platform: Platform, private navCtrl: NavController, private geolocation: Geolocation) {}

	async ngOnInit() {
		this.polyBig = [
			{ lat: 55.822448, lng: 37.643534 },
			{ lat: 55.813853, lng: 37.638498 },
			{ lat: 55.809219, lng: 37.657115 },
			{ lat: 55.819472, lng: 37.666516 }
		];
		this.polyMarket = [
			{ lat: 55.815818, lng: 37.653166 },
			{ lat: 55.815257, lng: 37.652855 },
			{ lat: 55.815148, lng: 37.653531 },
			{ lat: 55.815785, lng: 37.654246 }
		];
		this.polyDom = [
			{ lat: 55.815729, lng: 37.654333 },
			{ lat: 55.814897, lng: 37.653676 },
			{ lat: 55.81477, lng: 37.654156 },
			{ lat: 55.815575, lng: 37.654864 }
		];
		await this.platform.ready();
		await this.load();
	}

	ngOnDestroy() {
		if (this.sub != null) this.sub.unsubscribe();
	}

	async load() {}

	activate() {
		if (this.state) {
			this.positions = [];
			let watch = this.geolocation.watchPosition({ enableHighAccuracy: true });

			this.sub = watch.subscribe(
				(data: Geoposition) => {
					let poli = this.getPolygon();
					const pos: ILatLng = { lat: data.coords.latitude, lng: data.coords.longitude };
					this.positions.push({
						point: data.coords,
						polygon: poli,
						inside: Poly.containsLocation(pos, poli)
					} as PointIsInside);
				},
				(error) => {
					console.log(error);
				}
			);
		} else {
			this.sub.unsubscribe();
		}

		this.state = !this.state;
	}
	getPolygon() {
		switch (this.polygon) {
			case 'market':
				return this.polyMarket;
			case 'hood':
				return this.polyBig;
			default:
				return this.polyDom;
		}
	}

	async showmap(p: PointIsInside) {
		const coords: ILatLng = { lat: p.point.latitude, lng: p.point.longitude };
		let navigationExtras: NavigationExtras = {
			queryParams: {
				point: JSON.stringify(coords),
				polygon: JSON.stringify(p.polygon)
			}
		};
		this.navCtrl.navigateForward([ 'map-view' ], navigationExtras);
	}
}
