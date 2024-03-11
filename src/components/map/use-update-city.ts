// import { useEffect, useRef } from "react";
// import { City } from "../../types/offer";
// import { Map, layerGroup } from "leaflet";

// export function useUpdateCity(map: Map | null, city: City) {
//   const prevCity = useRef<City>(city);

//   const markerLayer = useRef(layerGroup());

//   useEffect(() => {
//     if (!map) {
//       return;
//     }
//     markerLayer.current.addTo(map);

//     if (prevCity.current.name !== city.name) {
//       map.panTo([city.location.latitude, city.location.longitude]);
//       markerLayer.current.clearLayers();
//       prevCity.current = city;
//     }


//   }, [city, map]);

//   return markerLayer.current;
// }
