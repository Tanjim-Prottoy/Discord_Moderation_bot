const { MessageAttachment, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const canvacord = require("canvacord");
const Levels = require("discord-xp");
const db = require("quick.db");

module.exports = {
    name: "rank",
    aliases: [],
    description: "Check your rank on this server.",
    usage: "rank",
    run: async (client, message, args) => {

      const ch = db.fetch(`rank_system_${message.guild.id}`);

      const embedRankSysDis = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Ranking system is currently disabled.`)
        .setColor(config.messages.embeds.colors.no);

      if(ch === null) return message.reply({ embeds: [embedRankSysDis] });

      if(ch == false) return message.reply({ embeds: [embedRankSysDis] });

      let rank = await Levels.fetch(message.author.id, message.guild.id);

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} You are having **0 xp**!`)
        .setColor(config.messages.embeds.colors.no);
      
      if(!rank) return message.reply({ embeds: [embed1] });

    let requiredXp =await Levels.xpFor(Number(rank.level)+ 1);
      
    let rankCard = new canvacord.Rank()
      .setAvatar(message.author.displayAvatarURL({ dynamic : false,format : "png" }))
      .setCurrentXP(rank.xp)
      .setRequiredXP(requiredXp)
      .setLevel(rank.level)
      .setStatus(message.member.presence.status)
      .setProgressBar(config.systems.ranking_system.progress_bar.color.toUpperCase(), "COLOR")
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator)
      .setRank(rank.rank + 1);

    rankCard.build().then((data) => {
      
      let attach = new MessageAttachment(data, 'rank.png');
      
      message.reply({ files: [attach] });
      
    });
      
    },
};