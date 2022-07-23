const client = require("../index");
const canvas = require("discord-canvas");
const config = require("../config.json");
const db = require("quick.db");

client.on('guildMemberAdd', async member => {

  const message = member;

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
  
})