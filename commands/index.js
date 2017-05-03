import Log from '../libs/log';

const log = new Log();

export default class BaseCommand {

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getProperties() {
    let properties;

    try {
      properties = require(`../commands/${this.name}/properties.json`);
    } catch (error) {
      log.error(
        `La récupération des propriétés de <${this.name}> a provoqué une erreur :`,
         `    ${error}`,
      );
    }

    return properties;
  }

  getReply(replies) {
    const rnd = Math.floor(Math.random() * replies.length);
    return replies[rnd];
  }

}
