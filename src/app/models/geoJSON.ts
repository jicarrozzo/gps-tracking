import { Coordinates } from '@ionic-native/geolocation/ngx';

export class Geometry {
	constructor(
		public type: 'Polygon' | 'Point', //| 'LineString' | 'MultiPoint'| 'MultiLineString'| 'MultiPolygon'| 'GeometryCollection';
		public coordinates: [number, number][]
	) {}
}

export interface PointIsInside {
	point: Coordinates;
	inside: boolean;
}
