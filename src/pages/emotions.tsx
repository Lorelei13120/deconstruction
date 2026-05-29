import { useLanguage } from '@/lib/languageContext';
import WheelCanvas from '@/components/wheel/wheelCanvas';
import { Card } from '@/components/ui/card';

const EmotionsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-rose-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-brand-deep mb-4">
              {t('emotions.title')}
            </h1>
            <p className="text-brand-text text-lg">
              {t('emotions.description')}
            </p>
          </div>

          {/* Section 1: Pourquoi? */}
        <section className="space-y-6">
          <div>
            <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border-rose-100">
              <h2 className="text-3xl font-bold text-brand-deep mb-4">
              {t('emotions.intro.title')}
            </h2>
            <p className="text-brand-text text-lg mb-4">
                {t('emotions.intro.whyUse1')}
              </p>
              <p className="text-brand-text text-lg">
                {t('emotions.intro.whyUse2')}
              </p>
            </Card>
          </div>
        </section>
          <WheelCanvas />
        </Card>
      </div>
    </div>
  );
};

export default EmotionsPage;