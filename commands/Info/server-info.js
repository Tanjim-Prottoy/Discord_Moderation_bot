const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "server-info",
    aliases: ['serveri'],
    description: "Check the server information.",
    usage: "server-info",
    run: async (client, message, args) => {

      const guild = message.guild;
      const Emojis = guild.emojis.cache.size || "No Emojis!";
      const Roles = guild.roles.cache.size || "No Roles!";
      const Members = guild.memberCount;
 
      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle(guild.name + " - Information:")
        .setColor("BLURPLE")
        .setThumbnail(guild.iconURL())
        .addField("• General Information:",
          `**❯ Name:** ${guild.name}
          **❯ ID:** \`${guild.id}\`
          **❯ Owner:** <@${guild.ownerId}> (\`${guild.ownerId}\`)
          **❯ Total Members:** \`${Members}\`
          **❯ Creation Date:** ${guild.createdAt.toDateString()}
          **❯ Server Icon URL:** [Click Here](${guild.iconURL()})
          \u200b
          `)
        .addField("• Guild [x] Counters:",
          `**❯ Roles Count:** \`${Roles}\`
          **❯ Emojis Count:** \`${Emojis}\`
          **❯ Total Channels:** \`${message.guild.channels.cache.size}\`
          **❯ Total Text Channels:** \`${message.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size}\`
          **❯ Total Voice Channels:** \`${ message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size}\`
        \u200b
        `)
        .addField("• Guild Protection Levels:", `
          **❯ NSFW Level:** ${message.guild.nsfwLevel}
          **❯ Verification Level:** ${message.guild.verificationLevel}
        `)
        .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
        .setTimestamp();

      message.reply({ embeds: [embed]});
      
    },
};