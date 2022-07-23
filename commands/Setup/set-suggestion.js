const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "set-suggestion",
    aliases: ['sets'],
    description: "Set the suggestion system on the server.",
    usage: "set-suggestion [channel]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.delete();

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention a channel.`)
        .setColor(config.messages.embeds.colors.no);

      if(!args[0]) return message.reply({ embeds: [embed1] });

      const channel = message.mentions.channels.first();

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} That channel is not on this server.`)
        .setColor(config.messages.embeds.colors.no);

      if(!channel) return message.reply({ embeds: [embed2] });

      db.set(`suggest_system_${message.guild.id}_channel`, channel.id)
      
      const embedDone = new MessageEmbed()
        .setDescription(`${config.emojis.success} Suggestion system is now **ready!**`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embedDone] });
      
    },
};