const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "set-lock",
    aliases: ['setl'],
    description: "Set the locking system on the server.",
    usage: "set-lock [role]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.delete();

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention a role.`)
        .setColor(config.messages.embeds.colors.no);

      if(!args[0]) return message.reply({ embeds: [embed1] });

      const role = message.mentions.roles.first();

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} That role does not exists on this server.`)
        .setColor(config.messages.embeds.colors.no);

      if(!role) return message.reply({ embeds: [embed2] });

      db.set(`lock_system_${message.guild.id}`, role.id)
      
      const embedDone = new MessageEmbed()
        .setDescription(`${config.emojis.success} Locking system is now **ready!**`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embedDone] });
      
    },
};