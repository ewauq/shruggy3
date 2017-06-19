import request from 'request-promise';
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
        request('https://www.reddit.com/r/aww/top.json?t=day&limit=1')
          .then((response) => {
            const json = JSON.parse(response);

            const topic = {
              title: json.data.children[0].data.title,
              score: json.data.children[0].data.score,
              permalink: json.data.children[0].data.permalink,
              url: json.data.children[0].data.url,
            };

            resolve({
              reply: this.getReply(this.replies, topic),
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
