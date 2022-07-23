const { MessageEmbed } = require("discord.js");
const warndb = require('../../models/warndb');
const config = require("../../config.json");

module.exports = {
    name: "warns",
    aliases: [],
    description: "Check a user's warnings.",
    usage: "warns [user]",
    run: async (client, message, args) => {

      const user = message.mentions.members.first() || message.member;

      warndb.findOne({
        guild: message.guild.id, 
        user: user.id
      }, async (err, data) => {
        if (err) throw err
          
        if (data) {
                const e = data.content.map(
                    (w, i) => `\n\`#${i + 1}\` | **Moderator:** ${message.guild.members.cache.get(w.moderator).user.tag} (\`${message.guild.members.cache.get(w.moderator).user.id}\`)\n> __Reason:__ ${w.reason}\n`
                )
                const embed = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setDescription(`• __Total Warnings from the User__ <@${user.user.id}> (${user.user.id}):\n` + e.join(' '))
                    .setFooter("If there is no Warnings above, means that User does not have any Warnings!")
                    .setColor("RED")
                    .setTimestamp()
                message.reply({
                    embeds: [embed]
                })
              
            } else {

                const noWarns = new MessageEmbed()
                  .setDescription(`${config.emojis.success} That user does not have any warnings.`)
                  .setColor(config.messages.embeds.colors.yes)
              
                message.reply({ embeds: [noWarns] })
            }
        })
      
    },
};