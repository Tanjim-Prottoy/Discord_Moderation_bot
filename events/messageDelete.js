const { MessageEmbed, WebhookClient } = require("discord.js");
const client = require("../index");
const config = require("../config.json");
const db = require("quick.db");

client.on("messageDelete", async message => {

  if(message.author.bot) return;

  const ch = db.fetch(`log_system_${message.guild.id}_channel`);

  if(ch === null) return;
  
  const channel = client.channels.cache.get(ch);

  if(!message) return; // IMPORTANT: THIS HANDLES A STUPID UNKNOWN CRASH WHEN USING {prefix}verify.
      
  const embedLog = new MessageEmbed()
    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
    .setTitle("Message Deleted:")
    .setDescription("Successfully Logged the event: messageDelete")
    .addFields(
      { name: "• Author:", value: `${message.author} (\`${message.author.id}\`)` },
      { name: "• Sent in:", value: `${message.channel} (\`${message.channel.id}\`)`},
      { name: "• Message:", value: `${message || "`[Error]`"}` },   
    )
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("BLUE")
    .setTimestamp();

  try {
    channel.send({ embeds: [embedLog] });
  } catch (e) {
    console.log(e)
  }
  
})