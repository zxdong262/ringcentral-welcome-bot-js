/**
 * default bot logic, will be overide by bot-logic.js
 * create bot-logic.js by `cp bot-logic-sample.js bot-logic.js`
 */

const {resolve} = require('path')

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
      text: `![:Person](${userId}), Hello, you just posted "${text}"`
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
      text: `Hello, I am a chatbot. Please reply "![:Person](${bot.id})" if you want to talk to me.`
    }
  )
}

try {
  let local = require(
    resolve(
      __dirname,
      'bot.js'
    )
  )
  Object.assign(exports, local)
  console.log('load bot.js')
} catch(e) {
  console.log(e.message)
  console.log('no bot-logic.js, use default bot logic')
}
