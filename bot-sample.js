/**
 * bot logic sample
 */

/**
 * when chat group got new post
 * @param {string} text post text content
 * @param {object} group info
 * @param {Bot} bot instance
 */


exports.onBotGetPost = async ({
  text, group, bot, userId
}) => {
  bot.sendMessage(
    group.id,
    {
      text: `![:Person](${userId}), Hi, you just posted "${text}"`
    }
  )
}


/**
 * when bot join chat group
 * @param {object} group info
 * @param {Bot} bot instance
 */

exports.onBotJoinGroup = async ({
  bot,
  group
}) => {
  await bot.sendMessage(
    group.id,
    {
      text: `Hello, I am a chatbot0. Please reply "![:Person](${bot.id})" if you want to talk to me.`
    }
  )
}

