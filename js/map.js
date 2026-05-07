// ── CARTE LEAFLET ──
const map = L.map('map', {
  center: [48.8937, 2.3939],
  zoom: 16,
  zoomControl: true,
});

// Tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fonction pour créer un marqueur custom
function createMarker(color) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 16px;
      height: 16px;
      background: ${color};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 10px ${color};
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

// Marqueurs des scènes
L.marker([48.8940, 2.3925], { icon: createMarker('#FF2D78') })
  .addTo(map)
  .bindPopup('<b>🎤 Scène Principale</b><br/>Capacité : 8 000 personnes<br/>Têtes d\'affiche');

L.marker([48.8930, 2.3950], { icon: createMarker('#C8FF00') })
  .addTo(map)
  .bindPopup('<b>🎧 Scène Électro</b><br/>Capacité : 4 000 personnes<br/>Sets DJ & électronique');

L.marker([48.8945, 2.3960], { icon: createMarker('#00F0FF') })
  .addTo(map)
  .bindPopup('<b>🌟 Scène Découverte</b><br/>Capacité : 1 500 personnes<br/>Artistes émergents');

L.marker([48.8920, 2.3935], { icon: createMarker('#FF7000') })
  .addTo(map)
  .bindPopup('<b>🍔 Zone Food & Bar</b><br/>Restauration & boissons<br/>Ouvert 12h-3h');