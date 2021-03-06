import fs from 'fs';

export default class Events {
  constructor(bot) {
    this.bot = bot;
  }

  load() {
    return new Promise((resolve, reject) => {
      try {
        // Récupération des fichiers de /events.
        fs.readdir('./events', (err, files) => {
          if (err) {
            reject(err);
            return;
          }

          // Appel de tous les fichiers contenu dans /events.
          files.forEach((file) => {
            if (file === 'index.js') return;
            require(`../events/${file}`)(this.bot);
          });

          resolve('success');
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
