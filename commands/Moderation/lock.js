const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "lock",
    aliases: ['l'],
    description: "Lock a channel.",
    usage: "lock (reason)",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

      const rr = db.fetch(`lock_system_${message.guild.id}`);

      const embedERR = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Locking system is not ready yet!`)
        .setColor(config.messages.embeds.colors.no);

      if(rr === null) return message.reply({ embeds: [embedERR] });

      const reason = args.slice(0).join(" ");

      await message.channel.permissionOverwrites.edit(rr,{
        'SEND_MESSAGES': false 
      });

      const embed = new MessageEmbed()
        .setDescription(`${config.emojis.success} ${message.channel} has been **locked.**`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embed] }).then(async msg => {
        await wait(5000);
        msg.delete().catch(() => { });
        message.delete().catch(() => { });
      });

      const embedlocked = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTitle("Channel Locked.")
        .setDescription(`${config.emojis.others.locked} This channel has been **locked** by a moderator. Nobody can chat here for now.`)
        .addField("• Reason:", reason || "[No reason was provided]")
        .setTimestamp()
        .setColor(config.messages.embeds.colors.no);

      message.channel.send({ embeds: [embedlocked] });
        
    },
};