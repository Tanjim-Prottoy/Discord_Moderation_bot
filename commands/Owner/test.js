const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "test",
    aliases: ['t'],
    description: "Testing some commands.",
    usage: "test",
    run: async (client, message, args) => {

      if (message.author.id != config.users.owner) return message.delete();

      const row = new MessageActionRow()
		  	.addComponents(
				  new MessageButton()
					  .setCustomId('test')
					  .setLabel('Testing Button')
					  .setStyle('PRIMARY'),
		  	);

	  	await message.reply({ content: 'Testing Buttons collector!', components: [row] });

      const collector = message.channel.createMessageComponentCollector({
        componentType: "BUTTON"
      });

      collector.on("collect", async (col) => {

      const id = col.customId;

      const user = col.member;

      if(id === "test"){

          if(user.id !== message.member.id) return col.reply({ content: "This is not for you.", ephemeral: true }).catch(() => { });
          
          col.reply({ content: "TEST", ephemeral: true }).catch(() => { });
          
      }
        
      })
          
    },
};