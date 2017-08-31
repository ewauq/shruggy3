# Shruggy v3

Bot Discord utilisant le module `discord.js`.

### Comment ça marche ?

* Installez les packages Node avec `npm install` ;
* Ajoutez le token dans le fichier `config.dist.json` et renommez-le en `config.json` ;
* Lancez le bot avec `npm start` (Windows) ou `npm run unix` (Linux & Mac).

### Redémarrage automatique
* Installez `forever` ;
* Lancez le bot avec forever : `forever --minUptime 10000 --spinSleepTime 10000 -c "node -r babel-register" server.js`.

Le bot se relancera tout seul toutes les 10 secondes en cas de crash.

### Documentation
* https://yorkaargh.gitbooks.io/discord-js-bot-guide/content/adding-a-configjson-file.html
