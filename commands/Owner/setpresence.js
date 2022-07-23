const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Database = require("@replit/database")

module.exports = {
    name: "setpresence",
    aliases: ['setp'],
    description: "Set user's Activity name and Status type.",
    usage: "setpresence [status] [activity]",
    run: async (client, message, args) => {

      const db = new Database()

      if (message.author.id != config.users.owner) return message.delete();

      const status = args[0];
      
      if (!status) {
        let embedMissingStatus = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Please provide a status for the Bot. Here are the status available on Discord API: \`dnd\`, \`invisible\`, \`idle\` and \`online\`.`)
          .setColor(config.messages.embeds.colors.no);
        
        return message.reply({ embeds: [embedMissingStatus] });
      }
      
      const activity = args.slice(1).join(" ");
      
      if (!activity) {
        let embedMissingActivity = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Please type something to set for the bot's activity.`)
          .setColor(config.messages.embeds.colors.no);
        
        return message.reply({ embeds: [embedMissingActivity] });
      }

      let embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(`${config.emojis.success} **Done!** My status now is: \`${status.toLowerCase()}\` and my activity is: \`${activity}\`.`)
        .setColor(config.messages.embeds.colors.yes);
      
      db.set("client_status", status);

      db.set("client_activity", activity);

      client.user.setStatus(status);

      client.user.setActivity(activity);

      message.reply({ embeds: [embed] });
      
    },
};