const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "dm",
    aliases: [],
    description: "DM a user by using the bot.",
    usage: "dm [user] [message]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

	    const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention the user.`)
        .setColor(config.messages.embeds.colors.no);

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Couldn't find that user on this server.`)
        .setColor(config.messages.embeds.colors.no);

      const embed3 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please provide the message.`)
        .setColor(config.messages.embeds.colors.no);

      const embedError = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Can't send a dm message to that user.`)
        .setColor(config.messages.embeds.colors.no);
      
      if(!args[0]) return message.reply({ embeds: [embed1]});

      const user = message.mentions.members.first() ||  message.guild.members.cache.find(r => r.user.id === args[0]);
    
      if(!user) return message.reply({ embeds: [embed2]});
    
      const msg = args.slice(1).join(" ");

      if(!msg) return message.reply({ embeds: [embed3] });

      const embedDM = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`You've got a message from ${message.guild.name}`)
        .addFields(
          {
            name: "• Author:",
            value: `${message.member} (\`${message.member.id}\`)`
          },
          {
            name: "• Message:",
            value: msg || "[ERR]"
          },
        )
        .setColor("BLURPLE")
        .setTimestamp();

      const embed4 = new MessageEmbed()
        .setDescription(`${config.emojis.success} Message sent to ${user} (\`${user.id}\`).`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      user.send({ embeds: [embedDM] }).catch(() => message.reply({ embeds: [embedError] })).then(() => message.reply({ embeds: [embed4] }));
        
    },
};