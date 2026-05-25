import WheelCanvas from '@/components/wheel/wheelCanvas';
import { Card } from '@/components/ui/card';

const EmotionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-rose-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-brand-deep mb-4">
              Roue des Émotions
            </h1>
            <p className="text-brand-text text-lg">
              Explorez vos sentiments et apprenez à les nommer.
            </p>
          </div>
          
          <WheelCanvas />
        </Card>
      </div>
    </div>
  );
};

export default EmotionsPage;