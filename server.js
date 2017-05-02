import Discord from 'discord.js';
import colors from 'colors/safe';
import Events from './events/';
import Log from './libs/log';
import config from './config.json';


const bot = new Discord.Client();
const events = new Events(bot);
const log = new Log(process.env.NODE_ENV);

log.info('Lancement du bot en cours...');

Promise.all([events.load(), bot.login(config.token)])
  .then((debug) => {
    log.info('Le bot est maintenant connecté.');
    log.verbose(debug);
  })
  .catch((err) => {
    log.error(err.message);
    log.verbose(err);
  });

