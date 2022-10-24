//Clases que necesito
const { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder} = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const {token} = require("./config.json");

client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

// Pass the entire Canvas object because you'll need access to its width and context
const applyText = (canvas, text) => {
   const context = canvas.getContext('2d');

   // Declare a base size of the font
   let fontSize = 70;

   do {
      // Assign the font to the context and decrement it so it can be measured again
      context.font = `${fontSize -= 10}px sans-serif`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
   } while (context.measureText(text).width > canvas.width - 300);

   // Return the result to use in the actual canvas
   return context.font;
};




client.on('interactionCreate', async (interaction) => {
   if (!interaction.isChatInputCommand()) return;

   if (interaction.commandName === 'ping') {
      await interaction.reply('Pang!');
   }
   if (interaction.commandName === 'prueba') {
      const embed = new EmbedBuilder()
          .setTitle('Titulo!')
          .setDescription(`Descripcion`)
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter({
             text: `Prueba  ${interaction.user.tag}`,
             iconURL: interaction.user.displayAvatarURL(),
          })
          .setTimestamp(Date.now())
      ;
      await interaction.reply({
         embeds: [embed]
      });
   }
});


client.login(token);

/*const canvas = Canvas.createCanvas(700, 1250);
const context = canvas.getContext('2d');
const waifu = await Canvas.loadImage('./assets/pruebaWaifu.jpg');
context.drawImage(waifu, 0, 0, canvas.width, canvas.height)

// Select the font size and type from one of the natively available fonts
context.font = applyText(canvas, interaction.member.displayName);
// Select the style that will be used to fill the text in
context.fillStyle = '#ffffff';
// Actually fill the text with a solid color
context.fillText(interaction.member.displayName, canvas.width / 2.5, canvas.height / 1.8);

context.font = applyText(canvas, `${interaction.member.displayName}!`);
context.fillStyle = '#ffffff';
context.fillText(`${interaction.member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' })*/