const { MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const config = require("../../config.json");

module.exports = {
    name: "database",
    aliases: ['db'],
    description: "Show all the keys in the Replit database.",
    usage: "database",
    run: async (client, message, args) => {

      const db = new Database()

      if (message.author.id != config.users.owner) return message.delete();
      
      db.list().then(keys => {
        if(!keys) return message.reply("No Keys Found.");

        const embed = new MessageEmbed()
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
          .setDescription(`${config.emojis.others.database} **Repl.it Database Keys:**\n\n` + `\`${keys.join("\n")}\``)
        
        message.reply({ embeds: [embed] });
      });
      
    },
};