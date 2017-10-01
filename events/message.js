import fs from 'fs';
import Log from '../libs/log';
import config from '../config.json';

const log = new Log(process.env.NODE_ENV);

module.exports = function (bot) {
  bot.on('message', (message) => {

    if(message.attachments.array().length) {
      console.log('[MESSAGE]', `<${message.attachments.first().filename}>`); // eslint-disable-line no-console
    }
    else {
      console.log('[MESSAGE]', message.content); // eslint-disable-line no-console
    }

    // Timer pour évaluer le temps d'éxécution d'une action.
    const timerStart = Date.now();

    /**
     *
     * Gestion des commandes.
     *
     */

    // Si le message est une commande qui n'est pas envoyée par le bot.
    if (message.content.startsWith(config.command_prefix) && !message.author.bot) {
      // On met tout en minuscule pour éviter les problèmes de casse.
      const input = message.content.toLowerCase();

      // Récupération de la commande.
      const reg = new RegExp(`${config.command_prefix}([0-9a-z]+)`);
      const trigger = input.match(reg)[1];

      log.verbose(`Commande <${trigger}> demandée...`);

      try {
        // Récupération de la liste des commandes.
        let files = fs.readdirSync(`${__dirname}/../commands/`);

        // Suppression du fichier index.js du tableau.
        files = files.filter(item => item !== 'index.js');

        let command = false;

        files.some((file) => {
          const properties = require(`${__dirname}/../commands/${file}/properties.json`);

          if (properties.triggers.includes(trigger)) {
            log.verbose(`Déclencheur trouvé pour la commande <${file}> [${properties.triggers}]`);

            command = require(`${__dirname}/../commands/${file}/command.js`);
            return true; // on sort
          }

          return false; // on continue
        });

        // Si la commande a été trouvée, on l'exécute.
        if (command) {
          command.execute(message)
            .then((response) => {
              switch (response.type) {
                case 'mention':
                  message.reply(response.reply)
                    .then(log.verbose(`Commande exécutée en ${Date.now() - timerStart}ms.`));
                  break;
                case 'private':
                  message.author.send(response.reply)
                    .then(log.verbose(`Commande exécutée en ${Date.now() - timerStart}ms.`));
                  break;
                case 'public':
                  message.channel.send(response.reply)
                    .then(log.verbose(`Commande exécutée en ${Date.now() - timerStart}ms.`));
                  break;
                default:
                  message.channel.send(response.reply)
                    .then(log.verbose(`Commande exécutée en ${Date.now() - timerStart}ms.`));
              }
            })
            .catch((error) => {
              log.error(
                'L\'execution de la commande a provoqué une erreur :',
                `   ${error}`,
              );
            });
        } else {
          log.verbose(`Aucune commande trouvée pour ${trigger}.`);
          message.reply('je ne connais pas cette commande. Utilises **!help** pour recevoir en MP la liste des commandes.');
        }
      } catch (error) {
        log.error(
          'L\'appel de la commande a provoqué une erreur :',
          `   ${error}`,
        );
      }
    }
  });
};
