const { MessageEmbed } = require("discord.js");
const fortunes = [
    "yes.",
    "no.",
    "maybe...",
    "dont know, try again."
];

module.exports = {
    name: "8ball",
    aliases: ["8b"],
    description: "Give me a question, and I will respond something randomly!",
    usage: "8ball [question]",
    run: async (client, message, args) => {

      const question = args.slice(0).join(" ");

      if(!question) return message.channel.send("Please Enter A Question You Would Like Answered.")

      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle("8Ball!")
        .addFields(
          {
            name: "• Question:",
            value: question + "?"
          },
          {
            name: "• Response:",
            value: fortunes[Math.floor(Math.random() * fortunes.length)]
          },
        )
      .setColor("RANDOM");
      
      message.reply({ embeds: [embed] });

    },
};