// Import necessary modules from the "highrise.sdk" package
const { Highrise, GatewayIntentBits, WebApi } = require("highrise.sdk");

// Import settings for the bot
const { authentication } = require("./config/config");
const { handleReady, handleChat, handleWhisper, handleDirectMessages, handlePlayerJoin, handlePlayerLeave, handlePlayerEmotes, handlePlayerReactions, handlePlayerTips, handlePlayerMovements, handleVoiceChat, handleErrors } = require("./handlers/events");
const { sendPeriodicMessage } = require("./utils/utils");


// Create a new Highrise bot instance
const bot = new Highrise({
  intents: [
    GatewayIntentBits.Ready,
    GatewayIntentBits.Joins,
    GatewayIntentBits.Leaves,
    GatewayIntentBits.Messages,
    GatewayIntentBits.Tips,
    GatewayIntentBits.VoiceChat,
    GatewayIntentBits.Reactions,
    GatewayIntentBits.Emotes,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Movements,
    GatewayIntentBits.Error
  ],
  cache: true
});

// Event handler for when the bot is ready
bot.on('ready', (session) => {
  handleReady(bot, session);
});

// Event handler for when the player send a message
bot.on('chatCreate', (user, message) => {
  handleChat(bot, user, message);
});

// Event handler for when the player send a whisper
bot.on('whisperCreate', (user, message) => {
  handleWhisper(bot, user, message);
});

// Event handler for when the player send a direct message
bot.on('messageCreate', (user, data) => {
  handleDirectMessages(bot, user, data);
});


// Event handler for when a player joins the room
bot.on('playerJoin', (user) => {
  handlePlayerJoin(bot, user);
});

// Event handler for when a player leaves the room
bot.on('playerLeave', (user) => {
  handlePlayerLeave(bot, user);
});

// Event handler when someone perform emote
bot.on('playerEmote', (sender, receiver, emote) => {
  handlePlayerEmotes(bot, sender, receiver, emote);
});

// Event handler when someone perform a reaction
bot.on('playerReact', (sender, receiver, reaction) => {
  handlePlayerReactions(bot, sender, receiver, reaction);
});

// Event handler when someone send or receive a tip
bot.on('playerTip', (sender, receiver, item) => {
  handlePlayerTips(bot, sender, receiver, item);
});

// Event handler for the player's movements
bot.on('playerMove', (user, position) => {
  handlePlayerMovements(bot, user, position);
});

// Event handler for the voice chat
bot.on('voiceCreate', (users, seconds_left) => {
  handleVoiceChat(bot, users, seconds_left);
});

// Event handler for API request errors
bot.on('error', (error) => {
  handleErrors(error);
});

// Util handlers
sendPeriodicMessage(bot);

// Log in the bot with the provided token and room ID
bot.login(authentication.token, authentication.room);