import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen } from 'lucide-react';
import resourcesData from '@/assets/data/ressources.json';

const ResourcesPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-deep mb-4">
            {t('resources.title')}
          </h1>
          <p className="text-brand-text text-lg max-w-2xl mx-auto">
            {t('resources.description')}
          </p>
        </div>

        <div className="grid gap-6">
          {resourcesData.resources.map((res, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border-rose-100 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-rose-500" />
                    <span className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
                      {res.type === 'book' ? t('resources.type.book') : t('resources.type.resource')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-deep mb-2">{res.title[language]}</h3>
                  <p className="text-brand-text text-lg mb-4">{res.desc[language]}</p>
                  <p className="text-sm text-muted-foreground italic">
                    {t('common.author')} {res.author}
                  </p>
                </div>
                <Button asChild variant="outline" className="shrink-0 border-rose-200 hover:bg-rose-50">
                  <a href={res.url} target="_blank" rel="noopener noreferrer">
                    {t('common.consult')}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;