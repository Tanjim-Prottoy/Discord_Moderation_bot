const { MessageAttachment, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "kiss",
    aliases: [],
    description: "Kiss a user... wait wtf.",
    usage: "kiss {user]",
    run: async (client, message, args) => {

      const user = message.mentions.users.first() ||  message.guild.members.cache.find(r => r.user.id === args[0]);
      
      if(!user) return message.reply("Please mention a user.")
      
	    if (message.author === user) return message.reply("You can't kiss yourself bro.");

      const rn = Math.floor((Math.random() * 69) + 1);

      const url = `https://cdn.nekos.life/kiss/kiss_0${rn}.gif`;
      // Best image ngl: https://cdn.nekos.life/kiss/kiss_039.gif

      if(!message.channel.nsfw) {
        let filter = (i) => i.author.id === message.author.id;

        const embedChannelNotNSFW = new MessageEmbed()
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
          .setTitle("NSFW Channel not Detected!")
          .setDescription(`${config.emojis.warning} This command generates random NSFW gifs, if you want to complete this command execution, say '**yes**', else say '**no**'.`)
          .setColor("ORANGE")
          .setTimestamp();

        var sent = await message.reply({ embeds: [embedChannelNotNSFW] });

        let check = await message.channel.awaitMessages({
           filter: filter,
           max: 1
         })
      
        let msg = check.first().content.toLowerCase();

        if(msg === "no") {
          return message.reply("Ight, command cancelled.")
          message.delete();
        } else {
          if(msg === "yes") {

            sent.delete().catch(() => { });
            message.delete();
            
            const embed = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(user.username + " Just got a kiss from " + message.author.username + "!")
              .setImage(url)
              .setColor("#ff00e0")
              .setDescription((user.toString() + " got a kiss from " + message.author.toString() + "!"))
              .setFooter(`This is so cute.`)
              .setURL(url);
        
            message.reply({ embeds: [embed] });
         
          } else {
            return message.reply("**Invalid choice,** Command cancelled.")
          }
        }
      } else {
        
        const embed = new MessageEmbed()
          .setTitle(user.username + " Just got a kiss from " + message.author.username + "!")
          .setImage(url)
          .setColor("#ff00e0")
          .setDescription((user.toString() + " got a kiss from " + message.author.toString() + "!"))
          .setFooter(`This is so cute.`)
          .setURL(url);
        
        message.reply({ embeds: [embed] });
        
      }
         
    },
};