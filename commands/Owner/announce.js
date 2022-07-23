const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "announce",
    aliases: ['an'],
    description: "Announce something for the server members.",
    usage: "announce [channel] [message]",
    run: async (client, message, args) => {

      if (message.author.id != config.users.owner) return message.delete();

      const channel = message.mentions.channels.first();

      if(!channel) return message.reply("Please mention a channel.")
      
      const content = args.slice(1).join(" ");

      if(!content) return message.reply("Please provide a message to announce.")

      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle("New Accouncement:")
        .addFields(
          { name: "• Author:", value: `${message.author} (\`${message.author.id}\`)` },
          { name: "• Message:", value: content },
        )
        .setColor("BLUE")
        .setTimestamp();

      const channelToSend = message.guild.channels.cache.find(ch => ch.id === channel.id);

      //if(message.image) embed.setImage(message.image);

      channelToSend.send({ embeds: [embed] }).catch(e => console.log(e))

      const embedSent = new MessageEmbed()
        .setDescription(`${config.emojis.success} Sent!`)
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embedSent] });
        
    },
};