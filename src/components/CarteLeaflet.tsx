'use client';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { CANNES, type PointCarte } from './carte-types';
import { COULEUR_A_TESTER, COULEUR_TESTE, coneSvg } from './Cone';

/** Un cornet à la place de l'épingle, sa pointe posée sur l'adresse exacte. */
function icone(teste: boolean) {
  return L.divIcon({
    html: coneSvg(teste ? COULEUR_TESTE : COULEUR_A_TESTER),
    className: 'cone-marqueur',
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -40],
  });
}

export default function CarteLeaflet({
  points,
  attribution,
}: {
  points: PointCarte[];
  attribution: string;
}) {
  const centre = points.length > 0 ? points[0].coords : CANNES;

  return (
    <MapContainer center={centre} zoom={15} scrollWheelZoom={false} className="leaflet-container">
      {/* L'attribution OpenStreetMap est obligatoire. */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={attribution}
      />
      {points.map((p) => (
        <Marker key={p.slug} position={p.coords} icon={icone(p.teste)}>
          <Popup>
            <a href={p.href}>{p.name}</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
