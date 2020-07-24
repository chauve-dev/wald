# Wald
Un framework web minimaliste basé sur express

## Important
Attention d'origine cette surcouche est un test que j'ai au final publié, si vous décidez de l'utiliser il faut prendre en compte que ce système est susceptible de subir de lourdes modifications. Ce sera donc à vos risque et péril.

## Par où commencer
Pour commencer à utiliser le framework il faut simplement fork le repo ou le cloner directement sur votre machine.

par la suite il existe trois commande npm
```
npm run start //lance la version compilé du programme (nécessite de run le build avant)
npm run dev //lance la version de développement (disponible dans ./src)
npm build //compile la version de dev dans ./dist
```

Ensuite un outil est fournis pour simplifier le développement je vous invite à lire la partie Forge du readme qui explique comment fonctionne l'outil.

## Structure
```
projet 
│
└─── src
    |     app/  -> contient les classe parente (controleur par défaut et autres)
    └─── controller
    |    |
    |    └─── middleware/   -> controleur de middlewares
    |    |
    |    └─── routes/       -> controleur de routes
    |    migrations/ -> Fichiers de migration (voir knex.js)
    └─── models -> models (générer depuis la forge)
    |
    └─── public -> tous les documents disponible coté client à l'adresse /
    |
    └─── views -> les vues Pug (générer depuis la forge)

```


## Fonctionnement
Wald fonctionne avec un système de routes similaire à angular, les routes sont spécifié en JSON dans route.ts et pointes vers un controleur.

Pour créer un nouveau controleur et une nouvelle vue (pug) il suffit d'utiliser la forge (voir plus bas).

Dans l'état le projet utilise Knex.js et objection.js pour l'ORM (object relation mapping) ainsi toutes les méthodes knex (knex migrate:latest par exemple) sont disponible.

## Logique
L'application inclu maintenant les middleWare qui s'éxecute sur une route définie avec une méthode (get, post, ...).
Mais la méthode index des contrôleurs de route n'est pas forcément une méthode de render et peut-être utilisé pour exécuter d'autres parties de code avant d'exécuter une méthode de render qui renvoie la page définitive, la structure sera déterminé par votre manière de coder et votre logique, il est tout à fait possible de tout mettre dans le contrôleur ou de créer des contrôleurs par fonctionnalité (authentification) qui seront appelés dans le contrôleur de vue.

Ainsi je ne recommande pas l'utilisation des middleware pour ce framework, sa fonctionne mais ce n'est pas l'idée voulu.
si vous voulez faire une page avec authentification /admin par exemple dans ce cas la il faudrait :
Créer un controleur Auth qui extend du controleur par défaut
Puis faire extend votre controleur de route sur le controleur auth

Ainsi vous pouvez implémenter les méthode d'authentification dans le controleur auth et le réutiliser plus tard.

## Routes
Les routes se trouve dans route.ts

## MiddleWare
Les middleWares se configure dans middlewares.ts
```
Une middleware prend des routes fixe ou dynamique
* middleware global
/x/* middleware global à x
/x middleware propre à x
```
## Erreur 404 ?
Dans l'état wald gère les erreur 404 avec le controleur errorController.ts qui dispose des même possibilité qu'un controleur de middleWare.

## Forge
Le forge est un simple script js qui s'occupe de créer les controleurs et vue avec l'aide d'une commande.
```
Cette commande crée le controleur ainsi que la vue pug
node forge controller/vue nom

Cette commande crée uniquement le controleur et le fait pointer sur index
node forge controller nom

Cette commande crée un nouveau model
node forge model nom

Cette commande crée un nouveau middleware
node forge middleware nom
```
## Socket.io
Wald inclus socket IO par défaut. le socket est déjà configuré sur le serveur web principal (5000 par défaut) il est possible de rajouter des évenements dans socket.ts

> La perfection commence par la perte de la masse capilaire inutile.