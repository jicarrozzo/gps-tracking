import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILatLng, Poly } from '@ionic-native/google-maps';
import { Platform, NavController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NavigationExtras } from '@angular/router';

export class Polygon {
	public selected: boolean = false;
	constructor(public name: string, public coords: ILatLng[]) {}
}

@Component({
	selector: 'app-track-list',
	templateUrl: './track-list.page.html',
	styleUrls: [ './track-list.page.scss' ]
})
export class TrackListPage implements OnInit {
	sub: Subscription;
	polygons: Polygon[] = [];
	state: boolean = true;
	position: ILatLng;

	constructor(private platform: Platform, private navCtrl: NavController, private geolocation: Geolocation) {}

	async ngOnInit() {
		this.polygons = [];
		this.polygons.push(
			new Polygon('Hood', [
				{ lat: 55.822448, lng: 37.643534 },
				{ lat: 55.813853, lng: 37.638498 },
				{ lat: 55.809219, lng: 37.657115 },
				{ lat: 55.819472, lng: 37.666516 }
			])
		);

		this.polygons.push(
			new Polygon('Market', [
				{ lat: 55.815818, lng: 37.653166 },
				{ lat: 55.815257, lng: 37.652855 },
				{ lat: 55.815148, lng: 37.653531 },
				{ lat: 55.815785, lng: 37.654246 }
			])
		);

		this.polygons.push(
			new Polygon('Home', [
				{ lat: 55.815729, lng: 37.654333 },
				{ lat: 55.814897, lng: 37.653676 },
				{ lat: 55.81477, lng: 37.654156 },
				{ lat: 55.815575, lng: 37.654864 }
			])
		);
		this.polygons.push(
			new Polygon('Metro VDNKh', [
				{ lat: 55.821186, lng: 37.640923 },
				{ lat: 55.820969, lng: 37.640644 },
				{ lat: 55.820836, lng: 37.641481 },
				{ lat: 55.821216, lng: 37.641878 }
			])
		);
		this.polygons.push(
			new Polygon('Metro 1905', [
				{ lat: 55.764867, lng: 37.561221 },
				{ lat: 55.763437, lng: 37.561044 },
				{ lat: 55.763063, lng: 37.563426 },
				{ lat: 55.764409, lng: 37.56392 }
			])
		);
		this.polygons.push(
			new Polygon('Siberia GYM', [
				{ lat: 55.764536, lng: 37.568029 },
				{ lat: 55.764035, lng: 37.567836 },
				{ lat: 55.763993, lng: 37.569445 },
				{ lat: 55.764569, lng: 37.569536 }
			])
		);

		await this.platform.ready();
		await this.load();
	}

	load() {}

	activate() {
		if (this.state) {
			this.polygons.map((polygon) => {
				polygon.selected = false;
			});
			this.position = null;

			let watch = this.geolocation.watchPosition({ enableHighAccuracy: true });

			this.sub = watch.subscribe(
				(data: Geoposition) => {
					// let poli = this.getPolygon();
					this.position = { lat: data.coords.latitude, lng: data.coords.longitude };

					this.checkPolygons();
					// this.positions.push({
					// 	point: data.coords,
					// 	polygonName: this.polygon,
					// 	polygon: poli,
					// 	inside: Poly.containsLocation(pos, poli)
					// } as PointIsInside);
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

	checkPolygons() {
		this.polygons.map((polygon) => {
			polygon.selected = Poly.containsLocation(this.position, polygon.coords);
		});
	}

	async showPolyOnMap(coords: ILatLng[]) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				point: JSON.stringify(coords[0]),
				polygon: JSON.stringify(coords),
				returnTo: 'track-list'
			}
		};
		this.navCtrl.navigateForward([ 'map-view' ], navigationExtras);
	}
	async showLocationOnMap(coords: ILatLng) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				point: JSON.stringify(coords),
				polygon: '',
				returnTo: 'track-list'
			}
		};
		this.navCtrl.navigateForward([ 'map-view' ], navigationExtras);
	}
}
