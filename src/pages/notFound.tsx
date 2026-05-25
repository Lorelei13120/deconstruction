import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/button';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-brand-deep mb-4">404</h1>
      <p className="text-brand-text text-xl mb-8">{t('notFound.message') || 'Page not found'}</p>
      <Link to="/">
        <Button className="bg-primary hover:bg-primary/90">
          {t('nav.home')}
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;