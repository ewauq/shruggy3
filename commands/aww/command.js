import request from 'request-promise';
import Discord from 'discord.js';
import BaseCommand from '../';


class Command extends BaseCommand {

  constructor() {
    super('aww');
    this.reply_type = this.getProperties().reply_type;
    this.replies = this.getProperties().replies;
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        request('https://www.reddit.com/r/aww/hot.json?t=day&limit=5')
          .then((response) => {
            const json = JSON.parse(response);
            let post;

            // On récupère uniquement le premier topic non épinglé
            // pour éviter les annonces
            for (let i = 0; i < json.data.children.length; i++) {
              if (!json.data.children[i].data.stickied) {
                post = json.data.children[i].data;
                break;
              }
            }

            resolve({
              reply: this.getReply(this.replies, post),
              type: this.reply_type,
            });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = new Command();
