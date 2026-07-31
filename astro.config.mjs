// @ts-check
import { defineConfig } from 'astro/config';

// Site vitrine Atelier Acidulé — Astro, commerce hybride (paiement branché plus tard).
export default defineConfig({
  site: 'https://atelier-acidule.fr',
  devToolbar: { enabled: false },

  // L'ancien /catalogue est remplacé par le hub /creations. On redirige au lieu
  // de laisser un 404 : le lien a pu être partagé, et il est dans l'aperçu.
  redirects: {
    '/catalogue': '/creations',
  },
});
