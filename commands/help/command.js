import fs from 'fs';
import BaseCommand from '../';
import config from '../../config.json';

class Command extends BaseCommand {

  constructor() {
    super('help');
    this.description = this.getProperties().description;
    this.replies = this.getProperties().replies;
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        // Récupération de toutes les descriptions des commandes.
        let files = fs.readdirSync(`${__dirname}/../`);

        // Suppression du fichier index.js du tableau.
        files = files.filter(item => item !== 'index.js');

        let descriptions = '';

        files.forEach((file) => {
          const properties = require(`${__dirname}/../${file}/properties.json`);
          if (properties.description) {
            descriptions += `- **${config.command_prefix}${properties.triggers}** ${properties.description}\n`;
          }
        });

        // Création de la réponse.
        const reply = `${this.getReply(this.replies)}\n\n${descriptions}`;

        this.reply = reply;
      } catch (error) {
        reject(error);
      }
      resolve(this.reply);
    });
  }

}

module.exports = new Command();