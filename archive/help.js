const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { readdirSync } = require("fs");
const config = require("../../config.json");

module.exports = {
    name: "help",
    aliases: ['h', 'cmds'],
    description: "Show all the available commands, and their categories.",
    usage: "help (command)",
    run: async (client, message, args) => {
      
      if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: "• " + dir + ":" + ` [${cmds.length || "0"}]`,
          value: cmds.length === 0 ? "`[No files found]`." : cmds.join(", ") + ".",
          inline: true,
        };

        categories.push(data);
      });

      const row = new MessageActionRow()
			  .addComponents(
			  	new MessageButton()
					  .setCustomId('primary')
					  .setLabel(`Created By: ${config.users.owner_tag}`)
				  	.setStyle('PRIMARY')
            .setDisabled(true),
			  );

      const embed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTitle("Help Menu - List of Commands:")
        .addFields(
          {
            name: "• ❓ __How to use me:__",
            value: `\`○\` To execute a command, type: \`${config.prefix}[command]\`.\n\`○\` To get a command's aliases, description or usage, use: \`${config.prefix}help [command]\`.\n\`○\` Slash commands are available, Try now: \`/help\`.`
          },
          {
            name: "• 📈 __Commands Counter:__",
            value: `\`○\` Prefix Commands: ${client.commands.size}\n\`○\` Slash Commands: ${client.slashCommands.size}\n\`○\` Total: ${client.slashCommands.size + client.commands.size}`
          },
        )
        .addFields(categories)
        .setTimestamp()
        .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: message.member.displayAvatarURL() })
        .setColor("BLURPLE");
      
      return message.reply({ embeds: [embed], components: [row] });
      
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setDescription(`**Invalid Command!** Please recheck this command name by using: \`${config.prefix}help\`.`)
          .setColor("RED");
        
        return message.reply({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`${command.name}.js - Command Info:`)
        .setDescription("There are two types of arguments when using one of the commands:\n`[...]`: Argument Required.\n`(...)`: Argument not Required.")
        .addFields(
          { name: "• Command Name:", value: command.name ? `\`${command.name}\`` : "[No name for this command]", inline: true },
          { name: "• Command Aliase(s):", value: command.aliases ? `\`${command.aliases.join(", ")}\`.` : "[No aliases for this command]", inline: true },
          { name: "• Command Description:", value: command.description
            ? command.description
            : "[No description for this command]", inline: true },
          { name: "• Command Usage:", value: command.usage
            ? `\`${config.prefix}${command.usage}\``
            : `[No usage for this command]`, inline: true },
        )
        .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: message.member.displayAvatarURL() })
        .setTimestamp()
        .setColor("BLUE");
      return message.reply({ embeds: [embed] });
    }
    },
};