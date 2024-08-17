# comment utiliser le projet

- cloner le projet en local => git clone ...
- installer les dépendances => npm i (à faire en global, dans frontend, dans backend, dans images)
- créer les fichiers .env => il y en a un en global et un dans images

# mise en place

- aller dans le dossier backend et lancer la commande => npm run loadFixtures
- aller dans le dossier frontend et lancer la commande => npm run generate

# lancer le projet

- tout lancer => aller en global et lancer la commande => npm run dev

- le back => aller dans le dossier backend et lancer la commande => npm run start
- le front => aller dans le dossier frontend et lancer la commande => npm run dev
- le service d'image => aller dans le dossier images et lancer la commande => npm run start

# technos utilisées

- back => typescript, typeorm, graphql, typegraphql
- front => typescript, next, react
- images => express
- autres => docker

# lancer avec docker

- fixtures => décommenter le passage fixtures dans le fichier docker-compose.dev.yml (en global)
- lancer la commande : docker compose -f docker-compose.dev.yml up --build
- fixtures => recommenter le passage fixtures dans le fichier docker-compose.dev.yml (en global) sinon ça va relancer les fictures à chaque fois

# CI

- il vous faudra mettre des secrets dans votre repo github : DOCKERHUB_TOKEN, DOCKERHUB_USERNAME, JWT_EXPIRATION_TIME, SECRET_KEY
