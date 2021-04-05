---
title: Accéder en admin à la base hébergée dans Clever Cloud
---

Je vais ici vous présenter les étapes pour accéder en mode admin à la base de données, afin de créer les index, créer les tables, gérer les rôles, la sécurité etc..

## Créez une connection

Rendez-vous sur la [console admin](https://console.kuzzle.io/) de Kuzzle, puis créez une nouvelle connexion.
![Kuzzle Admin create connection](/img/kuzzle_admin_create_connection.PNG)

Ajoutez un nom à votre connexion, puis dans **Hostname** vous devez donner le lien clever de l'application Kuzzle. Pour le trouver rendez-vous dans l'onglet "Domain names" de l'application, le lien se trouve en bas de page. Il doit ressembler à quelque chose du genre **app-xxxxxxx-xxxx-xxxx-xxxxxxxx.cleverapps.io**. Copiez ce lien et ajoutez le, en enlevant le "https://" au début et le "/" à la fin.

Ensuite sélectionnez la version 2 de Kuzzle, et mettez comme port 443.

:::danger NB

Si vous venez de créer votre application dans Clever Cloud, vous allez devoir attendre quelques temps que Clever finisse de passer l'application en https (En général quelques dizaines de minutes).
  
:::

## Créez votre premier admin

Une fois la connexion établie, vous allez devoir créer votre premier utilisateur admin.
![Kuzzle Admin Connection](/img/kuzzle_admin_connect.PNG)

Lisez le Warning et cliquez sur **that you create one**, puis suivez les étapes. Une fois l'admin créé, vous pouvez vous connecter avec.

![Kuzzle Admin Connected](/img/kuzzle_admin_connected.PNG)
Félicitations, vous êtes connecté à votre base de données, vous pouvez maintenant la gérer comme il vous plait !
