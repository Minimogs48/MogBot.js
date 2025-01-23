const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  {
    name: 'hello',
    description: 'Replies with Hello!',
  },

  {
    name: 'no_you',
    description: 'Replies with "no you"',
  },
  {
    name: 'wind',
    description: 'Replies with "Wind Speed"',
  },
  {
    name: 'rain',
    description: 'Replies with "Rain"',
  },
  {
    name: 'joke',
    description: 'Replies with "Joke"',
  },
  {
    name: 'messages_sent',
    description: 'Shows how many messages you have sent.',
  },
  {
    name: 'coinflip',
    description: 'Flips a coin and returns Heads or Tails.',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
