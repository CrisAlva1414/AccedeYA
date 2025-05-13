import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import AccessibilityIcon from "@/components/AccessibilityIcon";
import type { Place } from "@/components/PlaceDetails";

// Sample data for places
const places: Place[] = [
  {
    id: "1",
    name: "Plaza de Armas",
    accessibilityLevel: "high",
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

const Reviews = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const place = places.find(p => p.id === placeId);
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!place) {
    return (
      <Layout>
        <div className="p-4 text-center">
          <p className="text-lg">Este lugar no fue encontrado.</p>
          <Button 
            variant="link" 
            onClick={() => navigate("/map")}
            className="mt-4"
          >
            Volver al mapa
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleRatingChange = (value: number) => {
    setRating(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !reviewText.trim()) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor califica y escribe tu experiencia.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reseña publicada",
        description: "Tu reseña ha sido publicada exitosamente.",
      });
      navigate("/map");
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold text-accede-purple">
            {place.name}
          </h1>
          <div className="ml-2">
            <AccessibilityIcon level={place.accessibilityLevel} showLabel />
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Opiniones</h2>
          
          {place.reviews.length > 0 ? (
            <div className="space-y-4">
              {place.reviews.map(review => (
                <div key={review.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{review.userName}</span>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No hay opiniones todavía para este lugar.</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Agregar reseña</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                ¿Cómo calificarías la accesibilidad? *
              </label>
              <div className="flex justify-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="text-3xl px-1"
                    onClick={() => handleRatingChange(i + 1)}
                  >
                    <span className={i < rating ? "text-yellow-500" : "text-gray-300"}>
                      ★
                    </span>
                  </button>
                ))}
              </div>
              <div className="text-xs text-center text-gray-500">
                {rating > 0 ? (
                  rating === 5 ? "Excelente" :
                  rating === 4 ? "Bueno" :
                  rating === 3 ? "Regular" :
                  rating === 2 ? "Malo" :
                  "Muy Malo"
                ) : "Selecciona una calificación"}
              </div>
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-sm font-medium mb-1">
                Escribe tu experiencia *
              </label>
              <Textarea
                id="experience"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Detalla tu experiencia de accesibilidad en este lugar..."
                rows={4}
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 bg-accede-purple hover:bg-accede-purple/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publicando...
                </div>
              ) : (
                "Publicar reseña"
              )}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;
