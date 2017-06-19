import request from 'request-promise';
import BaseCommand from '../';

class Command extends BaseCommand {

  constructor() {
    super('steamstatus');
    this.reply_type = this.getProperties().reply_type;
    this.replies = this.getProperties().replies;
  }

  execute() {
    return new Promise((resolve, reject) => {
      try {
        request('https://steamgaug.es/api/v2')
          .then((response) => {
            const json = JSON.parse(response);

            const data = {
              ping: json.SteamStore.time,
              error: json.SteamStore.error,
            };

            switch (json.SteamStore.online) {
              case 1:
                this.reply = `:white_check_mark: ${this.replies.online} (${data.ping}ms).`;
                break;
              case 2:
                this.reply = `:x: ${this.replies.offline}`;
                break;
              default:
                this.reply = `${this.replies.error} : ${data.error}`;
            }

            resolve({
              reply: this.reply,
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
