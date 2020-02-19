import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap, GoogleMaps } from '@ionic-native/google-maps';
import { Platform, ModalController } from '@ionic/angular';

@Component({
	selector: 'app-modal-map',
	templateUrl: './modal-map.page.html',
	styleUrls: [ './modal-map.page.scss' ]
})
export class ModalMapPage implements OnInit {
	//@ViewChild('map_canvas') map_canvas: ElementRef;
	map: GoogleMap;

	constructor(private platform: Platform, private modalController: ModalController) {}

	async ngOnInit() {
		// await this.platform.ready();
		// await this.load();
	}
	async ngAfterViewInit() {
		//Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
		//Add 'implements AfterViewInit' to the class.
		await this.platform.ready();
		await this.load();
	}

	async load() {
		const a = document.getElementById('map_canvas');
		console.log(a);

		this.map = GoogleMaps.create(
			'map_canvas',
			{
				// gestures: {
				// 	scroll: false,
				// 	tilt: false,
				// 	rotate: false,
				// 	zoom: false
				// },
				// camera: {
				// 	target: {
				// 		lat: 43.0741704,
				// 		lng: -89.3809802
				// 	},
				// 	zoom: 18,
				// 	tilt: 30
				// }
			}
		);
	}

	dismiss() {
		this.modalController.dismiss();
	}
}
