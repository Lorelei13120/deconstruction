import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';

const TherapyPage: React.FC = () => {
  const { t } = useLanguage();

  const tableHeaders = t('therapy.table') as unknown as Record<string, string>;
  const exampleRow = t('therapy.exampleRow') as unknown as Record<string, string>;
  const distortionItems = t('therapy.distortions.items') as unknown as string[];

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-deep mb-4">
            {t('therapy.title')}
          </h1>
          <p className="text-brand-text text-lg max-w-3xl mx-auto">
            {t('therapy.description')}
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-rose-100 overflow-x-auto">
          <h2 className="text-2xl font-bold text-brand-deep mb-6">
            {t('therapy.exampleTitle')}
          </h2>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-rose-100">
                <th className="py-3 px-4 font-bold text-brand-deep">{tableHeaders.situation}</th>
                <th className="py-3 px-4 font-bold text-brand-deep">{tableHeaders.thought}</th>
                <th className="py-3 px-4 font-bold text-brand-deep">{tableHeaders.emotion}</th>
                <th className="py-3 px-4 font-bold text-brand-deep">{tableHeaders.distortion}</th>
                <th className="py-3 px-4 font-bold text-brand-deep">{tableHeaders.rational}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rose-50 hover:bg-rose-50/50 transition-colors">
                <td className="py-4 px-4 text-brand-text">{exampleRow.situation}</td>
                <td className="py-4 px-4 text-brand-text">{exampleRow.thought}</td>
                <td className="py-4 px-4 text-brand-text">{exampleRow.emotion}</td>
                <td className="py-4 px-4 text-brand-text">{exampleRow.distortion}</td>
                <td className="py-4 px-4 text-brand-text font-medium">{exampleRow.rational}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-purple-50/50 p-6 rounded-2xl border-purple-100">
            <h3 className="text-xl font-bold text-brand-deep mb-3">
              {t('therapy.distortions.title')}
            </h3>
            <ul className="space-y-2 text-brand-text">
              {distortionItems.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </Card>
          <Card className="bg-rose-50/50 p-6 rounded-2xl border-rose-100">
            <h3 className="text-xl font-bold text-brand-deep mb-3">
              {t('therapy.tip.title')}
            </h3>
            <p className="text-brand-text">
              {t('therapy.tip.content')}
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default TherapyPage;