
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
    edge: S2Edge,
    distanceAsAngle: number;
    distanceAsDegrees: number;
}
