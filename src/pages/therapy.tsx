import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TherapyPage: React.FC = () => {
  const { t } = useLanguage();
  const [expandedSchema, setExpandedSchema] = useState<string | null>(null);

  const tableHeaders = t('therapy.tep.table') as unknown as Record<string, string>;
  const exampleRow = t('therapy.tep.exampleRow') as unknown as Record<string, string>;
  const distortionItems = t('therapy.tep.distortions.items') as unknown as string[];
  
  const tepSteps = [
    {
      key: 'step1',
      title: t('therapy.tep.steps.step1.title'),
      description: t('therapy.tep.steps.step1.description'),
    },
    {
      key: 'step2',
      title: t('therapy.tep.steps.step2.title'),
      description: t('therapy.tep.steps.step2.description'),
    },
    {
      key: 'step3',
      title: t('therapy.tep.steps.step3.title'),
      description: t('therapy.tep.steps.step3.description'),
    },
    {
      key: 'step4',
      title: t('therapy.tep.steps.step4.title'),
      description: t('therapy.tep.steps.step4.description'),
    },
  ];

  const questionTypes = [
    {
      key: 'type1',
      title: t('therapy.tep.questionningTypes.type1.title'),
      description: t('therapy.tep.questionningTypes.type1.description'),
    },
    {
      key: 'type2',
      title: t('therapy.tep.questionningTypes.type2.title'),
      description: t('therapy.tep.questionningTypes.type2.description'),
    },
    {
      key: 'type3',
      title: t('therapy.tep.questionningTypes.type3.title'),
      description: t('therapy.tep.questionningTypes.type3.description'),
    },
  ];

  const benefits = t('therapy.tep.benefits.items') as unknown as string[];

  const perpetuationModes = [
    {
      key: 'capitulation',
      title: t('therapy.schemas.perpetuation.capitulation.title'),
      description: t('therapy.schemas.perpetuation.capitulation.description'),
    },
    {
      key: 'avoidance',
      title: t('therapy.schemas.perpetuation.avoidance.title'),
      description: t('therapy.schemas.perpetuation.avoidance.description'),
    },
    {
      key: 'counterAttack',
      title: t('therapy.schemas.perpetuation.counterAttack.title'),
      description: t('therapy.schemas.perpetuation.counterAttack.description'),
    },
  ];

  const healingApproaches = [
    {
      key: 'emotional',
      title: t('therapy.schemas.healing.emotional.title'),
      description: t('therapy.schemas.healing.emotional.description'),
    },
    {
      key: 'interpersonal',
      title: t('therapy.schemas.healing.interpersonal.title'),
      description: t('therapy.schemas.healing.interpersonal.description'),
    },
    {
      key: 'cognitive',
      title: t('therapy.schemas.healing.cognitive.title'),
      description: t('therapy.schemas.healing.cognitive.description'),
    },
    {
      key: 'behavioral',
      title: t('therapy.schemas.healing.behavioral.title'),
      description: t('therapy.schemas.healing.behavioral.description'),
    },
  ];

  const exampleSchemas = [
    {
      key: 'droitsExageres',
      title: t('therapy.schemas.exampleSchemas.droitsExageres.title'),
      description: t('therapy.schemas.exampleSchemas.droitsExageres.description'),
    },
    {
      key: 'controleInsuffisant',
      title: t('therapy.schemas.exampleSchemas.controleInsuffisant.title'),
      description: t('therapy.schemas.exampleSchemas.controleInsuffisant.description'),
    },
    {
      key: 'rechercheApprobation',
      title: t('therapy.schemas.exampleSchemas.rechercheApprobation.title'),
      description: t('therapy.schemas.exampleSchemas.rechercheApprobation.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-deep mb-4">
            {t('therapy.title')}
          </h1>
        </div>

        {/* Section 1: Introduction aux Schémas */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-brand-deep mb-4">
              {t('therapy.schemas.intro.title')}
            </h2>
            <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border-rose-100">
              <p className="text-brand-text text-lg mb-4">
                {t('therapy.schemas.intro.whatIs')}
              </p>
              <p className="text-brand-text text-lg">
                {t('therapy.schemas.intro.twoOperations')}
              </p>
            </Card>
          </div>
        </section>

        {/* Bonus: Collapsible Example Schemas */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-brand-deep">
            {t('therapy.schemas.exampleSchemas.title')}
          </h2>
          <div className="space-y-3">
            {exampleSchemas.map((schema) => (
              <Card
                key={schema.key}
                className="bg-white/80 backdrop-blur-sm border-rose-100 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedSchema(expandedSchema === schema.key ? null : schema.key)
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-rose-50/50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-brand-deep text-left">
                    {schema.title}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-deep transition-transform ${
                      expandedSchema === schema.key ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSchema === schema.key && (
                  <div className="border-t border-rose-100 px-6 py-4 bg-rose-50/30">
                    <p className="text-brand-text text-sm">
                      {schema.description}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Section 2: La Perpétuation des Schémas */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-brand-deep">
            {t('therapy.schemas.perpetuation.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {perpetuationModes.map((mode) => (
              <Card key={mode.key} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border-rose-100">
                <h3 className="text-xl font-bold text-brand-deep mb-3">
                  {mode.title}
                </h3>
                <p className="text-brand-text text-sm">
                  {mode.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3: Guérir les Schémas */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-brand-deep">
            {t('therapy.schemas.healing.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {healingApproaches.map((approach) => (
              <Card key={approach.key} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border-rose-100">
                <h3 className="text-xl font-bold text-brand-deep mb-3">
                  {approach.title}
                </h3>
                <p className="text-brand-text text-sm">
                  {approach.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 4: TEP - Tableau d'Enregistrement des Pensées */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-brand-deep mb-4">
              {t('therapy.tep.title')}
            </h2>
            <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border-rose-100 mb-6">
              <p className="text-brand-text text-lg">
                {t('therapy.tep.description')}
              </p>
            </Card>
          </div>

          {/* Les 4 Étapes du TEP */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-deep">
              {t('therapy.tep.steps.title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {tepSteps.map((step) => (
                <Card key={step.key} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md border-rose-100">
                  <h4 className="text-lg font-bold text-brand-deep mb-2">
                    {step.title}
                  </h4>
                  <p className="text-brand-text text-sm">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Les 3 Types de Questions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-deep">
              {t('therapy.tep.questionningTypes.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {questionTypes.map((question) => (
                <Card key={question.key} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md border-rose-100">
                  <h4 className="text-lg font-bold text-brand-deep mb-2">
                    {question.title}
                  </h4>
                  <p className="text-brand-text text-sm">
                    {question.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Avantages du TEP */}
          <Card className="bg-purple-50/50 p-6 rounded-2xl border-purple-100">
            <h3 className="text-2xl font-bold text-brand-deep mb-4">
              {t('therapy.tep.benefits.title')}
            </h3>
            <ul className="space-y-3 text-brand-text">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-rose-500 font-bold">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Example Table */}
          <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-rose-100 overflow-x-auto">
            <h3 className="text-2xl font-bold text-brand-deep mb-6">
              {t('therapy.tep.exampleTitle')}
            </h3>
            
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

          {/* Distortions and Tips */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-purple-50/50 p-6 rounded-2xl border-purple-100">
              <h3 className="text-xl font-bold text-brand-deep mb-3">
                {t('therapy.tep.distortions.title')}
              </h3>
              <ul className="space-y-2 text-brand-text text-sm">
                {distortionItems.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </Card>
            <Card className="bg-rose-50/50 p-6 rounded-2xl border-rose-100">
              <h3 className="text-xl font-bold text-brand-deep mb-3">
                {t('therapy.tep.tip.title')}
              </h3>
              <p className="text-brand-text text-sm">
                {t('therapy.tep.tip.content')}
              </p>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TherapyPage;