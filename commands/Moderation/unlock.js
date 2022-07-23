const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "unlock",
    aliases: ['unl'],
    description: "Unlock a channel.",
    usage: "unlock (channel)",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

      const rr = db.fetch(`lock_system_${message.guild.id}`);

      const channel = message.mentions.channels.first() || message.channel;

      const embedERR = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Locking system is not ready yet!`)
        .setColor(config.messages.embeds.colors.no);

      if(rr === null) return message.reply({ embeds: [embedERR] });

      await channel.permissionOverwrites.edit(rr,{
        'SEND_MESSAGES': true
      });

      const embed = new MessageEmbed()
        .setDescription(`${config.emojis.success} ${message.channel} has been **unlocked.**`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embed] }).then(async msg => {
        await wait(5000);
        msg.delete().catch(() => { });
        message.delete().catch(() => { });
      });

      const embedUnlocked = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTitle("Channel Unlocked.")
        .setDescription(`${config.emojis.others.unlocked} This channel has been **unlocked** now by a moderator, feel free to chat now.`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.channel.send({ embeds: [embedUnlocked] });
        
    },
};