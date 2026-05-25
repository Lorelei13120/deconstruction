/**
 * Utilitaire de débogage pour la Roue des Émotions
 * 
 * Activez le débogage en passant `?debug=wheel` dans l'URL
 * Ou appelez `window.__wheelDebug.enable()` depuis la console
 */

interface DebugConfig {
  enabled: boolean;
  logRender: boolean;      // Log les étapes de rendu
  logClicks: boolean;      // Log les clics et détection
  visualizeAngles: boolean; // Affiche les zones angulaires sur le canvas
}

class WheelDebugger {
  private config: DebugConfig = {
    enabled: false,
    logRender: false,
    logClicks: false,
    visualizeAngles: false,
  };

  constructor() {
    // Vérifier si le débogage est activé via URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.has('debug')) {
        this.enable();
      }
      // Exposer dans window pour contrôle manuel
      (window as any).__wheelDebug = this;
    }
  }

  enable() {
    this.config.enabled = true;
    this.config.logRender = true;
    this.config.logClicks = true;
    console.log('%c🎡 WHEEL DEBUGGER ENABLED', 'background: #8B5CF6; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
    console.log('Commandes disponibles:');
    console.log('  window.__wheelDebug.enable()');
    console.log('  window.__wheelDebug.disable()');
    console.log('  window.__wheelDebug.toggleVisuals()');
    console.log('  window.__wheelDebug.getConfig()');
  }

  disable() {
    this.config.enabled = false;
    console.log('%c🎡 WHEEL DEBUGGER DISABLED', 'background: #888; color: white; padding: 5px 10px; border-radius: 3px;');
  }

  toggleVisuals() {
    this.config.visualizeAngles = !this.config.visualizeAngles;
    console.log(`📊 Visualisation des angles: ${this.config.visualizeAngles ? 'ON' : 'OFF'}`);
  }

  getConfig() {
    return { ...this.config };
  }

  isEnabled() {
    return this.config.enabled;
  }

  isRenderLogging() {
    return this.config.enabled && this.config.logRender;
  }

  isClickLogging() {
    return this.config.enabled && this.config.logClicks;
  }

  shouldVisualizeAngles() {
    return this.config.enabled && this.config.visualizeAngles;
  }

  // Logging utilities
  logRenderStart(canvasSize: { width: number; height: number }) {
    if (!this.isRenderLogging()) return;
    console.group('%c🎨 WHEEL RENDER', 'background: #60A5FA; color: white; padding: 3px 8px; border-radius: 2px; font-weight: bold;');
    console.log(`Canvas size: ${canvasSize.width}x${canvasSize.height}`);
  }

  logRenderEnd() {
    if (!this.isRenderLogging()) return;
    console.log('%c✓ Render complete', 'color: #10B981; font-weight: bold;');
    console.groupEnd();
  }

  logFamilyRender(familyName: string, index: number, startAngle: number, endAngle: number, subcatCount: number) {
    if (!this.isRenderLogging()) return;
    const startDeg = (startAngle * 180) / Math.PI;
    const endDeg = (endAngle * 180) / Math.PI;
    console.log(`  ${index}. ${familyName}: [${startDeg.toFixed(1)}°, ${endDeg.toFixed(1)}°] (${subcatCount} subcats)`);
  }

  logClickStart(pixelPos: { x: number; y: number }, polarPos: { angle: number; distance: number }) {
    if (!this.isClickLogging()) return;
    const angleDeg = (polarPos.angle * 180) / Math.PI;
    console.group('%c🖱️ CLICK DETECTION', 'background: #F97316; color: white; padding: 3px 8px; border-radius: 2px; font-weight: bold;');
    console.log(`Pixel position: (${pixelPos.x.toFixed(0)}, ${pixelPos.y.toFixed(0)})`);
    console.log(`Polar: angle=${angleDeg.toFixed(2)}° (${polarPos.angle.toFixed(4)} rad), distance=${polarPos.distance.toFixed(0)}`);
  }

  logFamilyDetection(familyName: string, index: number, angle: number, angleRange: [number, number]) {
    if (!this.isClickLogging()) return;
    const angleDeg = (angle * 180) / Math.PI;
    const rangeDeg = angleRange.map(a => ((a * 180) / Math.PI).toFixed(1)).join(', ');
    console.log(`✓ Family detected: ${familyName} (index=${index}) at ${angleDeg.toFixed(2)}° [${rangeDeg}°]`);
  }

  logSubcatDetection(subcatName: string, index: number, angle: number, angleRange: [number, number]) {
    if (!this.isClickLogging()) return;
    const angleDeg = (angle * 180) / Math.PI;
    const rangeDeg = angleRange.map(a => ((a * 180) / Math.PI).toFixed(1)).join(', ');
    console.log(`✓ Subcategory detected: ${subcatName} (index=${index}) at ${angleDeg.toFixed(2)}° [${rangeDeg}°]`);
  }

  logChildDetection(childName: string, index: number, angle: number, angleRange: [number, number]) {
    if (!this.isClickLogging()) return;
    const angleDeg = (angle * 180) / Math.PI;
    const rangeDeg = angleRange.map(a => ((a * 180) / Math.PI).toFixed(1)).join(', ');
    console.log(`✓ Emotion detected: ${childName} (index=${index}) at ${angleDeg.toFixed(2)}° [${rangeDeg}°]`);
  }

  logFinalSelection(family: string, subcat: string, emotion: string) {
    if (!this.isClickLogging()) return;
    console.log(`%c✓ FINAL: ${family} > ${subcat} > ${emotion}`, 'background: #10B981; color: white; padding: 2px 6px; border-radius: 2px; font-weight: bold;');
    console.groupEnd();
  }

  logZoneInfo(zones: { radiusCenterInner: number; radiusCenterOuter: number; radiusMiddle: number; radiusOuter: number }, distance: number) {
    if (!this.isClickLogging()) return;
    console.log(`Zones: inner=${zones.radiusCenterInner.toFixed(0)}, outer=${zones.radiusCenterOuter.toFixed(0)}, middle=${zones.radiusMiddle.toFixed(0)}, edge=${zones.radiusOuter.toFixed(0)}`);
    console.log(`Distance: ${distance.toFixed(0)}`);
    if (distance <= zones.radiusCenterInner) {
      console.log('→ Zone: CENTER (ignored)');
    } else if (distance <= zones.radiusCenterOuter) {
      console.log('→ Zone: FAMILY ANNULUS');
    } else if (distance <= zones.radiusMiddle) {
      console.log('→ Zone: SUBCATEGORY RING');
    } else {
      console.log('→ Zone: EMOTION OUTER RING');
    }
  }

  logError(message: string, details?: any) {
    if (!this.config.enabled) return;
    console.error(`%c❌ ${message}`, 'background: #EF4444; color: white; padding: 3px 8px; border-radius: 2px; font-weight: bold;', details);
  }
}

export const wheelDebugger = new WheelDebugger();
