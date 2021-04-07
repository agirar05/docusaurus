---
title: SDK Javascript
---

Je vais vous présenter comment utiliser le SDK Javascript de Kuzzle v2 dans une application React Js.

Vous pouvez retrouver la documentation officielle [ici](https://docs.kuzzle.io/sdk/js/7/getting-started/node-js/).

## Création de l'application

Tout d'abord, nous allons créer une nouvelle application React en utilisant [create-react-app](https://fr.reactjs.org/docs/create-a-new-react-app.html).

```sh
npx create-react-app kuzzle-react
cd kuzzle-react
```

## Installation du SDK

Ensuite, une fois que vous avez créé votre application React, rendez vous à la racine du projet, puis téléchargez le SDK

```sh
npm install kuzzle-sdk
```

## Connexion à la base

Maintenant que le SDK est téléchargé et prêt à être utilisé, nous allons créer un fichier ```init.js```, dans un nouveau dossier que vous nommerez comme vous le souhaitez, dans le répertoire ```src```.

Pour ma part, je vais le créer dans un dossier que je vais nommer ```Kuzzle```.

Ajoutez le contenu suivant au fichier ```init.js```:

```js
const {
    Kuzzle,
    WebSocket
} = require('kuzzle-sdk');

const options = {
    port: 443
};

const kuzzle = new Kuzzle(
  new WebSocket('app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.cleverapps.io', options)
);

export default kuzzle;
```

Le port par défaut est le 7512, que vous devrez utiliser si vous hébergez Kuzzle en local, mais puisque dans mon cas Kuzzle est hébergé dans Clever Cloud, je dois utiliser le port 443.

Maintenant que Kuzzle est prêt à être importé n'importe où dans votre projet, il vous suffira de l'importer de la manière qui suis pour pouvoir l'utiliser.

```js
import kuzzle from '../../init'
```

En changeant bien évidemment la valeur du 'from' en fonction d'où vous vous situez dans votre projet.

## Exemples de syntaxes pour la création/recherche de données

### Création d'un index

```js
import kuzzle from '../Kuzzle/init';

try {
    await kuzzle.connect();
    await kuzzle.index.create('mon-index');
    await kuzzle.disconnect();
} catch (error) {
    console.log(error.message);
}
```

### Création d'une collection

```js
import kuzzle from '../Kuzzle/init';

try {
    await kuzzle.connect();
    await kuzzle.collection.create('mon-index', 'ma-collection');
    await kuzzle.disconnect();
} catch (error) {
    console.log(error.message);
}
```

### Création d'un document

```js
import kuzzle from '../Kuzzle/init';

try {
    await kuzzle.connect();
    const response = await kuzzle.document.create(
        'mon-index',
        'ma-collection',
        {
            id: 1,
            nom: 'girard',
            prenom: 'alexandre'
        }
    );
    await kuzzle.disconnect();
} catch (error) {
    console.log(error.message);
}
```

### Recherche de documents par query

```js
import kuzzle from '../Kuzzle/init';

try {
    await kuzzle.connect();
    const results = await kuzzle.document.search(
        'mon-index',
        'ma-collection',
        {
            query: {
                match: {
                    prenom: 'alexandre'
                }
            }
        }
    );
    console.log(results);
    await kuzzle.disconnect();
} catch (error) {
    console.log(error.message);
}
```

Pour voir un exemple d'utilisation concret, c'est par [ici](exemple-sdk-javascript) !
