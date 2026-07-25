# L’Institut — V4

Édition fondatrice de la revue du discernement éducatif.

## Déploiement GitHub / Cloudflare Pages

Décompresser le ZIP, puis envoyer **les fichiers eux-mêmes** à la racine du dépôt GitHub :

- `index.html`
- `styles.css`
- `app.js`
- `alan-yvon.jpg`
- `favicon.svg`
- `_headers`

Ne pas envoyer uniquement le ZIP. Cloudflare Pages redéploie automatiquement après le commit sur `main`.

## Vérification de la photo

Dans `index.html`, la photo est appelée par :

```html
<img src="alan-yvon.jpg" alt="Portrait d’Alan Yvon">
```

Le fichier `alan-yvon.jpg` se trouve au même niveau que `index.html`.
