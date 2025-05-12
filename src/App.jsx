import { useState, useEffect } from 'react';

const App = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Harita yüklendiğinde animasyon için
  useEffect(() => {
    const timer = setTimeout(() => setIsMapLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Zaman dilimleri (dakika cinsinden)
  const timeIntervals = [3, 4, 5, 6, 7, 8, 9, 10];

  // Ortalama hızı hesaplayan fonksiyon
  const calculateSpeed = (minutes) => {
    const hours = minutes / 60;
    const speed = 1.7 / hours;
    return speed.toFixed(1);
  };

  // Renk belirleme fonksiyonu
  const getSpeedColor = (speed) => {
    if (speed > 25) return "bg-green-500";
    if (speed > 15) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Harita & Hız Değerlendirmesi</h1>
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Uygulamayı Kur
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center p-4 md:p-6 lg:p-8 gap-6 relative">
        
        {/* Legend / Speed Info Box */}
        <div className="absolute top-20 right-4 md:top-24 md:right-8 z-10 bg-white rounded-lg shadow-lg p-4 max-w-xs w-full transition-opacity duration-700 ease-in-out opacity-95">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 border-b pb-1">Hız Durumu (km/saat)</h2>
          <ul className="space-y-1 text-xs">
            {timeIntervals.map((minutes) => {
              const speed = parseFloat(calculateSpeed(minutes));
              return (
                <li key={minutes} className="flex items-center justify-between">
                  <span>{minutes} dk → {speed} km/saat</span>
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${getSpeedColor(speed)} mr-1`}
                    title={`${speed} km/saat`}
                  ></span>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 text-xs text-gray-500 border-t pt-2">
            🟢 25+ km/saat → Hızlı<br />
            🟡 15–25 km/saat → Orta<br />
            🔴 &lt;15 km/saat → Yavaş
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full max-w-5xl h-[60vh] md:h-[75vh] bg-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-700 ease-in-out transform sm:scale-100 scale-95">
          {!isMapLoaded && (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 animate-pulse">
              <span className="text-gray-400 text-sm">Harita yükleniyor...</span>
            </div>
          )}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d2777.2698060426487!2d33.324456284460005!3d35.181223362950604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e0!4m3!3m2!1d35.184311799999996!2d33.322673099999996!4m3!3m2!1d35.1800219!2d33.324463099999996!5e1!3m2!1str!2s!4v1747044903446!5m2!1str!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Embedded Map"
            onLoad={() => setIsMapLoaded(true)}
            className={`w-full h-full ${isMapLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          ></iframe>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Harita & Hız Gözlem Uygulaması | Minimalist Tasarım
        </div>
      </footer>
    </div>
  );
};

export default App;