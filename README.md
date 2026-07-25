# L’Institut V3 — Édition fondatrice

Site statique prêt pour GitHub et Cloudflare Pages.

## Mise en ligne

1. Décompressez le ZIP.
2. Déposez **le contenu du dossier** à la racine de votre dépôt GitHub.
3. Dans Cloudflare Pages :
   - Framework preset : `None`
   - Build command : laisser vide
   - Build output directory : `.`
4. Déployez.

## À personnaliser avant publication

### Portrait
Ajoutez une image nommée `portrait.jpg`, puis remplacez dans `index.html` le bloc :

```html
<div class="portrait-placeholder">...</div>
```

par :

```html
<img class="portrait-photo" src="portrait.jpg" alt="Alan Yvon">
```

Ajoutez dans `styles.css` :

```css
.portrait-photo { width:100%; height:100%; object-fit:cover; object-position:center; }
```

### Rendez-vous
Dans `index.html`, remplacez :

`contact@votre-domaine.fr`

par votre adresse professionnelle, ou remplacez le lien `mailto:` par votre lien Calendly/Cal.com.

## Fonctionnalités incluses

- Accueil éditorial avec emplacement portrait
- Regard de la semaine
- Sources et recommandations
- Réflexion sauvegardée dans le navigateur
- Entretien guidé en cinq étapes
- Dossier de discernement imprimable en PDF
- Double sortie : réflexion autonome ou demande d’entretien
- Bibliothèque de trois fiches
- Responsive mobile
- Déploiement statique sans commande de build

## Limite du prototype

L’entretien est actuellement scénarisé dans le navigateur. Il ne s’agit pas encore d’une IA connectée.  
Pour une version publique avec IA, il faudra ajouter une API côté serveur, une politique de confidentialité, un cadre de conservation des données et des garde-fous adaptés aux situations sensibles.
