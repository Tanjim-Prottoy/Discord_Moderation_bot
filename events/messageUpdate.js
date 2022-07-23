const { MessageEmbed } = require("discord.js");
const client = require("../index");
const config = require("../config.json");
const db = require("quick.db");

client.on("messageUpdate", async (oldMessage, newMessage) => {  

  const message = oldMessage; //Because of quick.db...

  if(message.author.bot) return;
  
  const ch = db.fetch(`log_system_${message.guild.id}_channel`);

  if(ch === null) return;

  const channel = client.channels.cache.get(ch);
      
  const embedLog = new MessageEmbed()
    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
    .setTitle("Message Updated:")
    .setDescription("Successfully Logged the event: messageUpdate")
    .addFields(
      { name: "• Author:", value: `${oldMessage.author} (\`${oldMessage.author.id}\`)` },
      { name: "• Sent in:", value: `${oldMessage.channel} (\`${oldMessage.channel.id}\`)`},
      { name: "• Old Message:", value: `${oldMessage.content || "`[Error]`"}` },
      { name: "• New Message:", value: `${newMessage.content || "`[Error]`"}` },
    )
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("BLURPLE")
    .setTimestamp();

  try {
    channel.send({ embeds: [embedLog] });
  } catch (e) {
    console.log(e)
  }
})