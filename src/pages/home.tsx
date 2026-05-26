import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 py-8">
          <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-5xl font-bold text-brand-deep leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl text-brand-text max-w-2xl mx-auto leading-relaxed">
            {t('home.hero.description')}
          </p>
          <div className="pt-4">
            <Link to="/emotions">
              <Button className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Pourquoi Déconstruire ? */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-rose-100">
            <h2 className="text-3xl font-bold text-brand-deep mb-6">
              {t('home.why.title')}
            </h2>
            <div className="space-y-4 text-brand-text text-lg leading-relaxed">
              <p>
                {t('home.why.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 marker:text-rose-500">
                {(t('home.why.items') as unknown as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="grid md:grid-cols-2 gap-6">
          <Link to="/ressources" className="group">
            <Card className="h-full bg-gradient-to-br from-rose-50 to-purple-50 p-6 rounded-3xl border-rose-100 hover:shadow-lg transition-all cursor-pointer">
              <h3 className="text-2xl font-bold text-brand-deep mb-3 group-hover:text-primary transition-colors">
                {t('home.cta.resources.title')}
              </h3>
              <p className="text-brand-text">
                {t('home.cta.resources.description')}
              </p>
            </Card>
          </Link>
          <Link to="/map" className="group">
            <Card className="h-full bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-3xl border-purple-100 hover:shadow-lg transition-all cursor-pointer">
              <h3 className="text-2xl font-bold text-brand-deep mb-3 group-hover:text-accent transition-colors">
                {t('home.cta.map.title')}
              </h3>
              <p className="text-brand-text">
                {t('home.cta.map.description')}
              </p>
            </Card>
          </Link>
        </section>

      </div>
    </div>
  );
};

export default HomePage;