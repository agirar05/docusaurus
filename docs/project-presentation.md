---
title: Présentation du projet
slug: /
---

## Idée générale et démo cible

L'idée est d'utiliser une base de données Cloud avec des objets connectés ainsi que du web. Dans ce cas, l'objet connecté est un téléphone portable.

La démo cible est la suivante:
On a un utilisateur, il va effectuer une course à pied avec un suivis GPS à l'aide du téléphone, puis il va voir son parcours sur la page internet.

## Technologies utilisées

La base de données utilisée est Kuzzle, vous pouvez retrouver une présentation de cette technologie [ici](kuzzle-presentation). Le téléphone va envoyer les informations GPS dans kuzzle par une application Android, développée en Java. Enfin, le site web est un site React JS.
Kuzzle va être déployé dans Clever Cloud, dont vous pouvez voir la présentation [ici](clever-presentation).

## Infrastructure

Voici un schéma de l'infrastructure attendue du projet.
![Project infra](/img/project_infra.png)

## Liens utiles

- Miro (gestion de projet): <https://miro.com/welcomeonboard/DWMfHXujprJhKiULfNH0dpjLtqc3JYAmiwkr0qOdMxS1H5dxmT4ad3HBFY9KuvgD>
- Dépot Android: <https://forge.iut-larochelle.fr/agirar05/sport_tracker>
- Wireframing Android: <https://www.figma.com/file/EUmPPfDBFD5h1XcrDWt5nb/Sport-Tracker?node-id=0%3A1>
- Dépot React: <https://forge.iut-larochelle.fr/agirar05/pts_react>
- Wireframing React: <https://www.figma.com/file/QCShItPJYW9y91ZdnWAHEJ/PTS_React?node-id=0%3A1>
