const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { readdirSync } = require("fs");
const wait = require('node:timers/promises').setTimeout;
const config = require("../../config.json");
const embedColorCommands = "BLURPLE";

module.exports = {
    name: "help",
    aliases: ['h', 'cmds'],
    description: "Shows a list of commands and their categories in one dropdown menu.",
    usage: "help (command)",
    run: async (client, message, args) => {

      if(!args[0]) {

        const menu = new MessageActionRow()
			    .addComponents(
				    new MessageSelectMenu()
				  	  .setCustomId('menu')
				    	.setPlaceholder('Select a command category here!')
				    	.addOptions([
						    {
							    label: 'Information',
							    value: '1',
                  emoji: 'ℹ',
						    },
                {
							    label: 'Moderation',
							    value: '2',
                  emoji: '⚒️',
						    },
                {
							    label: 'Setup',
							    value: '3',
                  emoji: '⬆️',
						    },
                {
							    label: 'Giveaway',
							    value: '4',
                  emoji: '🎁',
						    },
                {
							    label: 'General',
							    value: '5',
                  emoji: '🏠',
						    },
                {
							    label: 'Owner',
							    value: '6',
                  emoji: '👑',
						    },
                {
							    label: 'Ranking',
							    value: '7',
                  emoji: '📊',
						    },
                {
							    label: 'Image',
							    value: '8',
                  emoji: '🖼️',
						    },
                {
							    label: 'Utility',
							    value: '9',
                  emoji: '🦾',
						    },
                {
							    label: 'Fun',
							    value: '10',
                  emoji: '😂',
						    },
                {
							    label: 'Administration',
							    value: '11',
                  emoji: '🛡️',
						    },
                {
							    label: 'Cancel Interaction',
                  description: 'Closes the service and the interaction.',
							    value: '12',
                  emoji: '🗑️',
						    },
					    ]),
  			  );

        const embed = new MessageEmbed()
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
          .setTitle(client.user.username + " - Help Menu:")
          .setDescription(`Welcome to **${client.user.username}'s service!** To check my commands, __select one of the command categories in the dropdown menu below.__`)
          .addFields(
            {
              name: "• ❓ __How to use me?__",
              value: `\`○\` To execute a command, type: \`${config.prefix}[command]\`.\n\`○\` To get a command's aliases, description or usage, use: \`${config.prefix}help [command]\`.\n\`○\` Slash commands are available, Try now: \`/help\`.`,
              inline: true
            },
            {
              name: "• 📈 __Commands Counter:__",
              value: `\`○\` Prefix Commands: ${client.commands.size}\n\`○\` Slash Commands: ${client.slashCommands.size}\n\`○\` Total: ${client.slashCommands.size + client.commands.size}`,
              inline: true
            },
          )
  
		  await message.reply({ embeds: [embed], components: [menu] }).then(async (msg) => {

        const filter = i => i.user.id === message.author.id;
        
        const collector = message.channel.createMessageComponentCollector({
          filter,
          componentType: "SELECT_MENU"
       });

        collector.on("collect", async (col) => {

          const value = col.values[0];

          const user = col.member;

          if(value === "1"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Info Commands:")
              .setDescription("__Available commands:__ `emoji-id`, `help`, `membercount`, `npm`, `role-info`, `server-info`, `stats`, `uptime`, `user-info`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });   
          
          }

          if(value === "2"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Moderation Commands:")
              .setDescription("__Available commands:__ `ban`, `bean`, `dm`, `lock`, `mute`, `nick`, `note`, `purge`, `slowmode`, `snipe`, `unlock`, `unmute`, `warn`, `warns`, `yeet`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });    
          
          }

          if(value === "3"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Setup Commands:")
              .setDescription("__Available commands:__ `disable-system`, `set-automod`, `set-dropdown-role`, `set-lock`, `set-logs`, `set-ranking`, `set-suggestion`, `set-verify`, `set-welcome`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });    
          
          }

          if(value === "4"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Giveaway Commands:")
              .setDescription("__Available commands:__ `start`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });    
          
          }

          if(value === "5"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - General Commands:")
              .setDescription("__Available commands:__ `avatar`, `ping`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });    
          
          }

          if(value === "6"){

            if(user.id !== message.guild.ownerId) return col.reply({ content: `${config.emojis.wrong} **Only the server owner can see the commands!**`, ephemeral: true });

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Owner Commands:")
              .setDescription("__Available commands:__ `announce`, `database`, `eval`, `setpresence`, `test-welcome-sys`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });    
          
          }

          if(value === "7"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Ranking System Commands:")
              .setDescription("__Available commands:__ `leaderboard`, `rank`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });   
          
          }

          if(value === "8"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Image Commands:")
              .setDescription("__Available commands:__ `love`, `yt-comment`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });     
    
          }

          if(value === "9"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Utility Commands:")
              .setDescription("__Available commands:__ `role`, `verify`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });   
          
          }

          if(value === "10"){

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Fun Commands:")
              .setDescription("__Available commands:__ `8ball`, `find-the-number`, `kiss`, `meme`, `nitrogen`, `react`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });     
          
          }

          if(value === "11"){

            if(!message.member.permissions.has("ADMINISTRATOR")) return col.reply({ content: `${config.emojis.wrong} **Only the users with the permission \`ADMINISTRATOR\` can see the commands!**`, ephemeral: true });

            const embedCmds = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Administration Commands:")
              .setDescription("__Available commands:__ `remove-warning`, `set-rank`.")
              .setColor(embedColorCommands);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });   

            col.update({ embeds: [embedCmds] }).catch(() => { });   
          
          }

          if(value === "12"){

            const embedCancelled = new MessageEmbed()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle(message.guild.name + " - Service Closed:")
              .setDescription(`This interaction has been cancelled by the author ${message.member}.`)
              .setColor(config.messages.embeds.colors.no);

            if(user !== message.member) return col.reply({ content: `${config.emojis.wrong} **This menu is not for you!** Try to run the command \`${config.prefix}help\` to get your own help dropdown menu.`, ephemeral: true }).catch(() => { });

            const menuDis = new MessageActionRow()
			        .addComponents(
				        new MessageSelectMenu()
				  	      .setCustomId('menuDis')
				    	    .setPlaceholder('Interaction stopped.')
                  .setDisabled(true)
				        	.addOptions([
						        {
							        label: 'ERR',
							        value: 'ERR',
						        },
					        ]),
  			      );

            col.update({ embeds: [embedCancelled], components: [menuDis] }).catch(() => { });   
          
          }

        })

      })

      } else {

        const command =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.find(
            (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
          );

        if (!command) {
          const embed = new MessageEmbed()
            .setDescription(`${config.emojis.wrong}**Invalid Command!** Please recheck this command name by using: \`${config.prefix}help\`.`)
            .setColor(config.messages.embeds.colors.no);
        
          return message.reply({ embeds: [embed] }).then(async (timeout) => {
            await wait(5000);
            message.delete().catch(() => { });
            timeout.delete().catch(() => { });
          })
        
        } else {
        
          const embed = new MessageEmbed()
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTitle(`${command.name}.js - Command Information:`)
            .setDescription("There are two types of arguments when using one of the commands:\n`[...]`: Argument is **required**.\n`(...)`: Argument is **not required**.")
            .addFields(
              { name: "• Command Name:", value: command.name ? `\`${command.name}\`` : "[No name for this command]", inline: true },
              { name: "• Command Aliase(s):", value: command.aliases ? `\`${command.aliases.join(", ")}\`.` : "[No aliases for this command]", inline: true },
              { name: "• Command Description:", value: command.description ? command.description : "[No description for this command]", inline: true },
              { name: "• Command Usage:", value: command.usage ? `\`${config.prefix}${command.usage}\`` : `[No usage for this command]`, inline: true },
            )
            .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: message.member.displayAvatarURL() })
            .setTimestamp()
            .setColor("BLUE");
          
          return message.reply({ embeds: [embed] });
          
        }
      }
      
    },
};