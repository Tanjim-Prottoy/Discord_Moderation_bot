const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "love",
    aliases: [],
    description: "Just generates an image that you loves a user!",
    usage: "love [user]",
    run: async (client, message, args) => {

      const victim = message.mentions.users.first();

      if(!victim) return message.reply("Please mention the user!");
      
      const users = [
        victim,
		    message.author
      ]
      
      const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${users[0].displayAvatarURL({ format: "png", size: 512 })}&user2=${users[1].displayAvatarURL({ format: "png", size: 512 })}`));
      
			const json = await res.json();
      
			const attachment = new MessageAttachment(json.message, "love.png");
      
			message.reply("*Please wait...*").then(msg => {
        msg.edit({ content: `❤️ Seems like ${message.author} loves ${victim}!`, files: [attachment] })
      });
      
    },
};