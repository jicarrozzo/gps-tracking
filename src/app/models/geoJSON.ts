export class Geometry {
	constructor(
		public type: 'Polygon' | 'Point', //| 'LineString' | 'MultiPoint'| 'MultiLineString'| 'MultiPolygon'| 'GeometryCollection';
		public coordinates: [number, number][]
	) {}
}
