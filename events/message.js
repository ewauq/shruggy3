module.exports = function (bot) {
  bot.on('message', (message) => {
    console.log(message.content);

    if (message.content === 'ping') {
      message.reply('pong');
      message.channel.sendMessage('pong');
    }
  });
};
