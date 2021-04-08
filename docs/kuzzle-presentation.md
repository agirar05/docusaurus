---
title: Présentation de Kuzzle
---

## Kuzzle, qu'est-ce que c'est ?

Kuzzle est une solution open-source française qui comprend de nombreuses fonctionnalités:

- un serveur évolutif
- une API multiprotocole
- une console d'administration
- un ensemble de plugins qui fournissent d'autres fonctionnalités telles que du pub/sub en temps réel, de la recherche ultra-rapide ou encore du géorepérage

Kuzzle peut être utilisé pour du Backend d'application mobiles, pour du Backend IoT, pour des applications web ou des PWA (Progressive Web App), ou encore pour être un Middleware.

Kuzzle est assez bien reconnu et est utilisé par certaines grandes entreprises, telles que la SNCF, le Crédit Agricole, ou encore Bouygues, et pleins d'autres...

## Ce que Kuzzle apporte

Le plus gros avantage de Kuzzle, est l'envoi/la réception de données en temps réel, mais il permet aussi la sécurisation de la base de données, avec gestion de rôles, authentification des utilisateurs, des règles de sécurité pour envoyer ou accéder aux données.

De plus Kuzzle dispose de SDK pour pouvoir l'intégrer rapidement et facilement à certains languages de programmation, tels que par exemple l'Android, le Javascript, le Go, le PHP, le c++ et le C#.

L'autre gros avantage est que Kuzzle est en open-source, ce qui permet de l'utiliser gratuitement en le faisant tourner sur son propre serveur.

Le site de Kuzzle nous apporte toute une documentation pour nous aider à le mettre en place et à l'utiliser.

## Pourquoi Kuzzle

J'ai décider d'utiliser cette solution pour faire d'une pierre deux coups. En effet, nous avons dans notre entreprise une problématique qui fait que nous allons devoir changer de base de données, et Kuzzle pourrait totalement convenir à nos besoins. J'ai donc décidé de l'utiliser pour mon PTS afin de tester cette technologie et voir si effectivement elle pourrait nous convenir ou non, voir si elle est facile à mettre en place ou non, en somme voir si elle pourrait répondre à notre problématique.

De plus, cette solution correspond totalement au cas d'utilisation de ce projet, c'est à dire la remontée d'informations depuis un appareil connecté puis la lecture sur une application web.

## Format de la base

Kuzzle fonctionne de la sorte suivante, une instance de Kuzzle contient des index, un index contient des collections, des collections contiennent des documents qui eux contiennent des champs.

![Kuzzle Database Format](/img/kuzzle_database_format.PNG)

Capture issue de la [documentation](https://docs.kuzzle.io/core/1/guides/essentials/store-access-data/).

## Liens utiles

- Site web: <https://kuzzle.io/>
- Documentation: <https://docs.kuzzle.io/>
