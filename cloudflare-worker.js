/**
 * Cloudflare Worker – Proxy Anthropic API
 * 
 * DÉPLOIEMENT (gratuit, 2 minutes) :
 * 1. Créez un compte sur https://workers.cloudflare.com
 * 2. Créez un nouveau Worker
 * 3. Collez ce code, cliquez "Save & Deploy"
 * 4. Ajoutez une variable d'environnement : ANTHROPIC_API_KEY = votre clé API
 * 5. Copiez l'URL du worker (ex: https://mon-proxy.xxx.workers.dev)
 * 6. Collez cette URL dans index.html à la ligne : const PROXY_URL = "..."
 */

export default {
  async fetch(request, env) {
    const ALLOWED_ORIGIN = '*'; // Restreignez à votre domaine GitHub Pages si souhaité

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        }
      });
    }
  }
};
