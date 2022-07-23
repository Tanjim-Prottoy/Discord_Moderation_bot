const client = require("../index");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const colors = require("colors");
const wait = require('node:timers/promises').setTimeout;

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) {
      if(config.systems.command_handler.reply_when_command_is_not_valid === true) {
        
        const embed = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} **Invalid Command!** Use the command \`${config.prefix}help\` for the list of available commands.`)
          .setColor(config.messages.embeds.colors.no);
        
        message.react("❌");
        
        message.reply({ embeds: [embed] }).then(async msg => {
          
          await wait(5000);
          
          message.delete().catch(() => { })
          
          msg.delete().catch(() => { })
          
        })
        
      } else {
        
        return;
        
      }
    }
    try {  
      await command.run(client, message, args);
    } catch (e) {
      
      if(!command) return;

      function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
        }
        return result;
      }

      const errorID = makeid(12);
      
      const embedErr = new MessageEmbed()
        .setDescription(`${config.emojis.warning} **There is an error occured on this command.** Please contact the developers with the ID \`${errorID}\` to check the console and fix the Errors.`)
        .setFooter("Discord API Error: " + e)
        .setColor(config.messages.embeds.colors.error);

      message.reply({ embeds: [embedErr] });

      console.log(`\n[ERR] ID ${errorID} :: `.bold.red + e);
    }
});