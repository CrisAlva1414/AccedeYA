import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-fade-in text-center">
          <div className="w-32 h-32 bg-accede-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M14 13.1a8.8 8.8 0 0 1 4 6.9" />
              <path d="M6 13.1a8.8 8.8 0 0 0-4 6.9" />
              <path d="m16 16-4 4-4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-accede-purple">Accede Ya</h1>
          <div className="w-12 h-1 bg-accede-teal mx-auto mt-2 mb-4"></div>
          <div className="loading-dots flex justify-center gap-1">
            <div className="w-2 h-2 rounded-full bg-accede-purple animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-accede-purple animate-pulse delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-accede-purple animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="flex-grow px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-accede-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M14 13.1a8.8 8.8 0 0 1 4 6.9" />
                <path d="M6 13.1a8.8 8.8 0 0 0-4 6.9" />
                <path d="m16 16-4 4-4-4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-accede-purple mb-4">Accede Ya</h1>
            <p className="text-lg text-accede-gray">
              Explora y comparte accesibilidad en tu ciudad
            </p>
          </div>

          <div className="space-y-4 animate-fade-up">
            <Link to="/map" className="block">
              <Button 
                className="w-full h-16 text-lg bg-accede-purple hover:bg-accede-purple/90"
              >
                <svg 
                  className="mr-2"
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
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                  <line x1="9" x2="9" y1="3" y2="18"></line>
                  <line x1="15" x2="15" y1="6" y2="21"></line>
                </svg>
                Explorar Mapa
              </Button>
            </Link>
            
            <Link to="/report" className="block">
              <Button 
                variant="outline" 
                className="w-full h-16 text-lg text-accede-purple border-accede-purple hover:bg-accede-purple/10"
              >
                <svg 
                  className="mr-2"
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
                  <path d="M6 10H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"></path>
                  <path d="M12 2v8"></path>
                  <path d="m9 5 3-3 3 3"></path>
                </svg>
                Reportar Accesibilidad
              </Button>
            </Link>
            
            <Link to="/my-reports" className="block">
              <Button 
                variant="outline" 
                className="w-full h-16 text-lg text-accede-purple border-accede-purple hover:bg-accede-purple/10"
              >
                <svg 
                  className="mr-2"
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
                Mis reportes
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="py-4 text-center text-xs text-accede-gray bg-white">
        <p>© 2025 Accede Ya - v1.0</p>
      </footer>
    </div>
  );
};

export default Index;