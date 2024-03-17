import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { Location } from '../types/offer';
import 'leaflet/dist/leaflet.css';

const Setting = {
  Layer:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

type UseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  location: Location;
};

function useMap({mapRef, location}: UseMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      const layer = new TileLayer(Setting.Layer, {
        attribution: Setting.Attribution,
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}

export default useMap;
