const { MessageEmbed, version: djsversion } = require("discord.js");
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
const version = require("../../package.json").version;
const { utc } = require("moment");
const os = require("os");
const ms = require("ms")

module.exports = {
    name: "stats",
    aliases: ['st'],
    description: "Check the bot's stats, information and more.",
    usage: "stats",
    run: async (client, message, args) => {

      const uptime = moment
        .duration(client.uptime)
        .format(" D [Days] - H [Hours] - m [Minutes] - s [Seconds]");

       const upvalue = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);

        const guild = message.guild;

        const core = os.cpus()[0];
        const embed = new MessageEmbed()
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription("Here are my Stats!")
          .addField(
            "**• General Information:**",
            `**❯ Client:** ${client.user.tag} (\`${client.user.id}\`)
            **❯ Commands:** \`${client.commands.size}\`
            **❯ Slash Commands:** \`${client.slashCommands.size}\`
            **❯ Servers:** \`${client.guilds.cache.size.toLocaleString()}\`
            **❯ Users:** \`${client.guilds.cache
              .reduce((a, b) => a + b.memberCount, 0)
              .toLocaleString()}\`
            **❯ Channels:** ${client.channels.cache.size.toLocaleString()}
            **❯ Creation Date:** ${utc(client.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}
            **❯ Node.js Version:** ${process.version}
            **❯ Discord.js Version:** v${djsversion}
            **❯ Up Since:**  <t:${upvalue}:T>
            \u200b`
          )
          .addField(
            "**• CPU Information:**",
            `**❯ Cores: **${os.cpus().length}
            **❯ Model:** ${core.model}
            **❯ Speed:** ${core.speed}MHz`
          ) 
          .setColor("BLUE")
          .setTimestamp();
          
      message.reply({ embeds: [embed] }); 
      
    },
};