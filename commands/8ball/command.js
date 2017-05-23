import BaseCommand from '../';
import config from '../..//config.json';

class Command extends BaseCommand {

  constructor() {
    super('8ball');
    this.replies = this.getProperties().replies;
    this.errors = this.getProperties().errors;
  }

  execute(message) {
    return new Promise((resolve, reject) => {
      try {
        let final_reply;

        // On met tout en minuscule pour éviter les problèmes de casse.
        const input = message.content.toLowerCase();

        // Récupération de la question.
        const reg = new RegExp(`${config.command_prefix}[0-9a-z]+\\s(.+)`);
        const matches = input.match(reg);

        if (matches && matches.length > 0) {
          // On met la première lettre de la question en majuscule (pour le style).
          const question = `${matches[1].charAt(0).toUpperCase()}${matches[1].slice(1)}`;
          final_reply = `${question} : **${this.getReply(this.replies)}**`;
        } else {
          final_reply = this.getReply(this.errors);
        }

        this.reply = final_reply;
      } catch (error) {
        reject(error);
      }
      resolve(this.reply);
    });
  }

}

module.exports = new Command();
