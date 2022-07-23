const { MessageEmbed } = require('discord.js');
const warndb = require('../../models/warndb');
const config = require("../../config.json");

module.exports = {
    name: "warn",
    aliases: ['w'],
    description: "Warn a user.",
    usage: "warn [user] [reason]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("BAN_MEMBERS")) return message.delete();

      const embed0 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention the user.`)
        .setColor(config.messages.embeds.colors.no);

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Couldn't find that user on this server.`)
        .setColor(config.messages.embeds.colors.no);
      
      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Reason is always required.`)
        .setColor(config.messages.embeds.colors.no);

      if(!args[0]) return message.reply({ embeds: [embed0] });

      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

      if (!user) return message.reply({ embeds: [embed1]})
      
      const reason = args.slice(1).join(" ")
      
      if (!reason) return message.reply({ embeds: [embed2]})

      warndb.findOne({
        guild: message.guild.id,
        user: user.user.id
      }, async (err, data) => {
        if (err) throw err;
        if (!data) {
          data = new warndb({
            guild: message.guild.id,
            user: user.user.id,
            content: [{
              moderator: message.author.id,
              reason: reason
            }]
          })
        } else {
          const object = {
            moderator: message.author.id,
            reason: reason
          }
          data.content.push(object)
        }
        
        data.save()

        })

      const embed3 = new MessageEmbed()
        .setDescription(`${config.emojis.success} ${user} (\`${user.id}\`) has been **warned**.`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.delete().catch(() => { });

      message.channel.send({ embeds: [embed3] });

      const embedDM = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`You've been warned on ${message.guild.name}.`)
        .addFields(
          { name: "• Reason:", value: `${reason}` },
        )
        .setColor("YELLOW")
        .setFooter(`User ID: ${user.id}`)
        .setTimestamp();

      user.send({ embeds: [embedDM] }).catch(e => { });
      
    },
};