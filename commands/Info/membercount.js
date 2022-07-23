const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "membercount",
    aliases: ['memberc', 'members'],
    description: "Show the number of members on this server.",
    usage: "memberc",
    run: async (client, message, args) => {

      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle(message.guild.name + " - Member Count:")
        .setDescription(`There are **${message.guild.memberCount} members** on this server!`)
        .addFields(
          {
            name: "• Humans:",
            value: `\`${message.guild.members.cache.filter(member => !member.user.bot).size || "ERR"}\``,
            inline: true
          },
          {
            name: "• Bots:",
            value: `\`${message.guild.members.cache.filter(member => member.user.bot).size || "ERR"}\``,
            inline: true
          },
        )
        .setTimestamp()
        .setColor("GREEN");

      message.reply({ embeds: [embed] })

    },
};