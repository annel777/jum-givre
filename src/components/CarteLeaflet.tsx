'use client';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

import { CANNES, type PointCarte } from './carte-types';
import { CONE_POINTE, CONE_TAILLE, COULEUR_A_TESTER, COULEUR_TESTE, coneSvg } from './Cone';

/** Un cornet à la place de l'épingle, sa pointe posée sur l'adresse exacte. */
function icone(teste: boolean) {
  return L.divIcon({
    html: coneSvg(teste ? COULEUR_TESTE : COULEUR_A_TESTER),
    className: 'cone-marqueur',
    iconSize: CONE_TAILLE,
    iconAnchor: CONE_POINTE,
    popupAnchor: [0, -46],
  });
}

export default function CarteLeaflet({
  points,
  attribution,
}: {
  points: PointCarte[];
  attribution: string;
}) {
  // Un seul point : on le centre. Plusieurs : on cadre sur l'ensemble.
  const cadrage =
    points.length > 1
      ? { bounds: L.latLngBounds(points.map((p) => p.coords)), boundsOptions: { padding: [48, 48] as [number, number] } }
      : { center: points[0]?.coords ?? CANNES, zoom: 16 };

  return (
    <MapContainer
      {...cadrage}
      scrollWheelZoom={false}
      zoomControl={false}
      className="leaflet-container"
    >
      {/* L'attribution OpenStreetMap est obligatoire. */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution={attribution} />
      <ZoomControl position="topright" />
      {points.map((p) => (
        <Marker key={p.slug} position={p.coords} icon={icone(p.teste)}>
          <Popup>
            <a className="popup-lien" href={p.href}>
              {p.name}
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
