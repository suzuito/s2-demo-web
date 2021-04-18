
export interface GoogleMapDLStyle {
    rule: (f: google.maps.Data.Feature) => google.maps.Data.StyleOptions;
}

export enum AvailableGoogleMapDLStyle {
    Map1 = 'map1'
}

export function newGoogleMapDLStyle(t: string): GoogleMapDLStyle {
    switch (t) {
        case AvailableGoogleMapDLStyle.Map1 as string:
            return dataLayerStyle1;
    }
    throw new Error(`Invalid style : ${t}`);
}

const dataLayerStyle1: GoogleMapDLStyle = {
    rule: (f: google.maps.Data.Feature): google.maps.Data.StyleOptions => {
        const text = f.getProperty('text');
        return {
            title: text ? text : undefined,
        };
    },
};
