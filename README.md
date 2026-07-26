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


## Correctif 1.0.1 — images Cloudflare

Les reproductions patrimoniales et le portrait sont désormais intégrés directement dans les pages HTML sous forme de données embarquées. Elles ne dépendent donc plus de chemins relatifs, de la casse des noms de fichiers ou de la présence du dossier `assets` lors du déploiement. Les fichiers JPEG originaux restent présents dans le projet pour archivage et réutilisation éditoriale.


## Correctif 1.0.2 — Safari iPhone

Les œuvres picturales sont servies comme de vrais fichiers JPEG dans `assets/art/`. Les longues URI Base64 ont été supprimées afin d’assurer leur affichage fiable dans Safari iOS, GitHub et Cloudflare Pages.

## Correctif 1.0.3 — portrait mobile
Le portrait de la page d’accueil utilise désormais le fichier `alan-yvon.jpg` plutôt qu’une donnée Base64. Le bloc « À propos » a été recomposé sur mobile avec un portrait circulaire discret (92 px sur iPhone), placé à côté du titre, afin que le contenu reste visible dès le premier écran.


## V1.1 — Les Regards
Ajout d’un index `regards.html`, de trois nouveaux Regards et d’un sous-menu complet dans la navigation.


## V1.1.1
Séparation éditoriale entre **Les Regards** (essais éducatifs) et **Le regard de l’art** (lectures d’œuvres). Ajout de quatre nouveaux Regards thématiques.
