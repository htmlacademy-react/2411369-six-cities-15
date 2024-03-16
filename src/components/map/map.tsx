import { Icon, Marker, layerGroup } from 'leaflet';
import { Offer } from '../../types/offer';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';

type MapProps = {
  offers: Offer[];
  activeOfferId?: null | string;
  place?: 'cities' | 'offer';
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({
  offers,
  activeOfferId,
  place = 'cities',
}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const location = offers[0].city.location;
  const map = useMap({ mapRef, location });
  const layer = useRef(layerGroup());

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            offer.id === activeOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(layer.current);
      });

      const currentLayer = layer.current;
      return () => {
        currentLayer.clearLayers();
      };
    }
  }, [map, offers, activeOfferId]);

  useEffect(() => {
    if (map) {
      layer.current.addTo(map);
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [location, map]);

  return <section className={`${place}__map map`} ref={mapRef}></section>;
}

export default Map;
