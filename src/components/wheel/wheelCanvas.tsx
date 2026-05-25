import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/languageContext';
import { wheelDebugger } from '@/lib/wheelDebug';
import emotionsData from '@/assets/data/emotions.json';

// Types basés sur la nouvelle structure JSON
interface EmotionChild {
  id: string;
  label: { fr: string; en: string; de: string };
  desc: { fr: string; en: string; de: string };
}

interface EmotionSubcategory {
  id: string;
  label: { fr: string; en: string; de: string };
  children: EmotionChild[];
}

interface EmotionGroup {
  id: string;
  label: { fr: string; en: string; de: string };
  color: string;
  subcategories: EmotionSubcategory[];
}

// Type pour l'élément sélectionné (peut être famille, sous-catégorie ou enfant)
type SelectedItem = 
  | { type: 'group'; data: EmotionGroup }
  | { type: 'subcategory'; data: EmotionSubcategory; parent: EmotionGroup }
  | { type: 'child'; data: EmotionChild; subcategory: EmotionSubcategory; parent: EmotionGroup };

const WheelCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const { language } = useLanguage();

  const groups = emotionsData.emotions as EmotionGroup[];
  
  // Calcul du nombre total de segments (sous-catégories) pour diviser le cercle
  // Chaque famille a plusieurs sous-catégories. On divise le cercle en fonction du nombre total de sous-catégories.
  const totalSubcategories = groups.reduce((acc, g) => acc + g.subcategories.length, 0);
  const segmentAngle = (2 * Math.PI) / totalSubcategories;

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 40; // Padding normal

    // Rayons pour les 3 cercles
    const radiusCenterInner = maxRadius * 0.15; // Cercle central intérieur
    const radiusCenterOuter = maxRadius * 0.25; // Anneau central (extérieur)
    const radiusMiddle = maxRadius * 0.55; // Cercle intermédiaire (Sous-catégories)
    const radiusOuter = maxRadius;         // Cercle extérieur (Émotions)

    ctx.clearRect(0, 0, width, height);

    // Calculer les angles proportionnels pour chaque famille
    const familyAngles: number[] = [];
    let currentFamilyAngle = 0;
    
    wheelDebugger.logRenderStart({ width, height });
    
    groups.forEach(group => {
      const familyAngle = (group.subcategories.length / totalSubcategories) * (2 * Math.PI);
      familyAngles.push(familyAngle);
      wheelDebugger.logFamilyRender(group.label.fr, groups.indexOf(group), currentFamilyAngle, currentFamilyAngle + familyAngle, group.subcategories.length);
      currentFamilyAngle += familyAngle;
    });

    let currentAngle = 0;
    let globalIndex = 0;

    // Dessiner les segments principaux (sous-catégories)
    groups.forEach((group) => {
      group.subcategories.forEach(subcat => {
        const startAngle = currentAngle;
        const endAngle = currentAngle + segmentAngle;
        const midAngle = (startAngle + endAngle) / 2;

        // 1. Dessiner le secteur de fond (couleur de la famille)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radiusOuter, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = group.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Texte Sous-catégorie (Cercle intermédiaire)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(midAngle);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px "Barlow Condensed", sans-serif';
        const subLabel = subcat.label[language];
        ctx.fillText(subLabel.length > 12 ? subLabel.substring(0, 10) + '..' : subLabel, radiusMiddle - 10, 4);
        ctx.restore();

        // 3. Textes Émotions (Cercle extérieur)
        if (subcat.children.length > 0) {
          const childAngleSize = segmentAngle / subcat.children.length;
          subcat.children.forEach((child, idx) => {
            const childStart = startAngle + idx * childAngleSize;
            const childMid = childStart + childAngleSize / 2;
            
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(childMid);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#000000';
            ctx.font = '11px "Barlow Condensed", sans-serif';
            const childLabel = child.label[language];
            ctx.fillText(childLabel.length > 10 ? childLabel.substring(0, 8) + '..' : childLabel, radiusOuter - 25, 3);
            ctx.restore();
          });
        }

        currentAngle += segmentAngle;
        globalIndex++;
      });
    });

    // 4. Dessiner l'anneau central avec les 6 familles proportionnelles
    currentAngle = 0;
    groups.forEach((group, groupIdx) => {
      const familyAngle = familyAngles[groupIdx];
      const startAngle = currentAngle;
      const endAngle = currentAngle + familyAngle;
      const midAngle = (startAngle + endAngle) / 2;

      // Dessiner le secteur coloré de la famille
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radiusCenterOuter, startAngle, endAngle);
      ctx.lineWidth = 2;
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = group.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Texte du nom de la famille au centre de son secteur
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(midAngle);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 17px "Barlow Condensed", sans-serif';
      const familyLabel = group.label[language];
      const textRadius = radiusCenterInner + (radiusCenterOuter - radiusCenterInner) * 0.05; // Rapprocher du centre
      ctx.fillText(familyLabel, textRadius, 4);
      ctx.restore();

      currentAngle = endAngle;
    });

    // 5. Ajouter les lignes radiales blanches épaisses entre les familles
    currentAngle = 0;
    groups.forEach((_group, idx) => {
      const familyAngle = familyAngles[idx];
      currentAngle += familyAngle;

      // Ne pas dessiner de ligne après la dernière famille (elle sera à 2π)
      if (idx < groups.length - 1) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(currentAngle) * radiusCenterInner, centerY + Math.sin(currentAngle) * radiusCenterInner);
        ctx.lineTo(centerX + Math.cos(currentAngle) * radiusOuter, centerY + Math.sin(currentAngle) * radiusOuter);
        ctx.stroke();
      }
    });

    // 6. Ajouter des lignes radiales fines entre les enfants (émotions finales)
    currentAngle = 0;
    groups.forEach(group => {
      group.subcategories.forEach(subcat => {
        if (subcat.children.length > 0) {
          const childAngleSize = segmentAngle / subcat.children.length;
          
          // Pour chaque enfant sauf le dernier dans sa sous-catégorie, dessiner une ligne
          for (let i = 0; i < subcat.children.length - 1; i++) {
            const lineAngle = currentAngle + (i + 1) * childAngleSize;
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerX + Math.cos(lineAngle) * radiusMiddle, centerY + Math.sin(lineAngle) * radiusMiddle);
            ctx.lineTo(centerX + Math.cos(lineAngle) * radiusOuter, centerY + Math.sin(lineAngle) * radiusOuter);
            ctx.stroke();
          }
        }
        currentAngle += segmentAngle;
      });
    });

    wheelDebugger.logRenderEnd();
  }, [groups, language, segmentAngle, totalSubcategories]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Gestion du clic
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;
    const dist = Math.sqrt(x * x + y * y);
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 40;
    const radiusCenterInner = maxRadius * 0.15;
    const radiusCenterOuter = maxRadius * 0.25;
    const radiusMiddle = maxRadius * 0.55;

    if (dist > maxRadius) return; // Hors de la roue

    // Normaliser l'angle (0 à 2PI)
    let angle = Math.atan2(y, x);
    if (angle < 0) angle += 2 * Math.PI;

    // DEBUG: Log de départ
    wheelDebugger.logClickStart({ x, y }, { angle, distance: dist });
    wheelDebugger.logZoneInfo({ radiusCenterInner, radiusCenterOuter, radiusMiddle, radiusOuter: maxRadius }, dist);

    // Déterminer ce qui a été cliqué en fonction de la distance d'abord
    if (dist <= radiusCenterInner) {
      wheelDebugger.logError('Click on center (ignored)');
      return;
    }

    // Calculer les angles proportionnels des familles (même que drawWheel)
    const familyAngles: number[] = [];
    groups.forEach(group => {
      const familyAngle = (group.subcategories.length / totalSubcategories) * (2 * Math.PI);
      familyAngles.push(familyAngle);
    });

    // Trouver à quelle famille appartient cet angle
    let currentFamilyAngle = 0;
    let foundGroupIndex = -1;
    
    for (let i = 0; i < groups.length; i++) {
      const nextFamilyAngle = currentFamilyAngle + familyAngles[i];
      if (angle >= currentFamilyAngle && angle < nextFamilyAngle) {
        foundGroupIndex = i;
        const angleRange: [number, number] = [currentFamilyAngle, nextFamilyAngle];
        wheelDebugger.logFamilyDetection(groups[i].label.fr, i, angle, angleRange);
        break;
      }
      currentFamilyAngle = nextFamilyAngle;
    }

    // Cas spécial : si on est très proche de 2π, on est dans la dernière famille
    if (foundGroupIndex === -1 && angle > currentFamilyAngle) {
      foundGroupIndex = groups.length - 1;
      const angleRange: [number, number] = [currentFamilyAngle, 2 * Math.PI];
      wheelDebugger.logFamilyDetection(groups[foundGroupIndex].label.fr, foundGroupIndex, angle, angleRange);
    }

    if (foundGroupIndex === -1) {
      wheelDebugger.logError('No family found');
      return;
    }

    const foundGroup = groups[foundGroupIndex];

    if (dist <= radiusCenterOuter) {
      // Clic sur l'anneau central -> Famille
      wheelDebugger.logFinalSelection(foundGroup.label.fr, '—', '—');
      setSelectedItem({ type: 'group', data: foundGroup });
      return;
    }

    // Pour les zones intermédiaire et extérieure : déterminer la sous-catégorie
    // Calculer l'angle relatif dans la famille
    currentFamilyAngle = 0;
    for (let i = 0; i < foundGroupIndex; i++) {
      currentFamilyAngle += familyAngles[i];
    }
    const relativeAngleInFamily = angle - currentFamilyAngle;

    // Diviser l'angle de la famille en sous-catégories
    const subcatCount = foundGroup.subcategories.length;
    const subcatAngleSize = familyAngles[foundGroupIndex] / subcatCount;
    const subcatIndex = Math.floor(relativeAngleInFamily / subcatAngleSize);
    const foundSubcat = foundGroup.subcategories[Math.min(subcatIndex, subcatCount - 1)];
    
    const subcatStartAngle = currentFamilyAngle + subcatIndex * subcatAngleSize;
    const subcatEndAngle = subcatStartAngle + subcatAngleSize;
    wheelDebugger.logSubcatDetection(foundSubcat.label.fr, subcatIndex, relativeAngleInFamily, [subcatStartAngle, subcatEndAngle]);

    if (dist <= radiusMiddle) {
      // Clic sur le milieu -> Sous-catégorie
      wheelDebugger.logFinalSelection(foundGroup.label.fr, foundSubcat.label.fr, '—');
      setSelectedItem({ type: 'subcategory', data: foundSubcat, parent: foundGroup });
      return;
    }

    // Clic sur l'extérieur -> Émotion précise
    const childCount = foundSubcat.children.length;
    const childAngleSize = subcatAngleSize / childCount;
    const relativeAngleInSubcat = relativeAngleInFamily - (subcatIndex * subcatAngleSize);
    const childIndex = Math.floor(relativeAngleInSubcat / childAngleSize);
    
    const childStartAngle = subcatStartAngle + childIndex * childAngleSize;
    const childEndAngle = childStartAngle + childAngleSize;
    wheelDebugger.logChildDetection(foundSubcat.children[Math.min(childIndex, childCount - 1)].label.fr, childIndex, relativeAngleInSubcat, [childStartAngle, childEndAngle]);
    
    const child = foundSubcat.children[Math.min(childIndex, childCount - 1)];
    if (child) {
      wheelDebugger.logFinalSelection(foundGroup.label.fr, foundSubcat.label.fr, child.label.fr);
      setSelectedItem({ type: 'child', data: child, subcategory: foundSubcat, parent: foundGroup });
    }
  };

  // Générateur de texte pour la modale
  const renderModalContent = () => {
    if (!selectedItem) return null;

    let title = "";
    let subtitle = "";
    let desc = "";

    if (selectedItem.type === 'group') {
      title = selectedItem.data.label[language];
      subtitle = language === 'fr' ? "Famille d'émotions" : language === 'en' ? "Emotion Family" : "Emotionsfamilie";
      desc = language === 'fr' 
        ? `Cette famille regroupe des émotions liées à ${title.toLowerCase()}. Cliquez sur une tranche extérieure pour voir les nuances.`
        : language === 'en'
        ? `This family groups emotions related to ${title.toLowerCase()}. Click an outer slice to see nuances.`
        : `Diese Familie gruppiert Emotionen, die mit ${title.toLowerCase()} verbunden sind. Klicken Sie auf einen äußeren Abschnitt, um Nuancen zu sehen.`;
    } else if (selectedItem.type === 'subcategory') {
      title = selectedItem.data.label[language];
      subtitle = `${selectedItem.parent.label[language]} • ${language === 'fr' ? 'Sous-catégorie' : language === 'en' ? 'Subcategory' : 'Untergruppe'}`;
      desc = language === 'fr'
        ? `Ces émotions sont des variations de ${title.toLowerCase()}. Cliquez sur une émotion spécifique pour plus de détails.`
        : language === 'en'
        ? `These emotions are variations of ${title.toLowerCase()}. Click a specific emotion for more details.`
        : `Diese Emotionen sind Variationen von ${title.toLowerCase()}. Klicken Sie auf eine spezifische Emotion für mehr Details.`;
    } else {
      title = selectedItem.data.label[language];
      subtitle = `${selectedItem.subcategory.label[language]} • ${selectedItem.parent.label[language]}`;
      desc = selectedItem.data.desc[language];
    }

    return (
      <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-sm w-full pointer-events-auto border-rose-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-brand-deep">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedItem(null)}
            className="hover:bg-rose-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-brand-text text-lg leading-relaxed">{desc}</p>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          onClick={handleCanvasClick}
          className="cursor-pointer touch-none max-w-full h-auto"
        />
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              {renderModalContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-6 text-brand-text text-center max-w-md">
        {language === 'fr' 
          ? "Cliquez sur n'importe quelle zone (centre, milieu ou bord) pour voir les détails." 
          : language === 'en'
          ? "Click anywhere (center, middle, or edge) to see details."
          : "Klicken Sie überall hin (Mitte, Mitte oder Rand), um Details zu sehen."}
      </p>
    </div>
  );
};

export default WheelCanvas;