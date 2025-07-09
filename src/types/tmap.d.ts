declare namespace Tmapv2 {
  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Size {
    constructor(width: number, height: number);
  }

  class Point {
    constructor(x: number, y: number);
  }

  class LatLngBounds {
    constructor();
    extend(latLng: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    width: string;
    height: string;
    zoom: number;
    zoomControl?: boolean;
    scrollwheel?: boolean;
  }

  class Map {
    constructor(elementId: string, options: MapOptions);
    setCenter(latLng: LatLng): void;
    fitBounds(bounds: LatLngBounds): void;
    addListener(event: string, callback: () => void): void;
    removeListener(event: string, callback: () => void): void;
  }

  interface MarkerOptions {
    position?: LatLng;
    icon?: string;
    iconSize?: Size;
    map: Map;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
    addListener(event: string, callback: () => void): void;
  }

  interface InfoWindowOptions {
    position: LatLng;
    content: string;
    border?: string;
    background?: false | string;
    offset?: Point;
    type?: number;
    align?: number;
    visible?: boolean;
    zIndex?: number;
    map: Map | null;
  }

  namespace InfoWindowOptions {
    const TYPE_BALLOON: 1;
    const TYPE_FLAT: 2;
    const ALIGN_LEFTTOP: 11;
    const ALIGN_CENTERTOP: 12;
    const ALIGN_RIGHTTOP: 13;
    const ALIGN_LEFTMIDDLE: 14;
    const ALIGN_CENTERMIDDLE: 15;
    const ALIGN_RIGHTMIDDLE: 16;
    const ALIGN_LEFTBOTTOM: 17;
    const ALIGN_CENTERBOTTOM: 18;
    const ALIGN_RIGHTBOTTOM: 19;
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions);
    setMap(map: Map | null): void;
  }
}

interface Window {
  Tmapv2: typeof Tmapv2;
}
