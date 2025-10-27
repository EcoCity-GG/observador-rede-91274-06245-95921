import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, 
              você concorda com nossa{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Política de Privacidade
              </a>
              {" "}e{" "}
              <a href="/lgpd" className="text-primary hover:underline">
                LGPD
              </a>
              .
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={rejectCookies} variant="outline" size="sm">
              Rejeitar
            </Button>
            <Button onClick={acceptCookies} size="sm">
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
