# Wald
Un framework web basé sur fastify, qui était d'orgine minimaliste.

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

## Structure
```
📦src
 ┣ 📂core
 ┃ ┣ 📂app                      -> Dossier pour les classes parente
 ┃ ┃ ┣ 📜controller.ts          -> controleur par défaut
 ┃ ┃ ┗ 📜extensionController.ts -> controleur d'extension par défaut
 ┃ ┣ 📜app.ts                   -> Coeur de l'application
 ┃ ┗ 📜instance.ts              -> Instance de l'application (singleton)
 ┣ 📂controller                 -> Dossier pour les controleurs
 ┃ ┗ 📂routes                   -> Dossier pour les controleurs de routes
 ┣ 📂public                     -> tous les documents disponible coté client à l'adresse /
 ┣ 📂views                      -> les vues Pug (générer depuis la forge)
 ┗ 📜route.ts                   -> fichier où sont enregistrés les routes

```


## Fonctionnement
Wald fonctionne avec un système de routes, les routes sont spécifié en JSON dans route.ts et pointes vers un controleur.

Pour créer un nouveau controleur et une nouvelle vue (pug) il suffit d'utiliser la forge (voir plus bas).

## Logique
L'application permet d'enregistrer du code custom avec le système d'extention (dossier extensions)

La méthode index des contrôleurs de route n'est pas forcément une méthode de render 
et peut-être utilisé pour exécuter d'autres parties de code avant d'exécuter une méthode de render qui renvoie la page définitive,
la structure sera déterminé par votre manière de coder et votre logique, il est tout à fait possible de tout mettre dans le contrôleur
ou de créer des contrôleurs par fonctionnalité (authentification) qui seront appelés dans le contrôleur de vue.

## Routes
Les routes se trouve dans route.ts
```
Une route se compose comme ceci :
 {path: "/", controller: "indexController::index", type: "get"}
 path étant le chemin
 controleur étant séparé en deux partie lecontroleur::laméthode
 type étant la méthode (get, post, put, delete)
 le controleur se trouve dans src/controller/routes/lecontroleur.ts
```

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

## TODO
- validateur et créateur de formulaire (extension)
- ajouter typeorm (extension)
- prévoir un système de migration (extension)
- Faker (extension)

> La perfection commence par la perte de la masse capilaire inutile.
