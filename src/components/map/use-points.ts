// export function usePoints() {

//   useEffect(() => {
//     if (map) {
//       offers.forEach((offer) => {
//         const marker = new Marker({
//           lat: offer.location.latitude,
//           lng: offer.location.longitude,
//         });

//         marker
//           .setIcon(
//             offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon
//           )
//           .addTo(markerLayer);
//       });
//     }
//   }, [map, offers, activeOfferId, city, markerLayer]);
// }
