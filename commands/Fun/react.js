module.exports = {
    name: "react",
    aliases: ['rt'],
    description: "React to your message with an emoji.",
    usage: "react [emoji]",
    run: async (client, message, args) => {

      const emoji = args[0];

      if(!emoji) return message.reply("Please provide the emoji.")

      message.react(emoji).catch(() => message.reply("Invalid emoji, Missing permissions or This emoji doesn't exit on this server."))

    },
};