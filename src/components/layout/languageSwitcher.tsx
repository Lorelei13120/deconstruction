import { useLanguage, type Language } from '@/lib/languageContext';
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; fullName: string }[] = [
    { code: 'fr', label: 'FR', fullName: 'Français' },
    { code: 'de', label: 'DE', fullName: 'Deutsch' },
    { code: 'en', label: 'EN', fullName: 'English' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="appearance-none bg-brand-light border-2 border-primary text-brand-deep font-semibold rounded-lg px-4 py-2 pr-10 cursor-pointer hover:bg-brand-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-brand-light"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.fullName}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
    </div>
  );
};

export default LanguageSwitcher;
