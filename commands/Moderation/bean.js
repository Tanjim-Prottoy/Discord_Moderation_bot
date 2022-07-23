const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "bean",
    aliases: [],
    description: "Bean a user, not Ban a user!!!1!1!",
    usage: "bean [user] (reason)",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("DEAFEN_MEMBERS")) return message.delete();

	    const embed0 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention the user.`)
       	.setColor(config.messages.embeds.colors.no);

	    if(!args[0]) return message.reply({ embeds: [embed0] });

      const user = message.mentions.members.first() || message.guild.members.cache.find(r => r.user.id === args[0]);

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Couldn't find that user on this server.`)
       	.setColor(config.messages.embeds.colors.no);

      if(!user) return message.reply({ embeds: [embed1] });

      let filter = (i) => i.member.id === user.id;

      const embed = new MessageEmbed()
        .setDescription(`${config.emojis.success} ${user} (\`${user.id}\`) has been **beaned**.`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

     	message.channel.send({ embeds: [embed] });

      let msg = await message.channel.awaitMessages({
      	filter: filter,
      	max: 1
      })

     	msg.first().react("🌱");
        
    },
};