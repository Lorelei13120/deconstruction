import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen } from 'lucide-react';

// Si le fichier JSON n'existe pas encore, on crée une version statique ici pour l'instant
const staticResources = [
  {
    title: { fr: "La Bonne Poire", en: "The Good Pear", de: "Die Gute Birne" },
    author: "Bx",
    url: "https://www.labonnepoire.be/",
    type: "site",
    desc: { fr: "Ressources sur le consentement et les relations saines.", en: "Resources on consent and healthy relationships.", de: "Ressourcen zu Einwilligung und gesunden Beziehungen." }
  },
  {
    title: { fr: "Je ne veux plus agresser, je fais comment ?", en: "I don't want to aggress anymore, what do I do?", de: "Ich will nicht mehr angreifen, was mache ich?" },
    author: "Brochure",
    url: "https://infokiosques.net/spip.php?page=article&id_article=2226",
    type: "pdf",
    desc: { fr: "Guide pratique pour arrêter les comportements agressifs.", en: "Practical guide to stop aggressive behaviors.", de: "Praktischer Leitfaden, um aggressives Verhalten zu stoppen." }
  },
  {
    title: { fr: "Comment devenir moins con en 10 étapes", en: "How to become less stupid in 10 steps", de: "Wie man in 10 Schritten weniger dumm wird" },
    author: "Delval",
    url: "https://www.babelio.com/livres/Delval-Comment-devenir-moins-con-en-dix-etapes/1518183",
    type: "book",
    desc: { fr: "Livre pour travailler sur ses biais et son ego.", en: "Book to work on biases and ego.", de: "Buch zur Arbeit an Vorurteilen und Ego." }
  },
  {
    title: { fr: "Difficult Hugs", en: "Difficult Hugs", de: "Schwierige Umarmungen" },
    author: "MAP",
    url: "https://map-cph.ukrudt.net/",
    type: "book",
    desc: { fr: "Essentiel pour comprendre les dynamiques de genre et l'entraide.", en: "Essential for understanding gender dynamics and mutual aid.", de: "Essentiell zum Verständnis von Geschlechterdynamiken und gegenseitiger Hilfe." }
  }
];

const ResourcesPage: React.FC = () => {
  const { language } = useLanguage();
  const resources = staticResources; // Utiliser les données statiques pour l'instant

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-deep mb-4">
            {language === 'fr' ? "Ressources pour la Déconstruction" : language === 'en' ? "Resources for Deconstruction" : "Ressourcen für Dekonstruktion"}
          </h1>
          <p className="text-brand-text text-lg max-w-2xl mx-auto">
            {language === 'fr' ? "Une sélection de lectures et d'outils pour avancer dans ta démarche." : language === 'en' ? "A selection of readings and tools to advance your journey." : "Eine Auswahl an Lesungen und Werkzeugen, um Ihre Reise voranzutreiben."}
          </p>
        </div>

        <div className="grid gap-6">
          {resources.map((res, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border-rose-100 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-rose-500" />
                    <span className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
                      {res.type === 'book' ? (language === 'fr' ? 'Livre' : language === 'en' ? 'Book' : 'Buch') : (language === 'fr' ? 'Ressource' : language === 'en' ? 'Resource' : 'Ressource')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-deep mb-2">{res.title[language]}</h3>
                  <p className="text-brand-text text-lg mb-4">{res.desc[language]}</p>
                  <p className="text-sm text-muted-foreground italic">
                    {language === 'fr' ? 'Auteur : ' : language === 'en' ? 'Author : ' : 'Autor : '} {res.author}
                  </p>
                </div>
                <Button asChild variant="outline" className="shrink-0 border-rose-200 hover:bg-rose-50">
                  <a href={res.url} target="_blank" rel="noopener noreferrer">
                    {language === 'fr' ? 'Consulter' : language === 'en' ? 'View' : 'Ansehen'}
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