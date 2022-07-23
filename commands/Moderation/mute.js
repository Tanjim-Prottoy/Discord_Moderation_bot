const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const config = require("../../config.json");
const ms = require('ms');

module.exports = {
    name: "mute",
    aliases: ['m'],
    description: "Mute a user with a specific duration, using the timeout feature.",
    usage: "mute [user] [time] (reason)",
    run: async (client, message, args) => {

      if(message.member.permissions.has("DEAFEN_MEMBERS")) {
        
        const embed0 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Please mention the user.`)
          .setColor(config.messages.embeds.colors.no);

        const embed1 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Couldn't find that user on this server.`)
          .setColor(config.messages.embeds.colors.no);
      
        const embed2 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Please provide the time to mute the user. Use the suffixes **s**, **m**, **h** or, **d** for the duration.`)
          .setColor(config.messages.embeds.colors.no);

        const embed3 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Duration is low than **10 seconds** or over than **28 days**.`)
          .setColor(config.messages.embeds.colors.no);

        if(!args[0]) return message.reply({ embeds: [embed0] });

        const user = message.mentions.users.first() ||  message.guild.members.cache.find(r => r.user.id === args[0]);

        if(!user) return message.reply({ embeds: [embed1] });

        const time = args[1];

        if(!time) return message.reply({ embeds: [embed2] });

        const reason = args.slice(2).join(' ');
  
        const milliseconds = ms(time);

        if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) return message.reply({ embeds: [embed3] });

        const iosTime = new Date(Date.now() + milliseconds).toISOString();

		    await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
			    method: 'PATCH',
		      body: JSON.stringify({ communication_disabled_until: iosTime }),
		      headers: {
				    'Content-Type': 'application/json',
				    'Authorization': `Bot ${client.token}`,
			    },
		    });

        const embed5 = new MessageEmbed()
          .setDescription(`${config.emojis.success} ${user} (\`${user.id}\`) has been **muted**.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        message.delete().catch(() => { });
      
        message.channel.send({ embeds: [embed5] });

        const embedDM = new MessageEmbed()
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTitle(`You've been muted on ${message.guild.name}.`)
          .addFields(
            { name: "• Duration:", value: `\`${time}\`` },
            { name: "• Reason:", value: `${reason || "[No reason provided]"}` },
          )
          .setColor("YELLOW")
          .setFooter(`User ID: ${user.id}`)
          .setTimestamp();

        user.send({ embeds: [embedDM] }).catch(e => { });
      
    }
  },
};