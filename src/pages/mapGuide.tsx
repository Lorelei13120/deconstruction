import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const MapGuidePage: React.FC = () => {
  const { t } = useLanguage();

  const steps = t('map.steps') as unknown as Array<{ title: string; content: string }>;

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-deep mb-6">
            {t('map.title')}
          </h1>
          <p className="text-brand-text text-lg max-w-2xl mx-auto">
            {t('map.description')}
          </p>
        </div>

        {/* Citation */}
        <Card className="bg-gradient-to-r from-rose-50 to-purple-50 p-8 rounded-3xl border-rose-100 shadow-lg text-center">
          <Quote className="w-10 h-10 text-rose-400 mx-auto mb-4" />
          <blockquote className="text-2xl font-medium text-brand-deep italic mb-4">
            &quot;{t('map.quote')}&quot;
          </blockquote>
          <cite className="text-brand-text not-italic">— {t('map.quoteSource')}</cite>
        </Card>

        {/* Étapes */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border-rose-100">
              <h2 className="text-2xl font-bold text-brand-deep mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-rose-600 font-bold text-sm">
                  {index + 1}
                </span>
                {step.title}
              </h2>
              <p className="text-brand-text text-lg leading-relaxed pl-11">
                {step.content}
              </p>
            </Card>
          ))}
        </div>

        {/* Les Outils */}
        <div className="pt-8">
          <h2 className="text-3xl font-bold text-brand-deep mb-8 text-center">
            {t('map.tools.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border-rose-100 flex flex-col">
              <h3 className="text-xl font-bold text-brand-deep mb-3">
                {t('map.tools.emotionalWork.title')}
              </h3>
              <p className="text-brand-text text-sm mb-4 flex-grow">
                {t('map.tools.emotionalWork.description')}
              </p>
              <p className="text-sm italic text-purple-700 bg-purple-50 p-3 rounded-lg">
                💡 {t('map.tools.emotionalWork.tip')}
              </p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border-rose-100 flex flex-col">
              <h3 className="text-xl font-bold text-brand-deep mb-3">
                {t('map.tools.tekmilShort.title')}
              </h3>
              <p className="text-brand-text text-sm mb-4 flex-grow">
                {t('map.tools.tekmilShort.description')}
              </p>
              <p className="text-sm italic text-purple-700 bg-purple-50 p-3 rounded-lg">
                💡 {t('map.tools.tekmilShort.tip')}
              </p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border-rose-100 flex flex-col">
              <h3 className="text-xl font-bold text-brand-deep mb-3">
                {t('map.tools.tekmilLong.title')}
              </h3>
              <p className="text-brand-text text-sm mb-4 flex-grow">
                {t('map.tools.tekmilLong.description')}
              </p>
              <p className="text-sm italic text-purple-700 bg-purple-50 p-3 rounded-lg">
                💡 {t('map.tools.tekmilLong.tip')}
              </p>
            </Card>
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-brand-text">
            {t('map.moreInfo')}
          </p>
          <a href="https://map-cph.ukrudt.net/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline mt-2 inline-block">
            map-cph.ukrudt.net
          </a>
        </div>

      </div>
    </div>
  );
};

export default MapGuidePage;