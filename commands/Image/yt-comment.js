module.exports = {
    name: "yt-comment",
    aliases: ['ytc'],
    description: "Create a fake youtube comment image.",
    usage: "",
    run: async (client, message, args) => {

      message.reply({
        files: [{
          name: 'youtube.png',
          attachment: [
            'https://some-random-api.ml/canvas/youtube-comment?avatar=',
             message.author.displayAvatarURL({format: 'png', size:1024}),
            `&username=${message.member.displayName}`,
            `&comment=${args.join(' ')}`
          ].join('')
        }]
      })

    },
};