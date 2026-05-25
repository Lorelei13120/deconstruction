import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';

const TherapyPage: React.FC = () => {
  const { language } = useLanguage();

  const headers = {
    situation: { fr: "Situation", en: "Situation", de: "Situation" },
    thought: { fr: "Pensée automatique", en: "Automatic Thought", de: "Automatische Gedanken" },
    emotion: { fr: "Émotion", en: "Emotion", de: "Emotion" },
    distortion: { fr: "Distorsion cognitive", en: "Cognitive Distortion", de: "Kognitive Verzerrung" },
    rational: { fr: "Pensée rationnelle", en: "Rational Thought", de: "Rationaler Gedanke" }
  };

  const exampleRow = {
    situation: { fr: "Mon ami ne répond pas à mon message.", en: "My friend didn't reply to my message.", de: "Mein Freund hat nicht auf meine Nachricht geantwortet." },
    thought: { fr: "Il m'en veut, je lui ai fait quelque chose de mal.", en: "He is mad at me, I did something wrong.", de: "Er ist sauer auf mich, ich habe etwas falsch gemacht." },
    emotion: { fr: "Anxiété, tristesse (80%)", en: "Anxiety, sadness (80%)", de: "Angst, Traurigkeit (80%)" },
    distortion: { fr: "Lecture de pensée, catastrophisme", en: "Mind reading, catastrophizing", de: "Gedankenlesen, Katastrophisieren" },
    rational: { fr: "Il est peut-être occupé. Je lui ai déjà parlé de problèmes similaires et il m'a dit qu'il avait juste besoin de temps.", en: "Maybe he is busy. We talked about similar issues before and he said he just needs time.", de: "Vielleicht ist er beschäftigt. Wir haben bereits über ähnliche Probleme gesprochen und er sagte, er braucht nur Zeit." }
  };

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-deep mb-4">
            {language === 'fr' ? "Thérapie des Schémas & TEP" : language === 'en' ? "Schema Therapy & TEP" : "Schema-Therapie & TEP"}
          </h1>
          <p className="text-brand-text text-lg max-w-3xl mx-auto">
            {language === 'fr' ? "Le Tableau d'Enregistrement des Pensées (TEP) est un outil puissant pour identifier et remettre en question les pensées automatiques négatives qui alimentent nos émotions difficiles." : language === 'en' ? "The Thought Record (TEP) is a powerful tool to identify and challenge negative automatic thoughts that fuel our difficult emotions." : "Das Gedankenprotokoll (TEP) ist ein mächtiges Werkzeug, um negative automatische Gedanken zu identifizieren und herauszufordern, die unsere schwierigen Emotionen nähren."}
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-rose-100 overflow-x-auto">
          <h2 className="text-2xl font-bold text-brand-deep mb-6">
            {language === 'fr' ? "Exemple de remplissage" : language === 'en' ? "Example of filling" : "Beispiel zur Ausfüllung"}
          </h2>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-rose-100">
                <th className="py-3 px-4 font-bold text-brand-deep">{headers.situation[language]}</th>
                <th className="py-3 px-4 font-bold text-brand-deep">{headers.thought[language]}</th>
                <th className="py-3 px-4 font-bold text-brand-deep">{headers.emotion[language]}</th>
                <th className="py-3 px-4 font-bold text-brand-deep">{headers.distortion[language]}</th>
                <th className="py-3 px-4 font-bold text-brand-deep">{headers.rational[language]}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rose-50 hover:bg-rose-50/50 transition-colors">
                <td className="py-4 px-4 text-brand-text">{exampleRow.situation[language]}</td>
                <td className="py-4 px-4 text-brand-text">{exampleRow.thought[language]}</td>
                <td className="py-4 px-4 text-brand-text">{exampleRow.emotion[language]}</td>
                <td className="py-4 px-4 text-brand-text">{exampleRow.distortion[language]}</td>
                <td className="py-4 px-4 text-brand-text font-medium">{exampleRow.rational[language]}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-purple-50/50 p-6 rounded-2xl border-purple-100">
            <h3 className="text-xl font-bold text-brand-deep mb-3">
              {language === 'fr' ? "Les distorsions courantes" : language === 'en' ? "Common distortions" : "Häufige Verzerrungen"}
            </h3>
            <ul className="space-y-2 text-brand-text">
              <li>• {language === 'fr' ? "Lecture de pensée" : language === 'en' ? "Mind reading" : "Gedankenlesen"}</li>
              <li>• {language === 'fr' ? "Catastrophisme" : language === 'en' ? "Catastrophizing" : "Katastrophisieren"}</li>
              <li>• {language === 'fr' ? "Généralisation excessive" : language === 'en' ? "Overgeneralization" : "Übergeneralisierung"}</li>
              <li>• {language === 'fr' ? "Filtre mental" : language === 'en' ? "Mental filter" : "Mentaler Filter"}</li>
            </ul>
          </Card>
          <Card className="bg-rose-50/50 p-6 rounded-2xl border-rose-100">
            <h3 className="text-xl font-bold text-brand-deep mb-3">
              {language === 'fr' ? "Conseil pratique" : language === 'en' ? "Practical tip" : "Praktischer Tipp"}
            </h3>
            <p className="text-brand-text">
              {language === 'fr' ? "Commence par noter une seule situation par jour. Ne cherche pas à être parfait, l'objectif est de prendre conscience de tes schémas." : language === 'en' ? "Start by noting one situation per day. Don't aim for perfection, the goal is to become aware of your patterns." : "Beginnen Sie damit, täglich eine Situation aufzuschreiben. Streben Sie keine Perfektion an, das Ziel ist es, sich Ihrer Muster bewusst zu werden."}
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default TherapyPage;