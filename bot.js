const { Client, GatewayIntentBits } = require('discord.js');
const { getEmojiSuggestion } = require('./openai'); // Import the OpenAI function
require('dotenv').config();
const { getWind, getRain } = require('./weather'); // Import the function
const getJoke = require('./jokes'); // Import the getJoke function from your jokes.js file
const generateResponse = require('./genz_replier');

const client = new Client({ intents: [GatewayIntentBits.Guilds,		
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,] 
});

// Trigger words and their emoji reactions
const triggerWords = {
  cringe: '😬',
  fail: '💀',
  w: '🎉',
};

client.once('ready', () => {
  console.log(`🗿 Bot online as ${client.user.tag}! Skibidi bop dop dop!`);
});

const messageCounts = {}; // In-memory storage for message counts

client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  const triggerKeywords = ['skibidi', 'sigma', 'ohio', 'npc', 'fanum', 'tax', 'rizz', 'gyatt', 'aura', 'griddy', 'rizzler', 'lil', 'fam', 'grindset', 'tiktok rizz party', 'grimace shake', 'blud', 'crazy', 'thang', 'ay', 'gaw', 'dayum', 'gawlly', 'sheesh'];

    // Check if the message contains any trigger word
    if (triggerKeywords.some((keyword) => message.content.toLowerCase().includes(keyword))) {
      try {
        const prompt = `Reply to this in your Gen Z Skibidi Sigma style in short sentence like a discord message: "${message.content}"`;
        const response = await generateResponse(prompt);
  
        await message.reply(response); // Send the AI-generated response
      } catch (error) {
        console.error('Error responding to message:', error);
        await message.reply('Yo, my brain glitched 🤖💀. Try again later!');
      }
    }

  // Keywords to trigger the GIF
  const keywords = ['ninja', 'fortnite', 'fade', 'low taper', 'haircut']; // Add relevant keywords here
  if (keywords.some((keyword) => message.content.toLowerCase().includes(keyword))) {
    try {
      const gifUrl = 'https://tenor.com/view/ninja-fortnite-low-taper-fade-fade-haircut-gif-8641026863353297145';
      await message.channel.send(gifUrl); // Send the GIF URL to the channel
    } catch (error) {
      console.error('Failed to send the GIF:', error);
    }
  }

  // Check for trigger words and react
  for (const [word, emoji] of Object.entries(triggerWords)) {
    if (message.content.toLowerCase().includes(word)) {
      try {
        await message.react(emoji);
      } catch (error) {
        console.error('Failed to react to a message:', error);
      }
      break; // Stop after reacting once
    }
  }

  try {
    // Get emoji suggestion from OpenAI
    const suggestedEmoji = await getEmojiSuggestion(message.content);

    // React to the message with the suggested emoji
    await message.react(suggestedEmoji);
  } catch (error) {
    console.error('Failed to get emoji suggestion or react to message:', error);
  }

  const userId = message.author.id;

  // Increment the message count for the user
  if (!messageCounts[userId]) {
    messageCounts[userId] = 0;
  }
  messageCounts[userId]++;
});


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'coinflip') {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails'; // 50-50 random result
    await interaction.reply(`🪙 The coin landed on: **${result}**!`);
  }

  if (commandName === 'hello') {
    await interaction.reply('Hello there!');
  }

  if (commandName === 'no_you') {
    await interaction.reply('no you');
  }

  if (commandName === 'wind') {
    const { windSpeed, conditionIcon } = await getWind('Sydney');
    if (conditionIcon) {
      await interaction.reply({
        content: windSpeed,
        files: [conditionIcon], // Attach the weather condition image
      });
    } else {
      await interaction.reply(windSpeed);
    }
  }

  if (commandName === 'messages_sent') {
    const userId = interaction.user.id;
    const count = messageCounts[userId] || 0; // Default to 0 if no messages sent

    await interaction.reply(`You have sent ${count} messages!`);
  }

  (async () => {
    let rain = await getRain('Sydney');
    console.log("Printing Sydney rain");
    console.log(rain);
    if (commandName === 'rain') {
      await interaction.reply(rain);
    }
  })();

  (async () => {
    let joke = await getJoke();
    console.log("Printing New Joke");
    console.log(joke);
    if (commandName === 'joke') {
      await interaction.reply(joke);
    }
  })();
});

client.on('messageCreate', async (message) => {
  console.log("on messageCreate")
  // Ignore messages from bots (including your bot)
  if (message.author.bot) return;

  // React with a cringe emoji
  try {
    await message.react('💀'); // Replace '💀' with your preferred emoji
  } catch (error) {
    console.error('Failed to react to a message:', error);
  }
});

// Log into the bot
client.login(process.env.BOT_TOKEN);
