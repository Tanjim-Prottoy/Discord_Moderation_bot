const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    aliases: ['p'],
    description: "Get client's message latency.",
    usage: "ping",
    run: async (client, message, args) => {

      const embed = new MessageEmbed()
        .setDescription("Pinging...")
        .setColor("YELLOW");
      
      message.reply({ embeds: [embed] })
        .then(sentMsg => {

          const newEmbed = new MessageEmbed()
            .setDescription(`:ping_pong: **Pong!** Took \`${sentMsg.createdTimestamp - message.createdTimestamp}ms\` to Edit this message. | Latency: \`${client.ws.ping}ms\``)
            .setColor("GREEN");
          
            sentMsg.edit({ embeds: [newEmbed] });
          
   });
      
    },
};