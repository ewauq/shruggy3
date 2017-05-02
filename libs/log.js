import colors from 'colors/safe';

export default class Log {

  constructor(env) {
    this.env = env;
  }

  info(message) {
    console.info('[INFO]', message); // eslint-disable-line no-console
  }

  error(message) {
    console.error('[ERROR]', colors.red(message)); // eslint-disable-line no-console
  }

  warn(message) {
    console.log('[WARN]', colors.yellow(message)); // eslint-disable-line no-console
  }

  // Environnement de dev uniquement

  verbose(message) {
    if (this.env) return;
    console.log('[VERBOSE]', colors.grey(message)); // eslint-disable-line no-console
  }

  debug(message) {
    if (this.env) return;
    console.log('[DEBUG]', colors.grey(message)); // eslint-disable-line no-console
  }

}


// log.error({
//   message: `balbablabalba ${truc}`,
// });
