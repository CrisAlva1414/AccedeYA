import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import AccessibilityIcon from "./AccessibilityIcon";
import { useToast } from "@/components/ui/use-toast";

export interface Review {
  id: string;
  userName: string;
  date: string;
  text: string;
  rating: number;
}

export interface Place {
  id: string;
  name: string;
  accessibilityLevel: "high" | "medium" | "low" | "none";
  description?: string;
  imageUrl?: string;
  reviews: Review[];
}

interface PlaceDetailsProps {
  place: Place;
  onClose: () => void;
}

const PlaceDetails = ({ place, onClose }: PlaceDetailsProps) => {
  const { toast } = useToast();
  
  const handleShare = () => {
    toast({
      title: "Compartido",
      description: `La información de ${place.name} ha sido compartida.`,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto border shadow-lg animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{place.name}</h2>
            <div className="mt-1">
              <AccessibilityIcon level={place.accessibilityLevel} showLabel />
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {place.imageUrl && (
          <div className="mb-4">
            <img 
              src={place.imageUrl} 
              alt={place.name} 
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        )}
        
        {place.description && (
          <p className="text-gray-700 mb-4">{place.description}</p>
        )}
        
        <div>
          <h3 className="font-semibold mb-2">Opiniones recientes</h3>
          {place.reviews.length > 0 ? (
            <div className="space-y-3">
              {place.reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="border-l-2 border-accede-purple pl-3 py-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{review.userName}</span>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm mt-1">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No hay opiniones todavía.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link 
          to={`/reviews/${place.id}`} 
          className="flex-1"
        >
          <Button variant="default" className="w-full">
            Agregar Reseña
          </Button>
        </Link>
        <Button variant="outline" onClick={handleShare}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaceDetails;
