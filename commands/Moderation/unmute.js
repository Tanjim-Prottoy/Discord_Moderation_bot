const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const config = require("../../config.json");
const ms = require('ms');

module.exports = {
    name: "unmute",
    aliases: ['unm'],
    description: "Unmute a user who is having the timeout feature.",
    usage: "unmute [user] (reason)",
    run: async (client, message, args) => {

      if(message.member.permissions.has("DEAFEN_MEMBERS")) {

        const embed0 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Please mention the user.`)
          .setColor(config.messages.embeds.colors.no);

        const embed1 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Couldn't find that user on this server.`)
          .setColor(config.messages.embeds.colors.no);

        if(!args[0]) return message.reply({ embeds: [embed0] });

        const user = message.mentions.users.first() ||  message.guild.members.cache.find(r => r.user.id === args[0]);

        if(!user) return message.reply({ embeds: [embed1] });

        const reason = args.slice(1).join(" ");

        const milliseconds = ms("0s");

        const iosTime = new Date(Date.now() + milliseconds).toISOString();

		    await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
			    method: 'PATCH',
		      body: JSON.stringify({ communication_disabled_until: iosTime }),
		      headers: {
				    'Content-Type': 'application/json',
				    'Authorization': `Bot ${client.token}`,
			    },
		    });

        const embed2 = new MessageEmbed()
          .setDescription(`${config.emojis.success} ${user} (\`${user.id}\`) has been **unmuted**.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        message.delete().catch(() => { });
      
        message.channel.send({ embeds: [embed2] });

        const embedDM = new MessageEmbed()
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTitle(`You've been unmuted on ${message.guild.name}.`)
          .addFields(
            { name: "• Reason:", value: `${reason || "[No reason provided]"}` },
          )
          .setColor("GREEN")
          .setFooter(`User ID: ${user.id}`)
          .setTimestamp();

        user.send({ embeds: [embedDM] }).catch(e => { });
      
      }
    },
};