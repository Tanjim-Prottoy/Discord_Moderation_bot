const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "nick",
    aliases: ['mod'],
    description: "Moderate a user's nick, or set a user's new nickname.",
    usage: "nick [user] (nick)",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

	    const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention the user.`)
        .setColor(config.messages.embeds.colors.no);
      
      if (!args[0]) return message.reply({ embeds: [embed1] });
      
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Couldn't find that user on this server.`)
        .setColor(config.messages.embeds.colors.no);
      
      if (!member) return message.reply({ embeds: [embed2] });

      if (args[1]) {

      let nick = args.slice(1).join(' ');
          
      member.setNickname(nick).catch(() => { });
          
      const embed = new MessageEmbed()
        .setDescription(`${config.emojis.success} Successfully changed ${member}'s nickname to: **${nick}**.`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embed] });
        
      } else {

      function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
          charactersLength));
        }
        return result;
      }

      const newNick = makeid(10);
          
      member.setNickname(`Moderated Nickname ${newNick}`).catch(() => { });

      const embed = new MessageEmbed()
        .setDescription(`${config.emojis.success} Successfully moderated **${member.user.tag}**'s nickname.`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embed] });
          
        }
        
    },
};