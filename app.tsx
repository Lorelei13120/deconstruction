import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/lib/languageContext';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomePage from '@/pages/home';
import EmotionsPage from '@/pages/emotions';
import ResourcesPage from '@/pages/ressources';
import MapGuidePage from '@/pages/mapGuide';
import TherapyPage from '@/pages/therapy';
import NotFoundPage from '@/pages/notFound';

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-brand-light">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/emotions" element={<EmotionsPage />} />
              <Route path="/ressources" element={<ResourcesPage />} />
              <Route path="/map" element={<MapGuidePage />} />
              <Route path="/therapie" element={<TherapyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;