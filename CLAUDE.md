# Projet Déconstruction — Contexte d'Opération et Garde-Fous Agentiques

Résolvez les problèmes sans introduire de régression ni de dette technique architecturale.

## I. Finalité

**Application** : `vite_react_shadcn_ts` — site vitrine éducatif multilingue (FR/DE/EN) sur la déconstruction patriarcale, l'empathie et le soin (care). Outil militant.
**Objectif métier** : Fournir des outils concrets (roue des émotions, guides, ressources) pour apprendre à prendre soin des autres et comprendre les mécanismes sociaux. Site statique déployé sur GitHub Pages (ou équivalent).
**Déploiement** : Site statique sur GitHub Pages (`https://lorelei13120.github.io/deconstruction/`). Pas pour l'instant.

## II. Architecture

**Modèle** : SPA React mono-page. Contenu statique géré via fichiers JSON/TS (pas de backend dynamique nécessaire sauf si formulaires spécifiques demandés).

**Topologie rapide** :
- `src/components/` — 
  - `Wheel/` : Composant Roue des émotions (rendu Canvas/SVG, interaction clic).
  - `ui/` : Composants shadcn personnalisés (boutons, cartes, modales).
  - `Layout/` : Header, Footer, LanguageSwitcher.
  - `Sections/` : IntroPatriarchy, ResourceCard, MapGuideStep, SchemaTable.
- `src/pages/` — Routes (`Home`, `Emotions`, `Ressources`, `MapGuide`, `Therapy`).
- `src/lib/` — `languageContext` (FR/DE/EN), `translations.ts` (clé de traduction), `utils.ts` (`cn`, formatters).
- `src/assets/data/` — 
  - `emotions.json` : Liste des émotions + descriptions (FR/DE/EN).
  - `resources.json` : Bibliographie (titres, auteurs, liens, tags).
- `public/` — Assets statiques (logos, illustrations, images, favicons)

## III. Pile Technologique

*Versions contraintes par `package.json`. N'introduisez aucune dépendance alternative sans approbation.*

- **Langage** : TypeScript 5.8 (strict), ESM
- **Framework** : React 19 + Vite 7
- **UI** : Tailwind 3.4 + shadcn/ui + Radix primitives + `lucide-react`
- **Routing** : `react-router-dom` v7 (HashRouter recommandé pour GitHub Pages)
- **i18n** : Maison via `LanguageContext` + `translations.ts` (FR/DE/EN)
- **Animation** : Logique de roue inspirée de `https://github.com/Lelio88/games-roulette` (Canvas ou SVG avec `requestAnimationFrame`).
- **Tests** : Vitest 3 + Testing Library + jsdom
- **Lint** : ESLint 9 flat config + `typescript-eslint`

## IV. Garde-Fous non négociables

1. **Chemin des assets** : Toujours préfixer par `import.meta.env.BASE_URL` pour la compatibilité GitHub Pages.
2. **i8n stricte** : Aucun texte visible dans le JSX. Tout passe par `t('clé')`. 
   - **Tri-langue** : Toute nouvelle clé doit avoir { fr, de, en }.
3. **Données Roue** : Les émotions et descriptions sont dans `src/assets/data/emotions.json`. Ne pas hardcoder dans le composant.
4. **Design Cocooning** : Utiliser les classes Tailwind `rounded-xl`, `shadow-lg`, `bg-rose-50`, `text-violet-900`. Éviter le design "corporate" froid.
5. **Immutabilité** : Pattern React standard (`prev => ...`). Pas de mutation directe.
6. **Accessibilité** : La roue des émotions doit être navigable au clavier et lisible par les lecteurs d'écran (ARIA labels).
7. **Confidentialité** : Aucune collecte de données. Pas de formulaires, pas de tracking, pas de cookies tiers.

## V. Flux de Travail (Explore → Plan → Code → Verify)

1. **Exploration** — Lire `https://github.com/Lelio88/games-roulette` pour comprendre la logique de rotation de la roue avant de coder.
2. **Planification** — Valider l'approche d'animation pour la roue (Canvas vs DOM) avant implémentation.
3. **Implémentation** — TypeScript strict, alias `@/` pour imports `src/`.
4. **Vérification** — `npm run lint` → `npm run test` → `npm run build`.

**Auto-documentation** — Tout nouveau module dans `src/lib/` ou `src/assets/data/` inclut un commentaire JSDoc expliquant la structure des données et les choix de conception.

## VI. Commandes de Développement

```bash
npm install              # installe les dépendances
npm run dev              # serveur Vite, port 8080, HMR
npm run build            # build production (avec base /hirondelles/)
npm run build:dev        # build mode développement
npm run preview          # preview du build local
npm run lint             # ESLint sur tout le repo
npm run test             # vitest run (one-shot)
npm run test:watch       # vitest watch
```

## VII. Maintenance documentaire

**Règle d'or** : le diff du code et le diff de la doc correspondante doivent être dans **le même commit**.

| Modification | Fichier à mettre à jour |
|---|---|
| Nouvelle langue (ex: ES) | `src/lib/translations.ts` + languageContext |
| Nouvelle émotion | `src/assets/data/emotions.json` |
| Nouvelle ressource | `src/assets/data/resources.json` |
| Changement de route | `src/App.tsx + docs/architecture.md` |

## VIII. Contexte de Session

- **Dernier focus** : —
- **Focus immédiat** : —Initialisation du projet, configuration de la palette rose/violet, et implimentationa de la roue des émotions basée sur `https://github.com/Lelio88/games-roulette`
- **Note importante** : Le terme "MAP" désigne ici "Men Against Patriarchy" (référence au site https://map-cph.ukrudt.net/), pas "Mutual Aid Practices". Adapter le contenu en conséquence.
