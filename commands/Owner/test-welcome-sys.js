const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const canvas = require("discord-canvas");
const db = require("quick.db");

module.exports = {
    name: "test-welcome-sys",
    aliases: ['tws'],
    description: "Test the welcome system.",
    usage: "test-welcome-sys",
    run: async (client, message, args) => {

      if (message.author.id != config.users.owner) return message.delete();

      const member = message.member;

      if (member.user.username.length > 25)
    member.user.username = member.user.username.slice(0, 25) + "...";

      const welcomeImageAttachment = await new canvas.Welcome()
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setGuildName("The Server!")
        .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
        .setMemberCount(member.guild.memberCount)
        .setBackground("https://media.discordapp.net/attachments/956636904923734016/964299457774641232/free-space-background-02.jpg?width=721&height=405")
        .toAttachment();

      const ch = db.fetch(`welcome_system_${message.guild.id}_channel`);

      if(ch === null) return;

      const channel = client.channels.cache.get(ch);
  
      try {    
        return channel.send({ content: `<@${member.id}>,`,
          files: [
            {
              attachment: welcomeImageAttachment.toBuffer(),
              name: "Welcome.png",
            },
          ],
        });
      } catch (e) {
        console.log(e);
      }

      message.reply("Done.")
      
    },
};