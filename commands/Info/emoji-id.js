const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "emoji-id",
    aliases: ['emojiid', 'emo'],
    description: "Get an emoji's id.",
    usage: "emoji-id [emoji]",
    run: async (client, message, args) => {

      const name = args.join(" ");
      
      const emoji = message.guild.emojis.cache.find((r) => r.name === name);

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please provide an emoji name.`)
        .setColor(config.messages.embeds.colors.no);
      
      if (!name) return message.reply({ embeds: [embed1] });

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Invalid emoji name.`)
        .setColor(config.messages.embeds.colors.no);

      if(!emoji) return message.reply({ embeds: [embed2] });

      const embed = new MessageEmbed()
        .setDescription(`\`\`\`${emoji}\`\`\``)
        .setColor(config.messages.embeds.colors.yes);
      
      message.reply({ embeds: [embed] });
      
    },
};