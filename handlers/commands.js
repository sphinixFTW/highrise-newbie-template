const { settings } = require("../config/config");

const moderators = settings.moderators; // Array of moderators from settings
const developers = settings.developers; // Array of developers from settings
const emotes = require("../config/emotes.json"); // Array of emotes loaded from emotes.json

module.exports = {
  commandCome: async (bot, user, message) => {
    try {
      if (developers.includes(user.username)) {
        const myPosition = await bot.room.players.cache.position(user.id); // Get position of the user
        if ('x' in myPosition) {
          bot.move.walk(myPosition.x, myPosition.y, myPosition.z, myPosition.facing); // Walk to the position
        }
      }
    } catch (error) {
      console.error(error); // Log any errors that occur
    }
  },

  commandEmote: async (bot, user, message) => {
    try {
      const randomIndex = Math.floor(Math.random() * emotes.length);
      const randomEmote = emotes[randomIndex]; // Get a random emote from the emotes array
      bot.player.emote(user.id, randomEmote); // Perform the emote for the user
    } catch (error) {
      console.error(error); // Log any errors that occur
    }
  },

  commandEmoteAll: async (bot, user, message) => {
    try {
      if (moderators.includes(user.username)) {
        const players = await bot.room.players.fetch(); // Fetch all the users in the room
        const randomIndex = Math.floor(Math.random() * emotes.length);
        const randomEmote = emotes[randomIndex]; // Get a random emote from the emotes array
        players.forEach((user) => {
          bot.player.emote(user[0].id, randomEmote); // Perform the emote for each user in the room
        })
      }
    } catch (error) {
      console.error(error); // Log any errors that occur
    }
  }
}
