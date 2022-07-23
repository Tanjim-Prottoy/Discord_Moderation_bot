const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "snipe",
    aliases: ['sn'],
    description: "Get the latest user's deleted message.",
    usage: "snipe",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

	    const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} No deleted message was found.`)
        .setColor(config.messages.embeds.colors.no);

      const snipe = client.snipes.get(message.channel.id)

      if(!snipe) return message.reply({ embeds: [embed1] });

      const embedSniped = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTitle("Message Sniped!")
        .addFields(
          {
            name: "• Author:",
            value: `${snipe.author} (\`${snipe.author.id}\`)`
          },
          {
            name: "• Message:",
            value: `${snipe.content || "`[ERR - Probably an embed message was sent]`"}`
          },
        )
        .setColor(config.messages.embeds.colors.yes)
        .setTimestamp();
      
      if(snipe.image) embed.setImage(snipe.image);
      
      message.reply({ embeds: [embedSniped] });
        
    },
};