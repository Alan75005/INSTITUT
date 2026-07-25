# L’Institut — Édition fondatrice 1.0

Site statique autonome, prêt pour GitHub et Cloudflare Pages.

## Déploiement Cloudflare Pages

1. Créer un dépôt GitHub et y déposer le contenu de ce dossier (pas le dossier parent).
2. Dans Cloudflare : Workers & Pages → Create → Pages → Connect to Git.
3. Sélectionner le dépôt.
4. Framework preset : **None**.
5. Build command : laisser vide.
6. Build output directory : `/` (ou laisser vide selon l’interface).
7. Déployer.

Le fichier `_headers` configure les principaux en-têtes statiques.

## Point d’entrée

`index.html`
