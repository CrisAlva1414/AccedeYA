import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface AccessibilityIssue {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const issues: AccessibilityIssue[] = [
  {
    id: "ramps",
    label: "Rampas accesibles",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M19 9V7.5a1.5 1.5 0 0 0-1.5-1.5h-7A1.5 1.5 0 0 0 9 7.5V9" />
        <path d="M9 9v12" />
        <path d="m9 15 3-3 3 3" />
        <path d="M15 12V9" />
      </svg>
    )
  },
  {
    id: "stairs",
    label: "Escaleras sin rampa",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21h16" />
        <path d="M4 18h2" />
        <path d="M8 18h2" />
        <path d="M12 18h2" />
        <path d="M16 18h4" />
        <path d="M4 15h4" />
        <path d="M10 15h2" />
        <path d="M14 15h2" />
        <path d="M18 15h2" />
        <path d="M4 12h2" />
        <path d="M8 12h4" />
        <path d="M14 12h2" />
        <path d="M18 12h2" />
        <path d="M4 9h4" />
        <path d="M10 9h4" />
        <path d="M16 9h4" />
      </svg>
    )
  },
  {
    id: "doors",
    label: "Puertas angostas",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M6 21V3h12v18" />
        <path d="M17 15H7" />
        <path d="M15 10h-3" />
      </svg>
    )
  },
  {
    id: "bathroom",
    label: "Baño accesible",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6h8" />
        <path d="M8 18h8" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M2 4v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      </svg>
    )
  }
];

const Report = () => {
  const [location, setLocation] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [otherIssue, setOtherIssue] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleToggleIssue = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };
  
  const handlePhotoUpload = () => {
    // In a real app, this would trigger file upload
    setPhotoAdded(true);
    toast({
      title: "Foto añadida",
      description: "Tu foto se ha añadido correctamente.",
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location || (!selectedIssues.length && !otherIssue)) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor completa los campos requeridos.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reporte enviado",
        description: "Tu reporte de accesibilidad ha sido enviado exitosamente.",
      });
      navigate("/my-reports");
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-accede-purple mb-6">Reportar Accesibilidad</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              ¿Qué lugar estás reportando? *
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Plaza Central, Av. Principal 123"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              ¿Qué observaste? *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {issues.map((issue) => (
                <button
                  key={issue.id}
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                    selectedIssues.includes(issue.id)
                      ? "bg-accede-purple/20 border-accede-purple"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleToggleIssue(issue.id)}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    selectedIssues.includes(issue.id)
                      ? "text-accede-purple"
                      : "text-gray-500"
                  }`}>
                    {issue.icon}
                  </div>
                  <span className="text-xs mt-2 text-center">{issue.label}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-3">
              <label htmlFor="other" className="block text-sm font-medium mb-1">
                Otro (especificar)
              </label>
              <Textarea
                id="other"
                value={otherIssue}
                onChange={(e) => setOtherIssue(e.target.value)}
                placeholder="Describe lo que observaste..."
                rows={3}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              ¿Quieres agregar una foto?
            </label>
            <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50">
              {photoAdded ? (
                <div className="text-center">
                  <div className="w-full h-32 bg-accede-purple/20 rounded flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accede-purple">
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                      <rect width="5" height="5" x="16" y="3" rx="1" />
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">img_001.jpg</p>
                  <button
                    type="button"
                    className="text-xs text-accede-purple underline mt-1"
                    onClick={() => setPhotoAdded(false)}
                  >
                    Eliminar foto
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="text-center w-full"
                  onClick={handlePhotoUpload}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" x2="3" y1="12" y2="12" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Toca para seleccionar una foto
                  </span>
                </button>
              )}
            </div>
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
                Enviando...
              </div>
            ) : (
              "Enviar reporte"
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Report;
