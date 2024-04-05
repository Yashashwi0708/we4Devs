require('dotenv').config();
const request = require('request');
const axios = require('axios')
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    // IntentsBitField.Flags.MessageContent,
  ],
});

async function checkSpam(message, interaction) {
  console.log('Hello');
  try {
    const res = await axios.post(`https://we4devs.onrender.com/checkSpam`, {
      inputs: message
    });3000

    console.log(res.data); 

    if (res.data && res.data.is_Spam !== undefined) {
      interaction.reply(`Spam: ${res.data.is_Spam}, Probability: ${res.data.probability}`);
    } else {
      interaction.reply('Unable to determine spam status. Please try again later.');
    }
  } catch (err) {
    console.error(err);
    interaction.reply('An error occurred while checking spam. Please try again later.');
  }
}



client.on('ready', (c) => { // ready is an event and when it is emmited Client gives c to process further    
    console.log(`${c.user.tag} is online!`); // c acts as a temperory alias to client
  });
  
client.on('interactionCreate', async interaction =>{
    if (!interaction.isCommand()) return;
  
    const command = interaction.commandName;
    
    if(command === 'start'){
        const name = interaction.options.get('name').value
        interaction.reply(`Hello ${name}! I am SafeGuard and i'm here to maintain your securicy.`)
    }
    if(command === 'redirect'){
      interaction.reply(`Please visit the website of SafeGuard`)
    }
    if (command === 'help') {
      const embed = new EmbedBuilder()
        .setTitle("Embed Title")
        .setDescription("This is your provided message")
        .setColor('Random') // Using hexadecimal color format
        .addFields(
          { name: 'help', value: 'Tells you the functioning of other commands', inline: true },
          { name: 'check', value: 'Accepts message and tells its authenticity' },
          { name: 'start', value: 'Welcomes the user' },
          { name: 'redirect', value: 'Redirects user to the SafeGuard website' }
        );
    
      interaction.reply({ embeds: [embed] });
    }
    
    if (command === 'check'){
      const message = interaction.options.get('message').value;
      await checkSpam(message, interaction);
    }
}) 
client.login(process.env.TOKEN);