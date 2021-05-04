
export interface PrintGeoJSONOption {
    styleHeight: string;
    zoom: number;
    center: google.maps.LatLngLiteral;
}

export const defaultPrintGeoJSONOption: PrintGeoJSONOption = {
    styleHeight: '500px',
    zoom: 5,
    center: {
        lat: 0,
        lng: 0,
    },
};
