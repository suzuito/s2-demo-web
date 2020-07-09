import * as d3 from 'd3';

export interface S2Vector {
    X: number;
    Y: number;
    Z: number;
}

export interface S2Point extends S2Vector {
}

export interface S2LatLng {
    Lat: number;
    Lng: number;
}

export interface PointAllExpression {
    point: S2Point;
    latlng: S2LatLng;
}

export interface S2Edge {
    V0: S2Point;
    V1: S2Point;
}

export interface EdgeNew {
    edge: S2Edge;
    distanceAsAngle: number;
    distanceAsDegrees: number;
}

export interface CellLiteral {
    id: string;
    geoJson: GeoJSON.Feature;
    center: google.maps.LatLngLiteral;
    level: number;
    approxArea: number;
}

export interface RegionCovererResult {
    Region: Array<google.maps.LatLngLiteral>;
    CellUnion: Array<CellLiteral>;
    Covering: Array<CellLiteral>;
    FastCovering: Array<CellLiteral>;
    InteriorCellUnion: Array<CellLiteral>;
    InteriorCovering: Array<CellLiteral>;
}
