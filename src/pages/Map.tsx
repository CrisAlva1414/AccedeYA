import React, { useState } from "react";
import Layout from "@/components/Layout";
import PlaceDetails, { Place } from "@/components/PlaceDetails";
import AccessibilityIcon from "@/components/AccessibilityIcon";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

// Sample offline map data
const places: Place[] = [
  {
    "id": "6",
    "name": "Cesfam San Miguel Sur",
    "accessibilityLevel": "high",
    "description": "Centro de salud con rampas de acceso, ascensor interno y baños adaptados.",
    "imageUrl": "https://images.unsplash.com/photo-1588776814546-ec7bb3b0b913?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r7",
        "userName": "Andrea H.",
        "date": "06/05/2025",
        "text": "Todo el edificio es accesible. El personal también es muy considerado.",
        "rating": 5
      }
    ]
  },
  {
    "id": "7",
    "name": "Plaza Arzobispo Valdivieso",
    "accessibilityLevel": "medium",
    "description": "Espacio verde con acceso desde dos esquinas. Falta pavimentación interior adaptada.",
    "imageUrl": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r8",
        "userName": "Sebastián R.",
        "date": "04/05/2025",
        "text": "Buena entrada, pero difícil de transitar con silla por la gravilla.",
        "rating": 3
      }
    ]
  },
  {
    "id": "8",
    "name": "Biblioteca Pública Pedro Aguirre Cerda",
    "accessibilityLevel": "high",
    "description": "Entrada sin escalones, baño accesible, ascensor al segundo piso.",
    "imageUrl": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r9",
        "userName": "Rocío V.",
        "date": "01/05/2025",
        "text": "Muy acogedora y fácil de acceder. Hasta hay sillas adaptadas.",
        "rating": 5
      }
    ]
  },
  {
    "id": "9",
    "name": "Estación Metro El Llano",
    "accessibilityLevel": "medium",
    "description": "Acceso con ascensor, pero suele estar en mantención. Torniquetes angostos.",
    "imageUrl": "https://images.unsplash.com/photo-1603201667140-b42d5d57f0b6?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r10",
        "userName": "Fernando S.",
        "date": "30/04/2025",
        "text": "Buena si funciona el ascensor, pero si no, es imposible bajar.",
        "rating": 3
      }
    ]
  },
  {
    "id": "10",
    "name": "Multicancha Recreativa PAC",
    "accessibilityLevel": "low",
    "description": "Ingreso por tierra y sin senderos pavimentados. Sin baños ni zonas adaptadas.",
    "imageUrl": "https://images.unsplash.com/photo-1589927986089-35812388d1b2?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r11",
        "userName": "Valentina G.",
        "date": "02/05/2025",
        "text": "No hay acceso para sillas. Todo es pasto y tierra suelta.",
        "rating": 2
      }
    ]
  },
  {
    "id": "11",
    "name": "Centro Cultural PAC",
    "accessibilityLevel": "high",
    "description": "Entrada nivelada, baños adaptados, señalética visual clara.",
    "imageUrl": "https://images.unsplash.com/photo-1611971261269-b92fae054f25?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r12",
        "userName": "Camilo F.",
        "date": "29/04/2025",
        "text": "Excelente espacio, súper inclusivo.",
        "rating": 5
      }
    ]
  },
  {
    "id": "12",
    "name": "Farmacia Comunal",
    "accessibilityLevel": "medium",
    "description": "Cuenta con rampa pero la puerta es angosta. Mostrador alto.",
    "imageUrl": "https://images.unsplash.com/photo-1588776814236-7e0f1c6eabe9?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r13",
        "userName": "Isabel T.",
        "date": "03/05/2025",
        "text": "Puedo entrar, pero necesito ayuda para alcanzar productos o pagar.",
        "rating": 3
      }
    ]
  },
  {
    "id": "13",
    "name": "Junta de Vecinos San Joaquín",
    "accessibilityLevel": "low",
    "description": "Solo escalera en el ingreso, sin baranda ni señalética.",
    "imageUrl": "https://images.unsplash.com/photo-1584899491602-3d097217886d?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r14",
        "userName": "Cristina M.",
        "date": "01/05/2025",
        "text": "Tuve que esperar afuera. No hay forma de subir en silla.",
        "rating": 2
      }
    ]
  },
  {
    "id": "14",
    "name": "Ferretería El Tronco",
    "accessibilityLevel": "none",
    "description": "Escalón alto en la entrada, pasillos estrechos, sin atención prioritaria.",
    "imageUrl": "https://images.unsplash.com/photo-1560180474-e8563fd75bab?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r15",
        "userName": "Gabriel N.",
        "date": "30/04/2025",
        "text": "Nada accesible. Ni siquiera se puede entrar solo.",
        "rating": 1
      }
    ]
  },
  {
    "id": "15",
    "name": "Escuela Básica D-608",
    "accessibilityLevel": "medium",
    "description": "Entrada con rampa pero con pendiente pronunciada. Baños adaptados en primer piso.",
    "imageUrl": "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&h=400&q=80",
    "reviews": [
      {
        "id": "r16",
        "userName": "Marcela Q.",
        "date": "02/05/2025",
        "text": "Pude acceder pero con esfuerzo. Falta un ascensor.",
        "rating": 3
      }
    ]
  }
];

// Actualizar los IDs de los markers para que coincidan con los places
const markers: Array<{ id: string, lat: number, lng: number }> = [
  { id: "6", lat: -33.486901, lng: -70.659897 }, // Cesfam San Miguel Sur
  { id: "7", lat: -33.488245, lng: -70.661234 }, // Plaza Arzobispo Valdivieso
  { id: "8", lat: -33.485678, lng: -70.658123 }, // Biblioteca Pública
  { id: "9", lat: -33.487890, lng: -70.660456 }, // Estación Metro
  { id: "10", lat: -33.484567, lng: -70.657891 }, // Multicancha
  { id: "11", lat: -33.489123, lng: -70.662345 }, // Centro Cultural
  { id: "12", lat: -33.485234, lng: -70.659876 }, // Farmacia Comunal
  { id: "13", lat: -33.488765, lng: -70.661098 }, // Junta de Vecinos
  { id: "14", lat: -33.486543, lng: -70.658765 }, // Ferretería
  { id: "15", lat: -33.487654, lng: -70.660987 }  // Escuela Básica
];

// Crear iconos personalizados según el nivel de accesibilidad
const getMarkerIcon = (accessibilityLevel: string) => {
  const color = {
    high: '#22c55e',    // green-500
    medium: '#eab308',  // yellow-500
    low: '#f97316',     // orange-500
    none: '#ef4444'     // red-500
  }[accessibilityLevel] || '#ef4444';

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 1.886.43 3.766 1.25 5.468l11.25 22.5L23.75 17.968c.82-1.702 1.25-3.582 1.25-5.468C25 5.596 19.404 0 12.5 0z"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  });
};

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  const handleMarkerClick = (id: string) => {
    const place = places.find(p => p.id === id);
    if (place) {
      setSelectedPlace(place);
      setShowDetails(true);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <Layout className="fixed inset-0">
      <div className="absolute inset-0">
        {/* Map container */}
        <div className="absolute inset-0 z-10">
          <MapContainer 
            center={[-33.486901154843515, -70.65989729283065]} 
            zoom={16} 
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
            scrollWheelZoom={true}
            maxBounds={[[-90, -180], [90, 180]]}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            {markers.map(marker => {
              const place = places.find(p => p.id === marker.id);
              if (!place) return null;
              
              return (
                <Marker 
                  key={marker.id} 
                  position={[marker.lat, marker.lng]}
                  icon={getMarkerIcon(place.accessibilityLevel)}
                  eventHandlers={{
                    click: () => handleMarkerClick(marker.id)
                  }}
                  // Ajustar z-index para que esté por encima del mapa pero debajo de los controles
                  zIndexOffset={100}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-medium">{place.name}</p>
                      <p className="text-gray-600">{place.description}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
        
        {/* Legend */}
        {showLegend && (
          <div className="absolute top-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg max-w-xs overflow-hidden">
            <div className="text-sm font-medium mb-2">Niveles de Accesibilidad</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-green-50 p-2 rounded-md">
                <AccessibilityIcon level="high" size="sm" />
                <span className="text-xs text-green-700 font-medium">Alto</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-md">
                <AccessibilityIcon level="medium" size="sm" />
                <span className="text-xs text-yellow-700 font-medium">Medio</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-md">
                <AccessibilityIcon level="low" size="sm" />
                <span className="text-xs text-orange-700 font-medium">Bajo</span>
              </div>
              <div className="flex items-center gap-2 bg-red-50 p-2 rounded-md">
                <AccessibilityIcon level="none" size="sm" />
                <span className="text-xs text-red-700 font-medium">No Accesible</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Controls */}
        <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2 overflow-hidden">
          <button 
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-accede-purple"
            onClick={() => setShowLegend(!showLegend)}
            aria-label="Toggle legend"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v.01" />
              <path d="M12 8v4" />
            </svg>
          </button>
        </div>
        
        {/* Modal */}
        {showDetails && selectedPlace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 overflow-hidden">
            <PlaceDetails place={selectedPlace} onClose={handleCloseDetails} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Map;
