import Log from '../libs/log';
import { random } from '../libs/random';

const log = new Log();

export default class BaseCommand {

  constructor(name) {
    this.name = name;
  }

  /**
   * Retourne le nom de la commande courrante.
   *
   * @returns {string} Le nom de la commande courrante.
   *
   * @memberof BaseCommand
   */
  getName() {
    return this.name;
  }

  /**
   * Retourne les propriétés de la commande courrante.
   *
   * @returns {object} Les propriétés de la commande.
   *
   * @memberof BaseCommand
   */
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

  /**
   * Choisit aléatoirement une réponse parmis les réponses données.
   * Si la réponse contient une ou plusieurs expressions, celles-ci sont choisies
   * aléatoirement puis la phrase est générée, et enfin retournée.
   *
   * @param {array} replies Les réponses disponibles.
   * @returns {string} La réponse finale.
   *
   * @memberof BaseCommand
   */
  getReply(replies, data = false) {
    const final_reply = [];
    const reply = replies[random(0, replies.length)];
    const parts = reply.split(/(\(.+?\))/g);

    parts.forEach((part) => {
      if (part.match(/(\(.+?\))/)) {
      // Si la phrase contient une expression.
        const words = part.replace(/[{()}]/g, '').split('|');
        final_reply.push(words[random(0, words.length)]);
      } else {
      // Sinon on la gère normalement.
        final_reply.push(part);
      }
    });

    // On gère les données à remplacer dans la réponse.
    if (data) {
      return final_reply
              .join('')
              .replace(/\{([a-z]+)\}/g, ($1, $2) => { return data[$2]; });
    }

    return final_reply.join('');
  }


}
