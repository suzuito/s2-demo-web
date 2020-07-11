
export interface MarkerLiteral {
    position: google.maps.LatLngLiteral;
    options: google.maps.MarkerOptions;
}


export interface CircleLiteral {
    center: google.maps.LatLngLiteral;
    radius: number;
    options: google.maps.CircleOptions;
}

export interface PolylineLiteral {
    path: Array<google.maps.LatLngLiteral>;
    options: google.maps.PolygonOptions;
}

export interface EdgeLiteral {
    tail: number;
    head: number;
}

export function newPolylineFromGeoJSONPolygon(o: GeoJSON.Geometry): Array<PolylineLiteral> {
    const ret = [];
    if (o.type !== 'Polygon') {
        throw new Error(`Geometry is not Polygon: ${o.type}`);
    }
    o.coordinates.forEach((coords: Array<GeoJSON.Position>) => {
        const a: PolylineLiteral = {
            path: coords.map(coord => {
                return { lat: coord[1], lng: coord[0] };
            }),
            options: {},
        };
        ret.push(a);
    });
    return ret;
}
