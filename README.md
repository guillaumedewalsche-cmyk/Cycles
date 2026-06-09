# 🍳 Chef du Jour — PWA de recettes IA

Application mobile PWA (Progressive Web App) qui génère une recette différente chaque jour grâce à l'IA Claude d'Anthropic.

---

## ✨ Fonctionnalités

- 🤖 Recette générée par IA (Claude Sonnet) à chaque ouverture
- 🔄 Bouton "Autre" pour générer une nouvelle recette
- 🔍 Mot-clé ou tag pour influencer la recette (végétarien, rapide, italien…)
- ❤️ Sauvegarde de recettes dans les favoris (stockage local)
- 📱 Installable sur Android / iOS depuis le navigateur
- 🔌 Fonctionne hors-ligne (recettes déjà chargées)

---

## 🚀 Déploiement en 3 étapes

### Étape 1 — Clé API Anthropic

1. Créez un compte sur https://console.anthropic.com
2. Générez une clé API
3. Gardez-la pour l'étape suivante

### Étape 2 — Proxy Cloudflare Worker (gratuit, ~2 min)

> Le proxy est nécessaire car les navigateurs bloquent les appels API directs depuis une PWA (restriction CORS).

1. Créez un compte gratuit sur https://workers.cloudflare.com
2. Cliquez **"Create Worker"**
3. Collez le contenu de `cloudflare-worker.js` dans l'éditeur
4. Cliquez **"Save & Deploy"**
5. Dans **Settings > Variables**, ajoutez :
   - Variable : `ANTHROPIC_API_KEY`
   - Valeur : votre clé API Anthropic
6. Copiez l'URL de votre worker (ex: `https://chef-proxy.monnom.workers.dev`)

### Étape 3 — GitHub Pages

1. Créez un dépôt GitHub (ex: `chef-du-jour`)
2. Uploadez tous les fichiers de ce dossier
3. Dans **Settings > Pages**, sélectionnez la branche `main` et le dossier `/root`
4. Votre app sera disponible sur `https://votre-pseudo.github.io/chef-du-jour/`

### Étape 4 — Connecter le proxy à l'app

Ouvrez `index.html` et remplacez ligne ~330 :
```js
const PROXY_URL = ""; // ← collez ici l'URL de votre Worker
```
Par :
```js
const PROXY_URL = "https://chef-proxy.monnom.workers.dev";
```

Commitez le changement. L'app est prête !

---

## 📱 Installer sur Android

1. Ouvrez l'URL GitHub Pages dans **Chrome**
2. Chrome affiche une bannière "Ajouter à l'écran d'accueil"
3. Ou menu ⋮ → **Ajouter à l'écran d'accueil**

## 📱 Installer sur iOS

1. Ouvrez l'URL dans **Safari**
2. Appuyez sur le bouton de partage ⬆️
3. **"Sur l'écran d'accueil"**

---

## 🗂 Structure des fichiers

```
chef-du-jour/
├── index.html           ← Application complète
├── manifest.json        ← Configuration PWA
├── sw.js                ← Service Worker (mode hors-ligne)
├── cloudflare-worker.js ← Proxy API (à déployer sur Cloudflare)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## 🔒 Sécurité

- Votre clé API Anthropic est stockée **uniquement** dans le Cloudflare Worker, jamais exposée dans le code côté client.
- Les données de recettes sauvegardées restent **sur votre appareil** (localStorage), aucun serveur.

---

## 🛠 Développement local

```bash
# Serveur local simple (Python)
python3 -m http.server 8080

# Puis ouvrez http://localhost:8080
```

> Note : le service worker ne s'enregistre qu'en HTTPS ou localhost.
