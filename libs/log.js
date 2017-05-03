import colors from 'colors/safe';

export default class Log {

  constructor(env) {
    this.env = env;
  }

  info(...messages) {
    messages.forEach((message) => {
      console.error('[INFO]', message); // eslint-disable-line no-console
    });
  }

  error(...messages) {
    messages.forEach((message) => {
      console.error('[ERROR]', colors.red(message)); // eslint-disable-line no-console
    });
  }

  warn(...messages) {
    messages.forEach((message) => {
      console.error('[WARNING]', colors.yellow(message)); // eslint-disable-line no-console
    });
  }

  // Environnement de dev uniquement

  verbose(...messages) {
    if (this.env) return;
    messages.forEach((message) => {
      console.error('[VERBOSE]', colors.grey(message)); // eslint-disable-line no-console
    });
  }

  debug(...messages) {
    if (this.env) return;
    messages.forEach((message) => {
      console.error('[DEBUG]', colors.grey(message)); // eslint-disable-line no-console
    });
  }

}
