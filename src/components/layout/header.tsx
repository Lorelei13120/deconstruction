import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/languageContext';
import LanguageSwitcher from './languageSwitcher';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', key: 'nav.home' },
    { path: '/emotions', key: 'nav.emotions' },
    { path: '/ressources', key: 'nav.resources' },
    { path: '/map', key: 'nav.map' },
    { path: '/therapie', key: 'nav.therapy' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Titre */}
        <Link to="/" className="text-xl font-bold text-brand-deep hover:text-primary transition-colors">
          Déconstruction
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary underline underline-offset-4'
                  : 'text-brand-text hover:text-primary'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Sélecteur de Langue */}
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;