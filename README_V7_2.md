# L’École des Parents — V7.2 corrective

Correction Cloudflare Pages : suppression du fichier `_redirects` qui entrait en conflit avec la gestion automatique des URLs propres par Cloudflare Pages et provoquait une boucle de redirections sur `/precepteur` et `/bibliotheque`.

## Déploiement

Déployer directement le contenu de ce dossier à la racine du projet Cloudflare Pages.
Ne pas recréer de règle redirigeant `/precepteur` vers `/precepteur.html` ni `/bibliotheque` vers `/bibliotheque.html` : Cloudflare Pages gère automatiquement ces chemins.
