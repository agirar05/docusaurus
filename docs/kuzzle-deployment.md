---
title: Déploiement de Kuzzle dans Clever Cloud
---

Je vais vous présenter toutes les étapes nécessaires pour déployer Kuzzle dans Clever Cloud.

## Création du dépot

Tout d'abord, pour déployer Kuzzle dans Clever Cloud nous allons devoir utiliser [Docker](https://www.docker.com/). Pour cela, on va devoir créer un dépot sur [GitHub](https://github.com/) contenant un Dockerfile avec ceci à l'intérieur:

```Dockerfile
FROM kuzzleio/kuzzle:2
EXPOSE 7512
EXPOSE 1883
CMD ["kuzzle","start"]
```

Explications: ligne 1 on récupère l'[image Docker de kuzzle](https://hub.docker.com/r/kuzzleio/kuzzle), ligne 2 et 3 on expose les ports dont on aura besoin pour le bon fonctionnement de kuzzle et ligne 4 on démarre l'application.

## Création de l'application dans Clever Cloud

Maintenant que le dépot Kuzzle est créé, nous allons pouvoir créer notre application dans Clever Cloud.
![Add an application](/img/clever_add_application.PNG)

Ensuite, sélectionnez votre dépot dans la liste disponible, pour ma part je l'ai nommé "kuzzle".
![Select repo](/img/clever_select_repo.PNG)

Sur la page suivante, "What kind of application is it?", sélectionnez Docker, puis "Next". Vous pouvez alors nommer votre application et lui donner une description. Enfin choisissez la zone de l'infrastructure, puis cliquez sur "Create".

## Ajout des add-ons

Pour fonctionner, Kuzzle utilise [ElasticSearch](https://www.elastic.co/fr/elasticsearch/) et [Redis](https://redis.io/). Nous allons donc devoir ajouter 2 add-ons à notre application Kuzzle.

Pour ceci, une fois l'application créée dans Clever Cloud, celui-ci nous propose d'ajouter des add-ons.
![Select add-on](/img/clever_select_addon.PNG)

Commencez donc par ajouter un add-on ElasticSearch, choisissez la taille que vous voulez, nommez votre add-on et choisissez la version 7 de ElasticSearch. Enfin ne sélectionnez aucune option et créez l'add-on.

Faites maintenant la même chose mais avec Redis, en pensant à linker l'add-on Redis avec l'application Kuzzle.

## Ajout des variables d'environnement

La dernière étape consiste à ajouter les variables d'environnement nécessaires pour l'application Kuzzle. Rendez-vous donc sur l'application Kuzzle, puis "Environment variables".
![Kuzzle env var](/img/clever_kuzzle_env.PNG)

Par défaut, il y a une seule variable "PORT" que vous allez devoir changer pour mettre 7512 au lieu de 8080.

Voici la liste des variables nécéssaires:
![Kuzzle complete env](/img/clever_kuzzle_env_complete.PNG)

Les variables **kuzzle_services__internalCache__node__host** et **kuzzle_services__memoryStorage__node__host** correspondent à la variable **REDIS_HOST** de l'add-on Redis que vous pouvez trouver juste en dessous dans la page.

Les variables **kuzzle_services__internalCache__node__password** et **kuzzle_services__memoryStorage__node__password** correspondent à la variable **REDIS_PASSWORD**.

Les variables **kuzzle_services__internalCache__node__port** et **kuzzle_services__memoryStorage__node__port** correspondent à la variable **REDIS_PORT**.

La variable **kuzzle_services__storageEngine__client__node** correspond à la variable **ES_ADDON_URI** de l'add-on ElasticSearch.

Une fois toutes les variables implémentées, appuyez sur "Update changes". Vous pouvez maintenant démarrer votre application Kuzzle.

## Vérification

Une fois que l'application est démarrée avec succès, vous pouvez vous rendre dans "Domain names" de l'application Kuzzle, puis cliquer sur le lien en bas de page pour vérifier que l'application est bel et bien démarrée et fonctionnelle.
