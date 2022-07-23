const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "slowmode",
    aliases: ['sm'],
    description: "Sets the channel's slowmode.",
    usage: "slowmode [time]",
    run: async (client, message, args) => {
  
      if(!message.member.permissions.has("BAN_MEMBERS")) return message.delete();

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please provide the time for slowmode.`)
        .setColor(config.messages.embeds.colors.no);
      
      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please specify a number.`)
        .setColor(config.messages.embeds.colors.no);

      const embed3 = new MessageEmbed()
        .setDescription(`${config.emojis.success} Slowmode has been disabled.`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      const embed4 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Slowmode cannot be Negative.`)
        .setColor(config.messages.embeds.colors.no);
      
      const embed5 = new MessageEmbed()
        .setDescription(`${config.emojis.success} Successfully changed ${message.channel}'s slowmode to ${args[0]}.`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      const embedError = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} An error has occured while executing the command. Make sure that I have the administrator permission!`)
        .setColor(config.messages.embeds.colors.no);

      if (!args[0]) return message.reply({ embeds: [embed1]});
      
      if (isNaN(args[0])) return message.reply({ embeds: [embed2]});

      if(args[0] == 0) return message.reply({ embeds: [embed3]}).then( message.channel.setRateLimitPerUser(null).catch(err => message.channel.send({ embeds: [embedError]})) )

      if(args[0] < 0) return message.reply({ embeds: [embed4]});
    
      message.channel.setRateLimitPerUser(args[0]).catch(err => message.channel.send({ embeds: [embedError]}));
        
      message.reply({ embeds: [embed5]});

    },
};