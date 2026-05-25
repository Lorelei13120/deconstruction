import { useLanguage } from '@/lib/languageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/60 backdrop-blur-sm border-t border-rose-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-brand-text text-sm">
          {t('footer.copyright')} — {t('footer.madeWith')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;