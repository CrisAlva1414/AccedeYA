import React, { useState } from "react";
import Layout from "@/components/Layout";
import PlaceDetails, { Place } from "@/components/PlaceDetails";
import AccessibilityIcon from "@/components/AccessibilityIcon";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


// Sample offline map data
const places: Place[] = [
  {
    id: "1",
    name: "Plaza de Armas",
    accessibilityLevel: "high",
    description: "Plaza céntrica con buenas rampas de acceso en todas las esquinas y bancas accesibles.",
    imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400&q=80",
    reviews: [
      {
        id: "r1",
        userName: "María G.",
        date: "12/04/2025",
        text: "Excelente accesibilidad. Las rampas están en buenas condiciones y hay espacios amplios para circular.",
        rating: 5
      },
      {
        id: "r2",
        userName: "Carlos L.",
        date: "28/03/2025",
        text: "Los baños públicos también son accesibles, lo cual es un plus.",
        rating: 4
      }
    ]
  },
  {
    id: "2",
    name: "Estación Central",
    accessibilityLevel: "medium",
    description: "Estación con accesibilidad parcial. Tiene rampas pero algunas están en mal estado.",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&h=400&q=80",
    reviews: [
      {
        id: "r3",
        userName: "Pablo R.",
        date: "05/04/2025",
        text: "Las rampas existen pero algunas tienen una inclinación excesiva. Se necesita ayuda.",
        rating: 3
      }
    ]
  },
  {
    id: "3",
    name: "Universidad Central",
    accessibilityLevel: "low",
    description: "Edificio principal con pocos accesos adaptados. Solo una entrada cuenta con rampa.",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&h=400&q=80",
    reviews: [
      {
        id: "r4",
        userName: "Laura M.",
        date: "01/04/2025",
        text: "Difícil de acceder. Solo hay una rampa en la entrada trasera y está lejos de todo.",
        rating: 2
      }
    ]
  },
  {
    id: "4",
    name: "Centro Comercial Norte",
    accessibilityLevel: "high",
    description: "Centro comercial moderno con excelente accesibilidad en todas las áreas.",
    imageUrl: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=600&h=400&q=80",
    reviews: [
      {
        id: "r5",
        userName: "Elena P.",
        date: "10/04/2025",
        text: "Muy buena accesibilidad. Ascensores amplios y baños adaptados en todos los pisos.",
        rating: 5
      }
    ]
  },
  {
    id: "5",
    name: "Parque Municipal",
    accessibilityLevel: "none",
    description: "Parque sin accesos adaptados. Solo escaleras para entrar y terreno irregular.",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&h=400&q=80",
    reviews: [
      {
        id: "r6",
        userName: "Ricardo J.",
        date: "15/03/2025",
        text: "Imposible acceder con silla de ruedas. Solo hay escaleras y caminos de tierra.",
        rating: 1
      }
    ]
  },
];

// Marker positions for the demo map (percentages of map width/height)
const markers: Array<{ id: string, x: number, y: number }> = [
  { id: "1", x: 49, y: 45 },
  { id: "2", x: 22, y: 30 },
  { id: "3", x: 75, y: 60 },
  { id: "4", x: 35, y: 70 },
  { id: "5", x: 65, y: 25 },
];

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
    <Layout className="h-screen w-screen overflow-hidden m-0 p-0">
      <div className="relative w-full h-full m-0 p-0 overflow-hidden">
        {/* Map container con z-index bajo */}
        <div className="absolute inset-0 m-0 p-0 z-0 h-full w-full overflow-hidden">
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
              
              // Calcular la posición real basada en los porcentajes x,y
              const lat = -33.45 + (marker.y - 50) * 0.001; // ajusta el factor 0.001 según necesites
              const lng = -70.654 + (marker.x - 50) * 0.001;
              
              return (
                <Marker key={marker.id} position={[lat, lng]}>
                  <Popup>{place.name}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
        
        {/* Map Legend con z-index más alto */}
        {showLegend && (
          <div className="absolute top-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg max-w-xs overflow-hidden">
            <div className="text-sm font-medium mb-2">Niveles de Accesibilidad</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AccessibilityIcon level="high" size="sm" />
                <span className="text-xs">Alto</span>
              </div>
              <div className="flex items-center gap-2">
                <AccessibilityIcon level="medium" size="sm" />
                <span className="text-xs">Medio</span>
              </div>
              <div className="flex items-center gap-2">
                <AccessibilityIcon level="low" size="sm" />
                <span className="text-xs">Bajo</span>
              </div>
              <div className="flex items-center gap-2">
                <AccessibilityIcon level="none" size="sm" />
                <span className="text-xs">No Accesible</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Floating map controls con z-index igual al legend */}
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
        
        {/* Modal con z-index más alto que todos */}
        {showDetails && selectedPlace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 overflow-hidden">
            <PlaceDetails place={selectedPlace} onClose={handleCloseDetails} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Map;
