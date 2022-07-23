const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "eval",
    aliases: ['ev'],
    description: "Evaluate something.",
    usage: "eval [command]",
    run: async (client, message, args) => {

      if (message.author.id != config.users.owner) return message.delete();

      try {
      
      const code = args.join(" ");
      
      if (!code) {
        let embedMissingEvaluation = new MessageEmbed()
          .setDescription("Please provide something to evaluate.")
          .setColor(config.messages.embeds.colors.no);
        
        return message.reply({ embeds: [embedMissingEvaluation] });
      }
        
      let evaled = eval(code).catch(e => console.log(e));

      if (typeof evaled !== "string")
        
      evaled = require("util").inspect(evaled)

      let embedEvaluated = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle("Evaluation Done!")
        .addField("• Input:", `\`\`\`${code}\`\`\``)
        .addField("• Output:", `\`\`\`${evaled}\`\`\``)
        .setColor(config.messages.embeds.colors.yes);

      message.reply({embeds: [embedEvaluated]});
      
      } catch (err) {
      
        let embedEvaluationError = new MessageEmbed()
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
          .setTitle("Evaluation Failed.")
          .addField("• Error:", `\`\`\`${err}\`\`\``)
          .setColor(config.messages.embeds.colors.error);

        message.reply({embeds: [embedEvaluationError]});
      
    }
        
    },
};