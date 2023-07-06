const { settings } = require("../config/config");
const commands = require("../handlers/commands");

module.exports = {
  handleReady: (bot, session) => {
    try {
      console.log(`Bot is now online in ${session.room_info.room_name}.\nBot ID: ${session.user_id}\nOwner ID: ${session.room_info.owner_id}\nClient Limits: ${session.rate_limits.client}\nSocial Limits: ${session.rate_limits.socials}\nConnection ID: ${session.connection_id}\nSDK Version: ${session.sdk_version}`.cyan)
      const coords = settings.coordinates;
      const object = settings.object;

      if (settings.action === 'walk') {
        bot.move.walk(coords.x, coords.y, coords.z, coords.facing);
      } else if (settings.action === 'teleport') {
        bot.player.teleport(session.user_id, coords.x, coords.y, coords.z, coords.facing);
      } else if (settings.action === 'sit') {
        bot.move.sit(object.entity_id, object.anchor_ix)
      }
    } catch (error) {
      console.error(error);
    }
  },

  handleChat: (bot, user, message) => {
    try {
      console.log(`[MESSAGE]: ${user.username}:${user.id}`, message);
      if (message.startsWith(settings.prefix)) {
        const command = message.slice(settings.prefix.length).split(' ')[0];
        const availablecommands = ['come', 'emoteall'];
        switch (command) {
          case 'come':
            commands.commandCome(bot, user, message);
            break;
          case 'emoteall':
            commands.commandEmoteAll(bot, user, message);
            break;
          default:
            bot.whisper.send(user.id, `Invalid command: ${command}\nAvailable Commands: ${availablecommands.join(", ")}`)
        }
      } else if (message.trim() === 'dance') {
        commands.commandEmote(bot, user, message);
      }
    } catch (error) {
      console.error(error);
    }
  },

  handleWhisper: (bot, user, message) => {
    try {
      console.log(`[WHISPER]: ${user.username}:${user.id}`, message);
    } catch (error) {
      console.error(error);
    }
  },

  handleDirectMessages: (bot, user, data) => {
    try {
      // Process the direct message event
      console.log('Direct message received');
      console.log('User ID:', user);
      console.log('Conversation ID:', data.id);
      console.log('Is New:', data.isNew);

      // Perform additional actions or responses based on the message
    } catch (error) {
      console.error(error);
    }
  },

  handlePlayerJoin: (bot, user) => {
    try {
      console.log(`[PLAYER JOINED]: ${user.username}:${user.id}`)
    } catch (error) {
      console.error(error);
    }
  },

  handlePlayerLeave: (bot, user) => {
    try {
      console.log(`[PLAYER LEFT]: ${user.username}:${user.id}`)
    } catch (error) {
      console.error(error);
    }
  },

  handlePlayerEmotes: (bot, sender, receiver, emote) => {
    try {
      const today = new Date();
      console.log(`${sender.username} sent ${emote} to ${receiver.username} at ${today}`);
    } catch (error) {
      console.error(error);
    }
  },

  handlePlayerReactions: (bot, sender, receiver, reaction) => {
    try {
      console.log(`${sender.username} sent ${reaction} to ${receiver.username}`);
    } catch (error) {
      console.error(error);
    }
  },

  handlePlayerTips: (bot, sender, receiver, item) => {
    try {
      console.log(`Tip reaction from ${sender.username} to ${receiver.username}: ${item.amount} ${item.type}`);
    } catch (error) {
      console.error(error);
    }
  },

  handlePlayerMovements: (bot, user, position) => {
    try {
      if ('x' in position && 'y' in position && 'z' in position && 'facing' in position) {
        console.log(`${user.username} moved to coordinates: ${position.x}, ${position.y}, ${position.z}, ${position.facing}`);
      } else if ('entity_id' in position && 'anchor_ix' in position) {
        console.log(`${user.username} moved to anchor ${position.entity_id} at index ${position.anchor_ix}`);
      }
    } catch (error) {
      console.error(error);
    }
  },

  handleVoiceChat: (bot, users, seconds_left) => {
    try {
      console.log(`Seconds Left: ${seconds_left}`)
      console.log('Users:');
      users.forEach(({ user, status }) => {
        console.log('User ID:', user.id);
        console.log('Username:', user.username);
        console.log('Status:', status);
        console.log('---');
      });
    } catch (error) {
      console.error(error);
    }
  },

  handleErrors: (error) => {
    try {
      console.log(`Highrise API Request Error:`, error);
    } catch (error) {
      console.error(error);
    }
  }
}