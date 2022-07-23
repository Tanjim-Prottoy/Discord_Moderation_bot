const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const db = require('../../models/warndb');

module.exports = {
    name: "remove-warning",
    aliases: ['remove-w', 'rw'],
    description: "Remove a user's warning(s).",
    usage: "remove-warning [user] [warning]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.delete();

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention the user.`)
        .setColor("RED");

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Arguments must be a number.`)
        .setColor("RED");

      const embed3 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} User does not have any warnings.`)
        .setColor("RED");

      const user = message.mentions.members.first();
      
      if (!user) return message.reply({ embeds: [embed1]});
      
        db.findOne({
          guild: message.guild.id, 
          user: user.user.id
        }, async (err, data) => {
          if (err) throw err;
          if (data) {
            let number = parseInt(args[1]) - 1
            if (isNaN(number)) return message.reply({ embeds: [embed2]})
            data.content.splice(number, 1)
            
            const embed4 = new MessageEmbed()
              .setDescription(`${config.emojis.success} Successfully removed the warning from ${user}.`)
              .setFooter("User ID: " + user.id)
              .setColor("GREEN");
            
            message.reply({ embeds: [embed4]})
            data.save()
            
          } else {
            message.reply({ embeds: [embed3]})
          }
        }) 
      
    },
};