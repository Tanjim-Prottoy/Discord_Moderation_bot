const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "nitrogen",
    aliases: ['nitro'],
    description: "Generates *real* nitro gifts!!!11!!1",
    usage: "nitrogen",
    run: async (client, message, args) => {

      let button = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle("SUCCESS")
              .setLabel("Claim Nitro")
              .setCustomId("rel")
            .setEmoji('967713226169155584'),
            new MessageButton()
              .setStyle("PRIMARY")
              .setLabel("Claim Nitro Classic")
              .setCustomId("del")
            .setEmoji('967713365734621184')
          )

      const embed = new MessageEmbed()
        .setDescription("Click The Button Below To Claim.")
        .setColor('#0099ff')
        .setTitle('Free Discord Nitro!')
        .setURL('https://discord.com/nitro')
        

      message.channel.send({embeds:[embed], components:[button]}).then(async Message => {
                    
        const filter = i =>  i.user.id === message.author.id
        
        let col = await Message.createMessageComponentCollector({filter, time: 1200000 });
            
        col.on('collect', async(button) => {
          if(button.user.id !== message.author.id) return button.reply({ content: "Not for you, smh.", ephemeral: true });
                    
            switch (button.customId) {
              case 'rel':
                button.reply({content: `https://c.tenor.com/pO54yeWaIJUAAAAd/nitro-rick-roll.gif`, ephemeral: true}).catch(e => { });           
                break
              case 'del':
                button.reply({content: `https://c.tenor.com/VFFJ8Ei3C2IAAAAM/rickroll-rick.gif`, ephemeral: true}).catch(e => { });
                break
            
            }
        })
    }).catch(e => { });
      
    },
};