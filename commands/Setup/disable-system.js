const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "disable-system",
    aliases: ['disable-sys', 'disable', 'dis'],
    description: "Disable one of the systems on the bot.",
    usage: "disable-system [system]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.delete();

      const embedAvailableSystems = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(`To **disable** a system, use: \`${config.prefix}disable-system [system]\`.`)
        .addFields(
          {
            name: "• Available Systems:",
            value: "`automod`, `dropdown-role`, `lock`, `logs`, `ranking`, `suggestion`, `verify`, `welcome`"
          },
        )
        .setColor("BLUE");

      const system = args[0];

      if(!system) return message.reply({ embeds: [embedAvailableSystems]})

      if(system.toLowerCase() === "automod") {

        db.delete(`automod_system_${message.guild.id}`);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      if(system.toLowerCase() === "dropdown-role") {

        db.delete(`dropdown_roles_system_${message.guild.id}_role`);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      if(system.toLowerCase() === "lock") {

        db.delete(`lock_system_${message.guild.id}`);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      if(system.toLowerCase() === "logs") {

        db.delete(`log_system_${message.guild.id}_channel`);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      if(system.toLowerCase() === "ranking") {

        db.delete(`rank_system_${message.guild.id}`);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      if(system.toLowerCase() === "suggestion") {

        db.delete(`suggest_system_${message.guild.id}_channel`);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      if(system.toLowerCase() === "verify") {

        db.delete(`verification_system_${message.guild.id}_channel`);

        db.delete(`verification_system_${message.guild.id}_role`);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      if(system.toLowerCase() === "welcome") {

        db.delete(`welcome_system_${message.guild.id}_channel`);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }
      
      const embedInvalidSys = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Invalid system name.`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.no);

      message.reply({ embeds: [embedInvalidSys] });
      
    },
};