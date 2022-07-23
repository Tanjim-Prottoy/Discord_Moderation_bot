const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "purge",
    aliases: ['sw', 'sweep', 'cl', 'clear'],
    description: "Clear an amount of messages.",
    usage: "purge [amount]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

	    const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please specify the amount.`)
        .setColor(config.messages.embeds.colors.no)

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Amount should be not be negative or over **99**.`)
        .setColor(config.messages.embeds.colors.no)

      const embedError = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Can't delete messages that has been sent 14 days ago.`)
        .setColor(config.messages.embeds.colors.no)
      
      const amount = parseInt(args[0])

        if (!amount) return message.reply({ embeds: [embed1] })
      
        if (amount > 99 || amount < 1) return message.reply({ embeds: [embed2] })

        message.channel.bulkDelete(amount + 1).catch(err => { message.reply({ embeds: [embedError] }) }).then(() => {
          
          const embedDone = new MessageEmbed()
            .setDescription(`${config.emojis.success} Successfully deleted **${amount} messages** in \`${client.ws.ping}\` ms.`)
            .setTimestamp()
            .setColor(config.messages.embeds.colors.yes);

          message.channel.send({ embeds: [embedDone] }).then(async msg => {
            await wait(5000);
            msg.delete().catch(() => { });
          });
          
        })
        
    },
};