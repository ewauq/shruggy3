import Discord from 'discord.js';

import Events from './events';


/**
 * Importation de la configuration.
 */
import config from './config.json';


const bot = new Discord.Client();
const events = new Events(bot);

const env = process.env.NODE_ENV;

console.info('[INFO]', 'Lancement du bot en cours...');

/**
 *
 */
Promise.all([events.load(), bot.login(config.token)])
  .then((debug) => {
    console.info('[INFO]', 'Le bot est maintenant connecté.');
    if (env !== 'production') console.log('[LOG]', debug);
  })
  .catch((err) => {
    console.error('[ERREUR]', err.message);
    if (env !== 'production') console.log('[LOG]', err);
  });

