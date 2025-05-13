import React, { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`fixed inset-0 flex flex-col bg-accede-light ${className}`}>
      {!isHome && (
        <header className="flex-none bg-white shadow-sm py-3 px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-accede-purple">AccedeYA!</span>
            </Link>
            <div className="flex space-x-2">
              {location.pathname !== "/map" && (
                <Link
                  to="/map"
                  className="p-2 text-accede-purple hover:bg-accede-purple/10 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                    <line x1="9" x2="9" y1="3" y2="18"></line>
                    <line x1="15" x2="15" y1="6" y2="21"></line>
                  </svg>
                </Link>
              )}
              {location.pathname !== "/report" && (
                <Link
                  to="/report"
                  className="p-2 text-accede-purple hover:bg-accede-purple/10 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 10H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"></path>
                    <path d="M12 2v8"></path>
                    <path d="m9 5 3-3 3 3"></path>
                  </svg>
                </Link>
              )}
              {location.pathname !== "/my-reports" && (
                <Link
                  to="/my-reports"
                  className="p-2 text-accede-purple hover:bg-accede-purple/10 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                    <path d="M10 9H8"></path>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </header>
      )}
      <main className="flex-1 overflow-hidden w-full relative">
        {children}
      </main>
      {!isHome && (
        <footer className="flex-none bg-white py-3 px-4 border-t">
          <div className="flex justify-center">
            <Link
              to="/"
              className="w-full max-w-xs py-2 text-center bg-accede-purple text-white rounded-full font-medium"
            >
              Volver al inicio
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
