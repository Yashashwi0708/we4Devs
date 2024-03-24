require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'check',
    description: 'Checks url authentication!',
    options: [
     {
        name: 'message',
        description: 'Enter the message.',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ]
  },
  {
    name: 'help',
    description: 'Tells you other commands!',
  },
  {
    name: 'redirect',
    description: 'Redirect to the official website of SafeGuard',
  },
  {
    name: 'start',
    description: 'Welcomes the user',
    options:[
      {
        name: 'name',
        description: 'Enter your name.',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ]
  },
];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN); // Use version 9 for slash commands

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Slash Commands were registered successfully');
  } catch (error) {
    console.error(error); // Use console.error for better error handling
  }
})();