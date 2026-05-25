import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const MapGuidePage: React.FC = () => {
  const { language } = useLanguage();

  const steps = [
    {
      title: { fr: "1. Rassembler", en: "1. Gather", de: "1. Versammeln" },
      content: { 
        fr: "Trouve 3-5 hommes engagés dans la déconstruction. L'idée n'est pas de former un groupe de soutien thérapeutique, mais un espace d'entraide politique et pratique.",
        en: "Find 3-5 men committed to deconstruction. The idea is not to form a therapeutic support group, but a space for political and practical mutual aid.",
        de: "Finde 3-5 Männer, die der Dekonstruktion verpflichtet sind. Die Idee ist nicht, eine therapeutische Unterstützungsgruppe zu bilden, sondern einen Raum für politische und praktische gegenseitige Hilfe."
      }
    },
    {
      title: { fr: "2. Établir des règles claires", en: "2. Establish clear rules", de: "2. Klare Regeln aufstellen" },
      content: {
        fr: "Consentement, confidentialité, non-violence verbale. Chaque participant doit se sentir en sécurité pour partager ses vulnérabilités.",
        en: "Consent, confidentiality, verbal non-violence. Every participant must feel safe to share vulnerabilities.",
        de: "Einwilligung, Vertraulichkeit, verbale Gewaltfreiheit. Jeder Teilnehmer muss sich sicher fühlen, um Verletzlichkeit zu teilen."
      }
    },
    {
      title: { fr: "3. Pratiquer l'écoute active", en: "3. Practice active listening", de: "3. Aktives Zuhören üben" },
      content: {
        fr: "Écouter sans juger, sans donner de conseils non sollicités. Valider les émotions de l'autre.",
        en: "Listen without judging, without giving unsolicited advice. Validate the other's emotions.",
        de: "Zuhören ohne zu urteilen, ohne ungewollte Ratschläge zu geben. Die Emotionen des anderen validieren."
      }
    },
    {
      title: { fr: "4. Agir ensemble", en: "4. Act together", de: "4. Gemeinsam handeln" },
      content: {
        fr: "Identifier des actions concrètes pour soutenir les femmes et les minorités dans votre communauté.",
        en: "Identify concrete actions to support women and minorities in your community.",
        de: "Konkrete Maßnahmen identifizieren, um Frauen und Minderheiten in Ihrer Gemeinschaft zu unterstützen."
      }
    }
  ];

  const quote = {
    text: {
      fr: "La masculinité n'est pas une prison, c'est une cage dont nous tenons nous-mêmes les barreaux. Ouvrons la porte.",
      en: "Masculinity is not a prison, it's a cage where we hold the bars ourselves. Let's open the door.",
      de: "Männlichkeit ist kein Gefängnis, es ist ein Käfig, dessen Gitter wir selbst halten. Öffnen wir die Tür."
    },
    source: "Difficult Hugs, MAP"
  };

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-deep mb-6">
            {language === 'fr' ? "Créer un Groupe MAP" : language === 'en' ? "Create a MAP Group" : "MAP-Gruppe gründen"}
          </h1>
          <p className="text-brand-text text-lg max-w-2xl mx-auto">
            {language === 'fr' ? "Men Against Patriarchy (MAP) : un guide pour construire des espaces d'entraide entre hommes." : language === 'en' ? "Men Against Patriarchy (MAP): A guide to building mutual aid spaces among men." : "Men Against Patriarchy (MAP): Ein Leitfaden zum Aufbau von gegenseitigen Hilfsräumen unter Männern."}
          </p>
        </div>

        {/* Citation */}
        <Card className="bg-gradient-to-r from-rose-50 to-purple-50 p-8 rounded-3xl border-rose-100 shadow-lg text-center">
          <Quote className="w-10 h-10 text-rose-400 mx-auto mb-4" />
          <blockquote className="text-2xl font-medium text-brand-deep italic mb-4">
            "{quote.text[language]}"
          </blockquote>
          <cite className="text-brand-text not-italic">— {quote.source}</cite>
        </Card>

        {/* Étapes */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border-rose-100">
              <h2 className="text-2xl font-bold text-brand-deep mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-rose-600 font-bold text-sm">
                  {index + 1}
                </span>
                {step.title[language]}
              </h2>
              <p className="text-brand-text text-lg leading-relaxed pl-11">
                {step.content[language]}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8">
          <p className="text-brand-text">
            {language === 'fr' ? "Pour plus d'informations, visitez le site officiel de MAP CPH." : language === 'en' ? "For more info, visit the official MAP CPH website." : "Für weitere Informationen besuchen Sie die offizielle MAP CPH Website."}
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