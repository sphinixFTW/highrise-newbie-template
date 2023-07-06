const { periodic } = require("../config/config");

module.exports = {
  sendPeriodicMessage: (bot) => {
    try {
      if (periodic.isEnabled) {
        setInterval(() => {
          const messages = periodic.messages
          if (periodic.type === 'single') {
            bot.message.send(messages[0]);
          } else if (periodic.type === 'multiple') {
            const randomIndex = Math.floor(Math.random() * messages.length);
            const randomMessage = messages[randomIndex];

            bot.message.send(randomMessage);
          }
        }, periodic.duration * 60 * 1000);
      }
    } catch (error) {
      console.error(error);
    }
  }
}