---
title: Exemple d'utilisation de Kuzzle avec le SDK Javascript
---

Je vais maintenant vous présenter un exemple d'utilisation concret du SDK Javascript de Kuzzle. Vous devez d'abord avoir fait les étapes présentes dans [cette doc](sdk-javascript).

## Présentation du cas

L'objectif de ce cas va être assez simple, récupérer les données de géolocalisation d'une activité réalisée, afin d'afficher le parcours réalisé sur une carte.

Notre base est donc déjà remplie de données, avec un index nommé ```sport_tracker```, ainsi que deux collections ```activity``` et ```position```.

La collection ```activity``` contient 1 document, avec un id et le nom du sport, mais on ne va pas en avoir spécialement besoin ici.

La collection ```position``` va contenir plusieurs documents, dans mon cas 9, avec un champ id, un champ id d'activité, un champ position (geo_point) avec latitude et longitude, ainsi qu'un champ timestamp.

Ces 9 documents de position correspondent donc à l'activité présente dans la collection ```activity```, et ils vont me permettre d'afficher la route que l'utilisateur a parcouru.

## Récupération des données

Mon objectif ici va donc être de récupérer toutes les positions d'une certaine activité, dans mon cas toutes les positions de l'activité avec l'id ```1```.

Je vais donc effectuer cette récupération dans un [useEffect](https://fr.reactjs.org/docs/hooks-effect.html), afin que les données soient récupérées lors de la construction de la page.

La requête est toute simple, je récupère toutes les positions dont le champ ```activity``` vaut 1.
```js
console.log("Trying to get data");
await kuzzle.connect();
const response = await kuzzle.document.search(
    'sport_tracker',
    'position',
    {
        query: {
            match: {
                activity: 1
            }
        }
    }
);
console.log(response);
kuzzle.disconnect();
```

Voici les logs, avec l'objet retourné par Kuzzle

![React logs](/img/kuzzle_javascript_logs.PNG)

On peut voir que les 9 documents ```position``` sont dans un champ nommé ```hits```. On va alors faire un trie de ces données en fonction de leur timestamp, pour permettre par la suite d'afficher la route.

```js
// Je récupère les documents
const positions = response.hits;
// Je trie en fonction du timestamp
positions.sort(function(x, y){
    return x._source.timestamp - y._source.timestamp;
});
```

Je vais maintenant récupérer la latitude et la longitude de chaque document pour ensuite dessiner la route sur la carte.

```js
const sortedPositionsValues = [];
positions.map((item) => {
    sortedPositionsValues.push([item._source.position.lat, item._source.position.lon]);
});
```

Enfin je vais utiliser des [useStates](https://fr.reactjs.org/docs/hooks-effect.html) pour stocker les données obtenues et triées, et y avoir accès dans toute le composant React.

On va donc avoir un composant qui ressemble pour l'instant à ceci:

```js
import React, { useState, useEffect } from 'react';
import kuzzle from '../Kuzzle/init';

function RoadMapActivity() {
    const [dataIsReady, setDataIsReady] = useState(false);
    const [positions, setPositions] = useState([]);

    useEffect(async () => {
        console.log("trying to get data");
        await kuzzle.connect();
        const response = await kuzzle.document.search(
            'sport_tracker',
            'position',
            {
                query: {
                    match: {
                        activity: 1
                    }
                }
            }
        );
        console.log(response);
        kuzzle.disconnect();
        
        const positions = response.hits;
        positions.sort(function(x, y){
            return x._source.timestamp - y._source.timestamp;
        });

        const sortedPositionsValues = [];
        positions.map((item) => {
            sortedPositionsValues.push([item._source.position.lat, item._source.position.lon]);
        });

        setPositions(sortedPositionsValues);
        setDataIsReady(true);
    }, []);

    return(
        <div>
        </div>
    )
}

export default RoadMapActivity;
```

On va donc maintenant pouvoir utiliser les données dans le ```return``` de la fonction React.

## Affichage de la carte

Pour la carte je vais utiliser [React Leaflet](https://react-leaflet.js.org/).
Je vais donc simplement avec une carte, avec pour centre la première position dans la liste, puis je vais utiliser leur composant ```Polyline``` pour tracer une route sur la carte. Enfin je vais afficher deux marqueurs, un au début du parcours et un à la fin.

Voici le code complet pour parvenir à ça:

```jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import kuzzle from '../Kuzzle/init';

import 'leaflet/dist/leaflet.css';
import './roadMapActivity.css';

// Les icones pour les marqueurs de début et de fin de parcours
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41], 
    iconAnchor: [12,41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Couleur du chemin tracé
const limeOptions = { color: 'lime' }

function RoadMapActivity() {
    const [dataIsReady, setDataIsReady] = useState(false);
    const [positions, setPositions] = useState([]);

    useEffect(async () => {
        console.log("trying to get data");
        await kuzzle.connect();
        const response = await kuzzle.document.search(
            'sport_tracker',
            'position',
            {
                query: {
                    match: {
                        activity: 1
                    }
                }
            }
        );
        console.log(response);
        kuzzle.disconnect();
        
        const positions = response.hits;
        positions.sort(function(x, y){
            return x._source.timestamp - y._source.timestamp;
        });

        const sortedPositionsValues = [];
        positions.map((item) => {
            sortedPositionsValues.push([item._source.position.lat, item._source.position.lon]);
        });

        setPositions(sortedPositionsValues);
        setDataIsReady(true);
    }, []);

    return(
        <div id="mapid">
            {dataIsReady && <MapContainer center={positions[0]} zoom={17} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline pathOptions={limeOptions} positions={positions} />
                <Marker position={positions[0]}>
                    <Popup>
                        Début
                    </Popup>
                </Marker>
                <Marker position={positions[positions.length - 1]}>
                    <Popup>
                        Fin
                    </Popup>
                </Marker>
            </MapContainer>}
            {!dataIsReady && <p>Données en cours de chargement</p>}
        </div>
    )
}

export default RoadMapActivity;
```

On peut voir qu'on affiche la carte uniquement lorsque les données sont récupérées, et qu'en attendant on affiche un message.

## Rendu final

Et voici donc ce qu'on obtient au bout du compte !

![Kuzzle javascript render](/img/kuzzle_javascript_render.PNG)