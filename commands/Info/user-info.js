const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user-info",
    aliases: ['useri'],
    description: "Check your account's information, or someone else's account information.",
    usage: "user-info (user)",
    run: async (client, message, args) => {

      const member = message.mentions.members.first() || message.member;
        
      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle(`${member.user.tag}'s Information:`)
        .setColor("BLURPLE")
        .setThumbnail(member.user.displayAvatarURL())
        .addField("• Full Name:", member.user.tag, true)
        .addField("• ID:", `${member.id}`, true)
        .addField(`• Avatar URL:`, `[Click Here](${member.user.displayAvatarURL()})`, true)
        .addField("• Joined Server At:", member.joinedAt.toDateString())
        .addField("• Joined Discord At:", member.user.createdAt.toDateString())
        .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
        .setTimestamp();

      message.reply({ embeds: [embed]});  

    },
};