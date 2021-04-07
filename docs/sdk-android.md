---
title: SDK JVM (Android)
---

Je vais vous présenter comment utiliser le SDK JVM, utilisé pour les applications Android avec Kuzzle v2.

Vous pouvez retrouver la documentation officielle [ici](https://docs.kuzzle.io/sdk/jvm/1/getting-started/java/).

Ce SDK supporte seulement le WebSocket, il est donc impossible d'utiliser le Http comme protocole de transfert de données.

## Création de l'application

Tout d'abord vous devez créer un nouveau projet avec Android Studio, vous pouvez trouver comment faire [ici](https://www.editions-eni.fr/open/mediabook.aspx?idR=c5aca137ce66a5ab3604f837032d24c6).

## Installation du SDK

Ensuite, une fois que vous avez créé votre projet, rendez vous dans le fichier ```build.gradle``` de ce dernier. Ajoutez-y les lignes suivantes:

```gradle
repositories {
    maven() {
        url  "https://dl.bintray.com/kuzzle/maven" 
    }
}
dependencies {
  compile 'io.kuzzle:sdk-jvm:1.2.0'
}
```

Une fois ces lignes ajoutées, une bannière apparaît en haut du fichier vous proposant de synchroniser (```Sync now```), faites-le. Aussi simple que cela puisse paraître, le SDK est maintenant installé et prêt à être utilisé.

Il vous reste toutefois une chose assez importante à faire, qui est autoriser votre application à utiliser internet. Pour ceci rendez vous dans votre ```AndroidManifest.xml``` et ajoutez cette ligne:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Tout est maintenant OK !

## Connection à la base

:::danger Attention
Aux dernières nouvelles il y a toujours un problème avec la fonction ```connect()``` de leur SDK, les développeurs sont sur le coup.
:::

Pour vous connecter à la base, vous devez donc créer un WebSocket, puis vous connecter comme ceci.

```js
try {
    WebSocket ws = new WebSocket("app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.cleverapps.io", 443);
    Kuzzle kuzzle = new Kuzzle(ws);
    kuzzle.connect();

    // DO SOMETHING

    kuzzle.disconnect();
} catch (Exception e) {
    e.printStackTrace();
}
```

Le port par défaut est le 7512, que vous devrez utiliser si vous hébergez Kuzzle en local, mais puisque dans mon cas Kuzzle est hébergé dans Clever Cloud, je dois utiliser le port 443.

## Exemples de syntaxes pour la création/recherche de données

### Création d'un index

```js
try {
    WebSocket ws = new WebSocket("app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.cleverapps.io", 443);
    Kuzzle kuzzle = new Kuzzle(ws);
    kuzzle.connect();

    kuzzle.getIndexController().create("mon-index").get();

    kuzzle.disconnect();
} catch (Exception e) {
    e.printStackTrace();
}
```

### Création d'une collection

```js
try {
    WebSocket ws = new WebSocket("app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.cleverapps.io", 443);
    Kuzzle kuzzle = new Kuzzle(ws);
    kuzzle.connect();

    kuzzle.getCollectionController.create("mon-index", "ma-collection").get();

    kuzzle.disconnect();
} catch (Exception e) {
    e.printStackTrace();
}
```

### Création d'un document

```js
try {
    WebSocket ws = new WebSocket("app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.cleverapps.io", 443);
    Kuzzle kuzzle = new Kuzzle(ws);
    kuzzle.connect();

    Map<String, Object> document = new HashMap<>();
    document.put("prenom", "alexandre");
    document.put("nom", "girard");

    Map<String, Object> result = kuzzle.getDocumentController().create("mon-index", "ma-collection", document).get();

    kuzzle.disconnect();
} catch (Exception e) {
    e.printStackTrace();
}
```
