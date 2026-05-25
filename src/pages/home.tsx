import { useLanguage } from '@/lib/languageContext';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 py-8">
          <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-5xl font-bold text-brand-deep leading-tight">
            {language === 'fr' ? "Déconstruire pour mieux aimer" : language === 'en' ? "Deconstruct to Love Better" : "Dekonstruieren, um besser zu lieben"}
          </h1>
          <p className="text-xl text-brand-text max-w-2xl mx-auto leading-relaxed">
            {language === 'fr' 
              ? "Le patriarcat nous apprend à dominer plutôt qu'à prendre soin. Ce site est un outil pour apprendre à reconnaître nos émotions, déconstruire nos biais et construire des relations basées sur l'empathie et le consentement."
              : language === 'en'
              ? "Patriarchy teaches us to dominate rather than care. This site is a tool to learn to recognize our emotions, deconstruct our biases, and build relationships based on empathy and consent."
              : "Das Patriarchat lehrt uns zu dominieren statt zu fürsorgen. Diese Seite ist ein Werkzeug, um unsere Emotionen zu erkennen, unsere Vorurteile zu dekonstruieren und Beziehungen auf Empathie und Einvernehmlichkeit aufzubauen."}
          </p>
          <div className="pt-4">
            <Link to="/emotions">
              <Button className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                {language === 'fr' ? "Explorer la Roue des Émotions" : language === 'en' ? "Explore the Emotion Wheel" : "Rad der Emotionen erkunden"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Pourquoi Déconstruire ? */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-rose-100">
            <h2 className="text-3xl font-bold text-brand-deep mb-6">
              {language === 'fr' ? "Pourquoi déconstruire ?" : language === 'en' ? "Why Deconstruct?" : "Warum dekonstruieren?"}
            </h2>
            <div className="space-y-4 text-brand-text text-lg leading-relaxed">
              <p>
                {language === 'fr' 
                  ? "Nous grandissons tous avec des messages implicites sur ce que signifie être un homme ou une femme. Ces messages, souvent toxiques, nous empêchent de nous connecter authentiquement aux autres et à nous-mêmes."
                  : language === 'en'
                  ? "We all grow up with implicit messages about what it means to be a man or a woman. These often toxic messages prevent us from connecting authentically with others and ourselves."
                  : "Wir wachsen alle mit impliziten Botschaften darüber auf, was es bedeutet, Mann oder Frau zu sein. Diese oft toxischen Botschaften verhindern, dass wir uns authentisch mit anderen und uns selbst verbinden."}
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 marker:text-rose-500">
                <li>
                  {language === 'fr' ? "Apprendre à identifier et exprimer ses émotions sans honte." : language === 'en' ? "Learn to identify and express emotions without shame." : "Lernen, Emotionen ohne Scham zu identifizieren und auszudrücken."}
                </li>
                <li>
                  {language === 'fr' ? "Comprendre comment le patriarcat influence nos comportements relationnels." : language === 'en' ? "Understand how patriarchy influences our relational behaviors." : "Verstehen, wie das Patriarchat unser Beziehungsverhalten beeinflusst."}
                </li>
                <li>
                  {language === 'fr' ? "Développer des compétences pour prendre soin des autres (care)." : language === 'en' ? "Develop skills to care for others (care)." : "Fähigkeiten entwickeln, um sich um andere zu kümmern (Care)."}
                </li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="grid md:grid-cols-2 gap-6">
          <Link to="/ressources" className="group">
            <Card className="h-full bg-gradient-to-br from-rose-50 to-purple-50 p-6 rounded-3xl border-rose-100 hover:shadow-lg transition-all cursor-pointer">
              <h3 className="text-2xl font-bold text-brand-deep mb-3 group-hover:text-primary transition-colors">
                {language === 'fr' ? "Ressources & Lectures" : language === 'en' ? "Resources & Readings" : "Ressourcen & Lesungen"}
              </h3>
              <p className="text-brand-text">
                {language === 'fr' ? "Livres, brochures et articles pour approfondir ta démarche." : language === 'en' ? "Books, brochures, and articles to deepen your journey." : "Bücher, Broschüren und Artikel, um deine Reise zu vertiefen."}
              </p>
            </Card>
          </Link>
          <Link to="/map" className="group">
            <Card className="h-full bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-3xl border-purple-100 hover:shadow-lg transition-all cursor-pointer">
              <h3 className="text-2xl font-bold text-brand-deep mb-3 group-hover:text-accent transition-colors">
                {language === 'fr' ? "Créer un groupe MAP" : language === 'en' ? "Create a MAP Group" : "MAP-Gruppe gründen"}
              </h3>
              <p className="text-brand-text">
                {language === 'fr' ? "Guide pratique pour organiser des espaces d'entraide entre hommes." : language === 'en' ? "Practical guide to organizing mutual aid spaces for men." : "Praktischer Leitfaden zur Organisation von gegenseitigen Hilfsräumen für Männer."}
              </p>
            </Card>
          </Link>
        </section>

      </div>
    </div>
  );
};

export default HomePage;