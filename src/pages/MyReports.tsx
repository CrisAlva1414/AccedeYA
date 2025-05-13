import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Report {
  id: string;
  location: string;
  issues: string[];
  otherIssue?: string;
  date: string;
  status: "received" | "pending";
  hasPhoto: boolean;
}

// Sample reports data
const initialReports: Report[] = [
  {
    id: "r1",
    location: "Plaza de Armas",
    issues: ["Rampas accesibles", "Baño accesible"],
    date: "12/04/2025",
    status: "received",
    hasPhoto: true
  },
  {
    id: "r2",
    location: "Estación Central",
    issues: ["Escaleras sin rampa"],
    date: "05/04/2025",
    status: "pending",
    hasPhoto: false
  },
];

const MyReports = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const { toast } = useToast();
  
  const handleDeleteReport = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
    toast({
      title: "Reporte eliminado",
      description: "El reporte ha sido eliminado exitosamente.",
    });
  };
  
  const getStatusBadge = (status: Report["status"]) => {
    if (status === "received") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Recibido
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pendiente
      </span>
    );
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-accede-purple mb-6">Mis Reportes</h1>
        
        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map(report => (
              <div 
                key={report.id} 
                className="bg-white rounded-lg shadow p-4 border-l-4 border-accede-purple"
              >
                <div className="flex justify-between items-start">
                  <h2 className="font-semibold text-lg">{report.location}</h2>
                  {getStatusBadge(report.status)}
                </div>
                
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {report.issues.map((issue, index) => (
                      <span 
                        key={index} 
                        className="bg-accede-purple/10 text-accede-purple text-xs px-2 py-1 rounded"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                  
                  {report.otherIssue && (
                    <p className="text-sm text-gray-600 mb-2">
                      {report.otherIssue}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                    <span>{report.date}</span>
                    {report.hasPhoto && (
                      <span className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
                        Foto adjunta
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-3">
                  {report.status === "pending" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Función no disponible</DialogTitle>
                        </DialogHeader>
                        <p className="py-4">La función de edición no está disponible en esta versión del MVP.</p>
                        <Button className="w-full" onClick={() => toast({
                          title: "Simulación",
                          description: "Esta función estará disponible próximamente.",
                        })}>
                          Aceptar
                        </Button>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteReport(report.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mx-auto text-gray-400 mb-4"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M12 18v-6" />
              <path d="M9 15h6" />
            </svg>
            <h2 className="text-lg font-medium text-gray-900">No tienes reportes</h2>
            <p className="mt-1 text-gray-500">
              Tus reportes de accesibilidad aparecerán aquí.
            </p>
            <Button 
              onClick={() => window.location.href = '/report'} 
              className="mt-6 bg-accede-purple hover:bg-accede-purple/90"
            >
              Crear un reporte
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyReports;
